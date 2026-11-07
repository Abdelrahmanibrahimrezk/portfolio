import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectGrid.module.css";

type ProjectGridProps = {
  projects: Project[];
  headingLevel?: "h2" | "h3";
};

export default function ProjectGrid({ projects, headingLevel }: ProjectGridProps) {
  return (
    <ul className={styles.grid} role="list">
      {projects.map((project) => (
        <li key={project.slug} className={styles.item}>
          <ProjectCard project={project} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
