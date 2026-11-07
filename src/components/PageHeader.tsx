import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export default function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header style={{ position: "relative", padding: "56px 0 40px", overflow: "hidden" }}>
      <div className="grid-bg" aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div className="container" style={{ position: "relative", display: "grid", gap: 16 }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 style={{ fontSize: "clamp(2rem, 1.4rem + 3vw, 3.25rem)", letterSpacing: "-0.03em" }}>{title}</h1>
        {children}
      </div>
    </header>
  );
}
