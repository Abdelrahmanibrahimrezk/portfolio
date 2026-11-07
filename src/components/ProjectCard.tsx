import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowRight, ExternalLink, GitHub, Lock } from "./Icons";
import ProjectCover from "./ProjectCover";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

export default function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const isPrivate = !project.links.repo && !project.links.demo;

  return (
    <article className={styles.card}>
      <ProjectCover project={project} />

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.status} data-status={project.status}>{project.status}</span>
        </div>

        <Heading className={styles.title}>
          {/* The stretched link makes the whole card clickable while keeping one tab stop. */}
          <Link href={href} className={styles.stretched}>
            {project.title}
          </Link>
        </Heading>

        <p className={styles.summary}>{project.tagline}</p>

        <dl className={styles.metrics}>
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>

        <ul className={styles.tags} aria-label="Technologies">
          {project.stack.slice(0, 4).map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>

        <div className={styles.footer}>
          <span className={styles.readMore} aria-hidden="true">
            Read case study <ArrowRight />
          </span>
          <div className={styles.links}>
            {project.links.repo && (
              <a href={project.links.repo} className={styles.iconLink} target="_blank" rel="noopener noreferrer">
                <GitHub /> <span className="visually-hidden">{project.title} source code on GitHub</span>
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} className={styles.iconLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink /> <span className="visually-hidden">{project.title} live demo</span>
              </a>
            )}
            {isPrivate && (
              <span className={styles.private} title="Proprietary enterprise work — code and data are confidential">
                <Lock /> Private
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
