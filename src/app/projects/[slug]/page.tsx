import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import { ArrowLeft, ArrowRight, ExternalLink, GitHub, Lock } from "@/components/Icons";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import styles from "./case-study.module.css";

type Params = { slug: string };

// Every case study is pre-rendered at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    keywords: [...project.tags, ...project.stack, "AI engineer case study"],
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: project.title, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    author: { "@type": "Person", name: profile.name },
    keywords: project.stack.join(", "),
  };

  return (
    <article className={styles.article}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <header className={styles.header}>
        <div className="grid-bg" aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className={`container ${styles.headerInner}`}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <p className={styles.meta}>
            <span>{project.category}</span> · {project.context} · <span className={styles.status}>{project.status}</span>
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className="lead">{project.summary}</p>

          <div className={styles.links}>
            {project.links.repo && (
              <a href={project.links.repo} className="btn" target="_blank" rel="noopener noreferrer">
                <GitHub /> Source code
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <ExternalLink /> Live demo
              </a>
            )}
            {!project.links.repo && !project.links.demo && (
              <p className={styles.private}>
                <Lock /> Proprietary enterprise work — source and data are confidential. Happy to walk through the
                design in an interview.
              </p>
            )}
          </div>

          <dl className={styles.metrics}>
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar} aria-label="Project facts">
          <div className={styles.facts}>
            <h2 className={styles.factsTitle}>Stack</h2>
            <ul className={styles.stack}>
              {project.stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
            <h2 className={`${styles.factsTitle} ${styles.tocTitle}`}>On this page</h2>
            <ul className={styles.toc}>
              <li><a href="#problem">Problem</a></li>
              <li><a href="#role">My role</a></li>
              <li><a href="#architecture">Architecture</a></li>
              <li><a href="#approach">Approach</a></li>
              <li><a href="#challenges">Challenges</a></li>
              <li><a href="#results">Results</a></li>
            </ul>
          </div>
        </aside>

        <div className={styles.content}>
          <section id="problem" aria-labelledby="problem-h">
            <h2 id="problem-h">The problem</h2>
            {project.problem.map((p) => <p key={p}>{p}</p>)}
          </section>

          <section id="role" aria-labelledby="role-h">
            <h2 id="role-h">My role</h2>
            <ul className={styles.bullets}>
              {project.role.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>

          <section id="architecture" aria-labelledby="arch-h">
            <h2 id="arch-h">Architecture</h2>
            <p>High-level data flow, from raw input to business output.</p>
            <ArchitectureFlow steps={project.architecture} label={`${project.title} pipeline stages`} />
          </section>

          <section id="approach" aria-labelledby="approach-h">
            <h2 id="approach-h">Approach & key decisions</h2>
            <div className={styles.cards}>
              {project.approach.map((a) => (
                <div key={a.title} className={styles.card}>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="challenges" aria-labelledby="challenges-h">
            <h2 id="challenges-h">Challenges</h2>
            <dl className={styles.challenges}>
              {project.challenges.map((c) => (
                <div key={c.title}>
                  <dt>{c.title}</dt>
                  <dd>{c.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="results" aria-labelledby="results-h">
            <h2 id="results-h">Results</h2>
            <ul className={`${styles.bullets} ${styles.results}`}>
              {project.results.map((r) => <li key={r}>{r}</li>)}
            </ul>
            {project.next && (
              <>
                <h3 className={styles.nextTitle}>What&apos;s next</h3>
                <ul className={styles.bullets}>
                  {project.next.map((n) => <li key={n}>{n}</li>)}
                </ul>
              </>
            )}
            {project.note && <p className={styles.note}>{project.note}</p>}
          </section>

          <nav className={styles.pager} aria-label="More case studies">
            <Link href="/projects" className="btn">
              <ArrowLeft /> All projects
            </Link>
            <Link href={`/projects/${nextProject.slug}`} className={styles.next}>
              <span className={styles.nextLabel}>Next case study</span>
              <span className={styles.nextName}>
                {nextProject.title} <ArrowRight />
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
