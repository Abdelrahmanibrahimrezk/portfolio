import Image from "next/image";
import Link from "next/link";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Hero from "@/components/Hero";
import { ArrowRight, Award } from "@/components/Icons";
import ProjectGrid from "@/components/ProjectGrid";
import SkillsCloud from "@/components/SkillsCloud";
import { awardVideo, recognition } from "@/data/achievements";
import { experience } from "@/data/experience";
import { featuredProjects, getProject, projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import styles from "./home.module.css";

const flagship = getProject("speech-analytics-platform")!;

export default function HomePage() {
  const gridProjects = featuredProjects.filter((p) => p.slug !== flagship.slug).concat(
    projects.filter((p) => !p.featured).slice(0, 1),
  );

  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">selected work</p>
            <h2 id="work-title">Case studies</h2>
            <p className="lead">
              Production speech and language systems for one of the region&apos;s largest telecom operators — plus
              the prototypes and experiments around them.
            </p>
          </div>

          <CaseStudyPreview project={flagship} />

          <div style={{ marginTop: 24 }}>
            <ProjectGrid projects={gridProjects} />
          </div>

          <p style={{ marginTop: 32 }}>
            <Link href="/projects" className="btn">
              All {projects.length} projects <ArrowRight />
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="recognition-title">
        <div className="container">
          <div className={styles.recognition}>
            <div className={styles.recognitionImage}>
              <Image
                src={recognition[0].src}
                alt={recognition[0].alt}
                fill
                sizes="(min-width: 900px) 480px, 100vw"
              />
            </div>
            <div className={styles.recognitionCopy}>
              <p className="eyebrow">hall of fame</p>
              <h2 id="recognition-title">Recognized for Gen AI Speech Analytics</h2>
              <p className="lead">
                Two Vodafone Recognition Certificates — including an on-stage award for building Gen AI Speech Analytics
                — plus AWS ML Specialty and ITI AI credentials.
              </p>
              <p className={styles.recognitionNote}>
                <Award /> {awardVideo.title}
              </p>
              <Link href="/achievements" className="btn btn-primary">
                See achievements <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">stack</p>
            <h2 id="skills-title">Technical skills</h2>
            <p className="lead">Highlighted items are the tools I use daily and have shipped to production.</p>
          </div>
          <SkillsCloud groups={skillGroups} />
        </div>
      </section>

      <section className="section" aria-labelledby="experience-title">
        <div className="container">
          <div className="section-head section-head-row">
            <div style={{ display: "grid", gap: 12 }}>
              <p className="eyebrow">experience</p>
              <h2 id="experience-title">Where I&apos;ve worked</h2>
            </div>
            <Link href="/about" className="text-link">Education & certifications →</Link>
          </div>
          <ExperienceTimeline items={experience} />
        </div>
      </section>
    </>
  );
}
