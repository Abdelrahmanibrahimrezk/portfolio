import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import styles from "./ProjectCover.module.css";

type ProjectCoverProps = {
  project: Project;
  /** Responsive sizes hint for next/image when a real image is provided. */
  sizes?: string;
  priority?: boolean;
  variant?: "card" | "hero";
};

/**
 * Uses project.image (optimized via next/image) when available; otherwise renders
 * lightweight generated art: the first pipeline stages drawn as a terminal-style flow.
 */
export default function ProjectCover({
  project,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw",
  priority = false,
  variant = "card",
}: ProjectCoverProps) {
  if (project.image) {
    return (
      <div className={styles.cover} data-variant={variant}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
      </div>
    );
  }

  const stages = project.architecture.slice(0, variant === "hero" ? 6 : 4);

  return (
    <div
      className={styles.cover}
      data-variant={variant}
      style={{ "--hue": project.hue } as CSSProperties}
      aria-hidden="true"
    >
      <div className={styles.glow} />
      <p className={styles.file}>
        {project.slug}.pipeline <span>· {project.category.toLowerCase()}</span>
      </p>
      <ol className={styles.flow}>
        {stages.map((stage, i) => (
          <li key={stage} className={styles.stage}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            {stage}
          </li>
        ))}
      </ol>
    </div>
  );
}
