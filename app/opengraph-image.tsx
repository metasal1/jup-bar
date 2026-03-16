import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "jup.bar — JupBar for Jupiter Cats";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0f12 0%, #1a1f2e 50%, #0b0f12 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Glow circle */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 120,
            borderRadius: 60,
            background: "linear-gradient(135deg, #f8b050, #fa7361)",
            boxShadow: "0 0 80px rgba(248,176,80,0.4), 0 0 160px rgba(250,115,97,0.2)",
            marginBottom: 40,
          }}
        />
        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          jup.bar
        </div>
        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.5px",
          }}
        >
          Floating macOS ticker bar for Jupiter Cats
        </div>
        {/* Ticker mockup strip */}
        <div
          style={{
            display: "flex",
            marginTop: 48,
            padding: "12px 32px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            gap: 32,
          }}
        >
          {[
            { symbol: "SOL", price: "$148.20", change: "+3.2%", up: true },
            { symbol: "JUP", price: "$1.24", change: "+8.7%", up: true },
            { symbol: "BONK", price: "$0.0₄234", change: "+12.4%", up: true },
            { symbol: "PYTH", price: "$0.42", change: "+5.6%", up: true },
          ].map((t) => (
            <div
              key={t.symbol}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>
                {t.symbol}
              </span>
              <span style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
                {t.price}
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: t.up ? "#4ade80" : "#f87171",
                  fontWeight: 600,
                }}
              >
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
