const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const KINDS = new Set([
  "bug",
  "missing",
  "outdated",
  "idea",
  "link",
  "other",
]);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Simple per-isolate rate limit
const hits = new Map<string, { n: number; t: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now - row.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  row.n += 1;
  return row.n > 8;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (rateLimited(ip)) {
      return Response.json(
        { error: "Too many reports. Try again in a minute." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      kind?: string;
      product?: string;
      message?: string;
      url?: string;
      website?: string; // honeypot
    };

    if (body.website?.trim()) {
      return Response.json({ ok: true });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const kind = (body.kind?.trim().toLowerCase() ?? "") || "";
    const product = body.product?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const pageUrl = body.url?.trim() ?? "";

    if (!name || name.length > 80) {
      return Response.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 200) {
      return Response.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }
    if (!KINDS.has(kind)) {
      return Response.json(
        { error: "Please choose a report type." },
        { status: 400 },
      );
    }
    if (product.length > 120) {
      return Response.json({ error: "Product name is too long." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return Response.json(
        { error: "Please describe the issue (at least 10 characters)." },
        { status: 400 },
      );
    }
    if (message.length > 4000) {
      return Response.json({ error: "Message is too long." }, { status: 400 });
    }
    if (pageUrl.length > 500) {
      return Response.json({ error: "URL is too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not set");
      return Response.json(
        {
          error:
            "Feedback form is not configured yet. Email bugs@metasal.xyz instead.",
        },
        { status: 503 },
      );
    }

    const to = process.env.CONTACT_TO?.trim() || "bugs@metasal.xyz";
    const from =
      process.env.RESEND_FROM?.trim() || "jup.bar <gm@milysec.com>";

    const kindLabel = kind.charAt(0).toUpperCase() + kind.slice(1);
    const subject = product
      ? `[jup.bar] ${kindLabel}: ${product} — ${name}`
      : `[jup.bar] ${kindLabel} report — ${name}`;

    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.5;color:#0f172a;max-width:640px">
        <div style="background:#0A0E13;color:#C7F284;padding:16px 20px;border-radius:12px 12px 0 0">
          <strong style="font-size:16px">jup.bar feedback</strong>
        </div>
        <div style="border:1px solid #e2e8f0;border-top:0;padding:20px;border-radius:0 0 12px 12px">
          <p style="margin:0 0 8px"><strong>Type:</strong> ${escapeHtml(kindLabel)}</p>
          <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${product ? `<p style="margin:0 0 8px"><strong>Product / item:</strong> ${escapeHtml(product)}</p>` : ""}
          ${pageUrl ? `<p style="margin:0 0 8px"><strong>Related URL:</strong> <a href="${escapeHtml(pageUrl)}">${escapeHtml(pageUrl)}</a></p>` : ""}
          <p style="margin:16px 0 8px"><strong>Report:</strong></p>
          <pre style="white-space:pre-wrap;font-family:inherit;background:#f8fafc;padding:12px 14px;border-radius:8px;border:1px solid #e2e8f0;margin:0">${escapeHtml(message)}</pre>
          <p style="margin:16px 0 0;font-size:12px;color:#64748b">Sent from https://jup.bar/feedback · reply goes to submitter</p>
        </div>
      </div>
    `;

    const text = [
      "jup.bar feedback",
      "",
      `Type: ${kindLabel}`,
      `Name: ${name}`,
      `Email: ${email}`,
      product ? `Product: ${product}` : null,
      pageUrl ? `URL: ${pageUrl}` : null,
      "",
      "Report:",
      message,
      "",
      "— https://jup.bar/feedback",
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "jup-bar-feedback/1.0",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
        text,
        tags: [
          { name: "category", value: "feedback" },
          { name: "product", value: "jup-bar" },
          { name: "kind", value: kind },
        ],
      }),
    });

    const responseText = await res.text();
    if (!res.ok) {
      console.error(`Resend feedback failed ${res.status}:`, responseText);
      return Response.json(
        {
          error:
            "Could not send report. Please email bugs@metasal.xyz instead.",
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Feedback error:", msg);
    return Response.json(
      {
        error:
          "Something went wrong. Please email bugs@metasal.xyz instead.",
      },
      { status: 500 },
    );
  }
}
