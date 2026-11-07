import { ImageResponse } from "next/og";
import { highlights, profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0c0f",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 100% 0%, rgba(94,234,212,0.18), transparent 70%)",
          color: "#e7ebf0",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#5eead4" }}>~/abdelrahman $ whoami</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, fontFamily: "sans-serif" }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 38, color: "#5eead4" }}>
            {`${profile.role} · ${profile.specialties.join(" · ")}`}
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {highlights.slice(0, 3).map((h) => (
            <div
              key={h.label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 24px",
                border: "2px solid #334050",
                borderRadius: 16,
                background: "#131820",
              }}
            >
              <div style={{ fontSize: 40, color: "#5eead4", fontWeight: 700 }}>{h.value}</div>
              <div style={{ fontSize: 22, color: "#9aa5b4" }}>{h.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
