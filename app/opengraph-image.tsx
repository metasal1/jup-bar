import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "jup.bar — Unofficial Directory of Jupiter Products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0A0E13 0%, #0B1117 50%, #111820 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #C7F284 0%, #00BEF0 100%)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 700,
              color: "#F4F7FB",
              letterSpacing: "-0.5px",
            }}
          >
            jup.bar
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#F4F7FB",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            The Unofficial Directory of Jupiter Products
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 500,
              color: "#90A1B9",
            }}
          >
            Sort · Pin · Shuffle — every Jupiverse surface
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: "#C7F284",
            }}
          >
            Made by Metasal
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#64748B",
            }}
          >
            Not affiliated with Jupiter Labs
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
