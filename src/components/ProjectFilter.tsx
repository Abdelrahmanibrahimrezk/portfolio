"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import ProjectGrid from "./ProjectGrid";
import styles from "./ProjectFilter.module.css";

type ProjectFilterProps = {
  projects: Project[];
  categories: string[];
};

const ALL = "All";

export default function ProjectFilter({ projects, categories }: ProjectFilterProps) {
  const [active, setActive] = useState(ALL);
  const visible = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className={styles.bar} role="group" aria-label="Filter projects by category">
        {[ALL, ...categories].map((cat) => {
          const count = cat === ALL ? projects.length : projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              className={styles.filter}
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
            >
              {cat} <span className={styles.count}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <ProjectGrid projects={visible} headingLevel="h2" />
    </>
  );
}
