import type { SkillGroup } from "@/data/skills";
import styles from "./SkillsCloud.module.css";

export default function SkillsCloud({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className={styles.grid}>
      {groups.map((group) => (
        <section key={group.id} className={styles.group} aria-labelledby={`skills-${group.id}`}>
          <p className={styles.command} aria-hidden="true">
            <span>$</span> {group.command}
          </p>
          <h3 id={`skills-${group.id}`} className={styles.title}>{group.title}</h3>
          <ul className={styles.list}>
            {group.skills.map((skill) => (
              <li key={skill.name} className={styles.skill} data-core={skill.core ?? false}>
                {skill.name}
                {skill.core && <span className="visually-hidden"> (core skill)</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
