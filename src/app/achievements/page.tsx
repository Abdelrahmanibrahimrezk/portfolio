import type { Metadata } from "next";
import Link from "next/link";
import AchievementGallery from "@/components/AchievementGallery";
import { Award, Briefcase, ExternalLink } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import { awardVideo, credentials, freelance, recognition } from "@/data/achievements";
import styles from "./achievements.module.css";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Hall of fame: Vodafone Egypt recognition awards for Gen AI Speech Analytics, AWS Machine Learning Specialty certification, ITI AI diploma and a 40-contract Upwork track record.",
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  return (
    <>
      <PageHeader eyebrow="hall of fame" title="Achievements & recognition">
        <p className="lead">
          Awards for shipping Gen AI to production at Vodafone Egypt, the credentials behind the work, and the
          freelance track record that came before it.
        </p>
      </PageHeader>

      <section className="section" aria-labelledby="recognition-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">recognition</p>
            <h2 id="recognition-title">Recognized by Vodafone Egypt</h2>
            <p className="lead">
              Two Vodafone Recognition Certificates, including an on-stage award for the Gen AI Speech Analytics
              platform — the flagship project in my <Link href="/projects/speech-analytics-platform" className="text-link">case studies</Link>.
            </p>
          </div>

          <div className={styles.feature}>
            <figure className={styles.videoCard}>
              <video
                className={styles.video}
                controls
                playsInline
                preload="none"
                poster={awardVideo.poster}
                width={awardVideo.width}
                height={awardVideo.height}
                aria-describedby="award-video-desc"
              >
                <source src={awardVideo.src} type="video/mp4" />
                Your browser can&apos;t play this video.{" "}
                <a href={awardVideo.src} className="text-link">Download it instead</a>.
              </video>
              <figcaption className={styles.videoCaption}>
                <span className={styles.badge}>
                  <Award /> Award
                </span>
                <strong>{awardVideo.title}</strong>
                <span id="award-video-desc">{awardVideo.description}</span>
              </figcaption>
            </figure>

            <div className={styles.featureGallery}>
              <AchievementGallery items={recognition} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="credentials-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">credentials</p>
            <h2 id="credentials-title">Certifications & training</h2>
          </div>
          <AchievementGallery items={credentials} layout="cards" />
        </div>
      </section>

      <section className="section" aria-labelledby="freelance-title">
        <div className="container">
          <div className="section-head section-head-row">
            <div style={{ display: "grid", gap: 12 }}>
              <p className="eyebrow">freelance</p>
              <h2 id="freelance-title">Upwork track record</h2>
            </div>
            <a href={freelance.profileUrl} className="btn" target="_blank" rel="noopener noreferrer">
              <Briefcase /> View Upwork profile <ExternalLink />
              <span className="visually-hidden">(opens in new tab)</span>
            </a>
          </div>

          <dl className={styles.stats}>
            {freelance.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className={styles.subhead}>Selected client work</h3>
          <ul className={styles.chips}>
            {freelance.highlights.map((h) => (
              <li key={h} className="chip">{h}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
