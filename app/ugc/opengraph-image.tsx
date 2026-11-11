import { ImageResponse } from "next/og";

export const alt = "Tiah | UGC Creator for Tech, SaaS & AI Brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TODO(owner): swap for a designed OG image (e.g. a still from the showreel)
// by replacing this file with app/ugc/opengraph-image.png (1200×630).
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FAF8F5",
        padding: 72,
        color: "#1a1a1a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -4,
            color: "#E8563A",
            lineHeight: 1,
          }}
        >
          Ideas into UGC reality.
        </div>
        <div style={{ fontSize: 36, marginTop: 28, maxWidth: 900 }}>
          Ad-ready UGC for tech, SaaS &amp; AI brands, from a software
          developer.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
        tiah hind
      </div>
    </div>,
    size,
  );
}
