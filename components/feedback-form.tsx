"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type StepId =
  | "welcome"
  | "kind"
  | "product"
  | "message"
  | "name"
  | "email"
  | "review"
  | "done";

type Kind = "bug" | "missing" | "outdated" | "idea" | "link" | "other";

const KIND_OPTIONS: { value: Kind; label: string; hint: string; key: string }[] =
  [
    { value: "bug", label: "Bug", hint: "Something broken on jup.bar", key: "A" },
    {
      value: "missing",
      label: "Missing product",
      hint: "Jupiter app not listed",
      key: "B",
    },
    {
      value: "outdated",
      label: "Outdated link",
      hint: "URL, name, or blurb wrong",
      key: "C",
    },
    { value: "idea", label: "Idea", hint: "Feature or UX suggestion", key: "D" },
    {
      value: "link",
      label: "Bad deep link",
      hint: "Referral or destination issue",
      key: "E",
    },
    { value: "other", label: "Other", hint: "Anything else", key: "F" },
  ];

const STEPS: StepId[] = [
  "welcome",
  "kind",
  "product",
  "message",
  "name",
  "email",
  "review",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function FeedbackForm({ compact = false }: { compact?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [kind, setKind] = useState<Kind | "">("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const step = done ? "done" : STEPS[stepIndex];
  const progress = done
    ? 100
    : Math.round((stepIndex / (STEPS.length - 1)) * 100);

  const canContinue = useMemo(() => {
    switch (step) {
      case "welcome":
        return true;
      case "kind":
        return Boolean(kind);
      case "product":
        return product.trim().length <= 120;
      case "message":
        return message.trim().length >= 10 && message.trim().length <= 4000;
      case "name":
        return name.trim().length > 0 && name.trim().length <= 80;
      case "email":
        return isValidEmail(email);
      case "review":
        return true;
      default:
        return false;
    }
  }, [step, kind, product, message, name, email]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, [step]);

  const goBack = useCallback(() => {
    setError("");
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }, [stepIndex]);

  const goNext = useCallback(async () => {
    setError("");
    if (!canContinue || submitting) return;

    if (step === "review") {
      setSubmitting(true);
      try {
        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            kind,
            product: product.trim(),
            message: message.trim(),
            url: url.trim(),
            website,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (!res.ok) {
          setError(data.error || "Something went wrong. Try again.");
          setSubmitting(false);
          return;
        }
        try {
          window.gtag?.("event", "feedback_submit", {
            kind,
            product: product.trim() || undefined,
          });
        } catch {
          /* ignore */
        }
        setDone(true);
      } catch {
        setError("Network error. Email bugs@metasal.xyz instead.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1);
  }, [
    canContinue,
    submitting,
    step,
    stepIndex,
    name,
    email,
    kind,
    product,
    message,
    url,
    website,
  ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === "Escape") {
        e.preventDefault();
        goBack();
        return;
      }
      if (step === "kind" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const opt = KIND_OPTIONS.find(
          (o) => o.key.toLowerCase() === e.key.toLowerCase(),
        );
        if (opt) {
          e.preventDefault();
          setKind(opt.value);
          return;
        }
      }
      if (e.key === "Enter" && !e.shiftKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "TEXTAREA") return;
        e.preventDefault();
        void goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, step, goBack, goNext]);

  const kindLabel =
    KIND_OPTIONS.find((o) => o.value === kind)?.label || kind || "—";

  const shell = compact
    ? "relative w-full max-w-xl rounded-2xl border border-border bg-card/80 p-5 sm:p-7"
    : "relative mx-auto flex min-h-[min(70vh,640px)] w-full max-w-2xl flex-col justify-center rounded-2xl border border-border bg-card/80 p-6 sm:p-10";

  return (
    <div className={shell}>
      {/* progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-[11px] font-medium tracking-wide text-faint uppercase">
          <span>Feedback</span>
          <span>{done ? "Done" : `${progress}%`}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === "welcome" && (
        <Step
          kicker="01 · Start"
          title="Help keep the Jupiverse map accurate."
          body="Report bugs, missing products, bad links, or ideas. Takes under a minute. Goes straight to bugs@metasal.xyz."
        >
          <button type="button" onClick={() => void goNext()} className={btnPrimary}>
            Start <span className="opacity-60">↵</span>
          </button>
        </Step>
      )}

      {step === "kind" && (
        <Step kicker="02 · Type" title="What kind of report is this?">
          <div className="grid gap-2 sm:grid-cols-2">
            {KIND_OPTIONS.map((o) => {
              const active = kind === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setKind(o.value)}
                  className={
                    active
                      ? "flex flex-col items-start rounded-xl border border-primary/50 bg-primary/10 px-3.5 py-3 text-left"
                      : "flex flex-col items-start rounded-xl border border-border bg-bg/40 px-3.5 py-3 text-left transition hover:border-primary/30"
                  }
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-text">
                    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-card px-1 text-[10px] text-muted">
                      {o.key}
                    </kbd>
                    {o.label}
                  </span>
                  <span className="mt-1 text-xs text-muted">{o.hint}</span>
                </button>
              );
            })}
          </div>
          <Nav
            onBack={goBack}
            onNext={() => void goNext()}
            disabled={!canContinue}
          />
        </Step>
      )}

      {step === "product" && (
        <Step
          kicker="03 · Context"
          title="Which product or page?"
          body="Optional. e.g. Perps, Studio, @JupDevRel, or leave blank."
        >
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product, person, or channel"
            maxLength={120}
            className={inputCls}
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Related URL (optional)"
            maxLength={500}
            className={`${inputCls} mt-2`}
          />
          <Nav
            onBack={goBack}
            onNext={() => void goNext()}
            disabled={!canContinue}
            nextLabel="Continue"
          />
        </Step>
      )}

      {step === "message" && (
        <Step kicker="04 · Details" title="Tell us what happened.">
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the bug, missing item, or idea…"
            rows={5}
            maxLength={4000}
            className={`${inputCls} resize-y min-h-[120px]`}
          />
          <p className="mt-1 text-[11px] text-faint">
            {message.trim().length}/4000 · Shift+Enter for newline
          </p>
          <Nav
            onBack={goBack}
            onNext={() => void goNext()}
            disabled={!canContinue}
          />
        </Step>
      )}

      {step === "name" && (
        <Step kicker="05 · You" title="Your name">
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name or handle"
            maxLength={80}
            className={inputCls}
            autoComplete="name"
          />
          <Nav
            onBack={goBack}
            onNext={() => void goNext()}
            disabled={!canContinue}
          />
        </Step>
      )}

      {step === "email" && (
        <Step
          kicker="06 · Contact"
          title="Email for follow-up"
          body="We only use this to reply about your report."
        >
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            maxLength={200}
            className={inputCls}
            autoComplete="email"
            inputMode="email"
          />
          {/* honeypot */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />
          <Nav
            onBack={goBack}
            onNext={() => void goNext()}
            disabled={!canContinue}
          />
        </Step>
      )}

      {step === "review" && (
        <Step kicker="07 · Review" title="Send this report?">
          <dl className="space-y-2 rounded-xl border border-border bg-bg/50 p-4 text-sm">
            <Row k="Type" v={kindLabel} />
            {product.trim() && <Row k="Product" v={product.trim()} />}
            {url.trim() && <Row k="URL" v={url.trim()} />}
            <Row k="Name" v={name.trim()} />
            <Row k="Email" v={email.trim()} />
            <div>
              <dt className="text-[11px] font-medium tracking-wide text-faint uppercase">
                Message
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-text">
                {message.trim()}
              </dd>
            </div>
          </dl>
          {error && (
            <p className="mt-3 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <Nav
            onBack={goBack}
            onNext={() => void goNext()}
            disabled={!canContinue || submitting}
            nextLabel={submitting ? "Sending…" : "Submit report"}
          />
        </Step>
      )}

      {step === "done" && (
        <Step
          kicker="Sent"
          title="Thanks — report received."
          body="Your note is on its way to bugs@metasal.xyz. We'll follow up if we need more detail."
        >
          <div className="flex flex-wrap gap-2">
            <a href="/" className={btnPrimary}>
              Back to directory
            </a>
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStepIndex(0);
                setKind("");
                setProduct("");
                setMessage("");
                setName("");
                setEmail("");
                setUrl("");
                setError("");
              }}
              className={btnGhost}
            >
              Send another
            </button>
          </div>
        </Step>
      )}
    </div>
  );
}

function Step({
  kicker,
  title,
  body,
  children,
}: {
  kicker: string;
  title: string;
  body?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-[shuffle-in_0.28s_ease]">
      <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
        {kicker}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-[1.75rem]">
        {title}
      </h2>
      {body && (
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{body}</p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Nav({
  onBack,
  onNext,
  disabled,
  nextLabel = "OK",
}: {
  onBack: () => void;
  onNext: () => void;
  disabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-6 flex items-center gap-2">
      <button type="button" onClick={onBack} className={btnGhost}>
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className={btnPrimary}
      >
        {nextLabel}{" "}
        {!disabled && nextLabel === "OK" && (
          <span className="opacity-60">↵</span>
        )}
      </button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-20 shrink-0 text-[11px] font-medium tracking-wide text-faint uppercase">
        {k}
      </dt>
      <dd className="min-w-0 break-words text-text">{v}</dd>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-base text-text outline-none placeholder:text-faint focus:border-primary/50 focus:ring-2 focus:ring-primary/25";

const btnPrimary =
  "inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg transition hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const btnGhost =
  "inline-flex h-10 items-center justify-center rounded-full border border-border bg-transparent px-4 text-sm font-medium text-muted transition hover:border-border2 hover:text-text";
