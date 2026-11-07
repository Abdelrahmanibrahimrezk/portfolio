import Link from "next/link";
import type { Project } from "@/data/projects";
import ArchitectureFlow from "./ArchitectureFlow";
import { ArrowRight } from "./Icons";
import styles from "./CaseStudyPreview.module.css";

/** Large spotlight for the flagship case study on the home page. */
export default function CaseStudyPreview({ project }: { project: Project }) {
  return (
    <article className={styles.preview} aria-labelledby={`preview-${project.slug}`}>
      <div className={styles.copy}>
        <p className={styles.kicker}>
          Flagship case study · <span>{project.context}</span>
        </p>
        <h3 id={`preview-${project.slug}`} className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        <dl className={styles.metrics}>
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>

        <Link href={`/projects/${project.slug}`} className="btn btn-primary">
          Read the full case study <ArrowRight />
          <span className="visually-hidden">: {project.title}</span>
        </Link>
      </div>

      <div className={styles.diagram}>
        <ArchitectureFlow steps={project.architecture} label={`${project.title} architecture`} />
      </div>
    </article>
  );
}
