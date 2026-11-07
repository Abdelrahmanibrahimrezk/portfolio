import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ padding: "96px var(--gutter)", display: "grid", gap: 20, justifyItems: "start" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: "clamp(2rem, 1.4rem + 3vw, 3rem)" }}>Page not found</h1>
      <pre className="mono" style={{ margin: 0, color: "var(--text-muted)", whiteSpace: "pre-wrap" }}>
        <span style={{ color: "var(--prompt)" }}>$</span> cd this-page{"\n"}
        <span style={{ color: "var(--danger)" }}>cd: no such file or directory</span>
      </pre>
      <Link href="/" className="btn btn-primary">Back home</Link>
    </section>
  );
}
