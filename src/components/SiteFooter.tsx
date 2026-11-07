import Link from "next/link";
import { profile } from "@/data/profile";
import { navLinks } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 0 40px" }}>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.875rem",
          color: "var(--text-faint)",
        }}
      >
        <p className="mono">
          © {new Date().getFullYear()} {profile.name} <span aria-hidden="true">·</span> built with Next.js
        </p>
        <nav aria-label="Footer">
          <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 20 }}>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} style={{ color: "var(--text-muted)" }}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
