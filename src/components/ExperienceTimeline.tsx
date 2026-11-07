import Link from "next/link";
import type { ExperienceItem } from "@/data/experience";
import { getProject } from "@/data/projects";
import styles from "./ExperienceTimeline.module.css";

type ExperienceTimelineProps = {
  items: ExperienceItem[];
  /** Show related case-study links under each role. */
  showProjects?: boolean;
};

export default function ExperienceTimeline({ items, showProjects = false }: ExperienceTimelineProps) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => {
        const related = showProjects
          ? (item.projects ?? []).map(getProject).filter((p) => p !== undefined)
          : [];

        return (
          <li key={`${item.company}-${item.period}`} className={styles.item}>
            <div className={styles.when}>
              <p className={styles.period}>{item.period}</p>
              {item.location && <p className={styles.location}>{item.location}</p>}
            </div>

            <div className={styles.what}>
              <h3 className={styles.role}>
                {item.role} <span className={styles.at}>@ {item.company}</span>
              </h3>
              <p className={styles.summary}>{item.summary}</p>
              <ul className={styles.highlights}>
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              {related.length > 0 && (
                <div className={styles.related}>
                  <p className={styles.relatedLabel}>Case studies</p>
                  <ul className={styles.relatedList}>
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/projects/${p.slug}`} className="chip">{p.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
