import type { Metadata } from "next";
import Avatar from "@/components/Avatar";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { Download } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import SkillsCloud from "@/components/SkillsCloud";
import { experience } from "@/data/experience";
import { certifications, education, profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `${profile.name} — ${profile.role}. Experience, education, certifications and technical skills in speech AI, LLMs and GPU inference.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="about" title={`Hi, I'm ${profile.shortName}.`}>
        <div className={styles.intro}>
          <Avatar size={96} priority />
          <div className={styles.introText}>
            <p className="lead">{profile.summary}</p>
            <a href={profile.resumeUrl} className="btn" download>
              <Download /> Download full CV
            </a>
          </div>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="focus-title">
        <div className={`container ${styles.split}`}>
          <div className="section-head">
            <p className="eyebrow">focus</p>
            <h2 id="focus-title">What I work on</h2>
          </div>
          <ul className={styles.focus}>
            {profile.focus.map((f, i) => (
              <li key={f}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="exp-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">experience</p>
            <h2 id="exp-title">Experience</h2>
          </div>
          <ExperienceTimeline items={experience} showProjects />
        </div>
      </section>

      <section className="section" aria-labelledby="edu-title">
        <div className={`container ${styles.twoCol}`}>
          <div>
            <div className="section-head">
              <p className="eyebrow">education</p>
              <h2 id="edu-title">Education</h2>
            </div>
            <ul className={styles.cards}>
              {education.map((e) => (
                <li key={e.title} className={styles.card}>
                  <p className={styles.year}>{e.year}</p>
                  <h3>{e.title}</h3>
                  <p className={styles.org}>{e.org}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="section-head">
              <p className="eyebrow">certifications</p>
              <h2>Certifications & training</h2>
            </div>
            <ul className={styles.cards}>
              {certifications.map((c) => (
                <li key={c} className={styles.card}>
                  <h3>{c}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">stack</p>
            <h2 id="skills-title">Technical skills</h2>
          </div>
          <SkillsCloud groups={skillGroups} />
        </div>
      </section>
    </>
  );
}
