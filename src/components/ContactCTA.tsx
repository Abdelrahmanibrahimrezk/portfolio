import { profile } from "@/data/profile";
import CopyButton from "./CopyButton";
import { Briefcase, Download, GitHub, LinkedIn, Mail } from "./Icons";
import styles from "./ContactCTA.module.css";

const socialIcons = { LinkedIn, GitHub, Upwork: Briefcase } as const;

export default function ContactCTA() {
  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.copy}>
            <p className="eyebrow">contact</p>
            <h2 id="contact-title" className={styles.title}>
              Building something with speech or LLMs? Let&apos;s talk.
            </h2>
            <p className="lead">
              I&apos;m looking for Senior AI / ML Engineer roles — remote, or relocating to the Gulf or Europe.
              The fastest way to reach me is email.
            </p>
          </div>

          <div className={styles.actions}>
            <div className={styles.emailRow}>
              <a href={`mailto:${profile.email}?subject=Hello%20Abdelrahman`} className="btn btn-primary">
                <Mail /> Email me
              </a>
              <CopyButton value={profile.email} label="Copy email address" />
            </div>
            <a href={profile.resumeUrl} className="btn" download>
              <Download /> Download CV (PDF)
            </a>
            <ul className={styles.socials}>
              {profile.socials.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons];
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                      {Icon && <Icon />}
                      <span>{s.handle}</span>
                      <span className="visually-hidden"> ({s.label}, opens in new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
