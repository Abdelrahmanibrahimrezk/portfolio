import { profile } from "@/data/profile";
import ContactForm from "./ContactForm";
import CopyButton from "./CopyButton";
import { Briefcase, Download, GitHub, LinkedIn, Mail, MessageCircle, Phone } from "./Icons";
import styles from "./ContactCTA.module.css";

const socialIcons = { LinkedIn, GitHub, Upwork: Briefcase } as const;

export default function ContactCTA() {
  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.side}>
            <div className={styles.copy}>
              <p className="eyebrow">contact</p>
              <h2 id="contact-title" className={styles.title}>
                Let&apos;s talk.
              </h2>
              <p className="lead">
                I&apos;m looking for Senior AI / ML Engineer roles — remote, or relocating to the Gulf or Europe.
                Leave a message, or reach me directly.
              </p>
            </div>

            <ul className={styles.channels}>
              <li className={styles.channelRow}>
                <a href={`mailto:${profile.email}`} className={styles.channel}>
                  <span className={styles.channelIcon}><Mail /></span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>Email</span>
                    <span className={styles.channelValue}>{profile.email}</span>
                  </span>
                </a>
                <CopyButton value={profile.email} label="Copy email address" />
              </li>
              <li>
                <a href={profile.whatsappHref} className={styles.channel} target="_blank" rel="noopener noreferrer">
                  <span className={styles.channelIcon}><MessageCircle /></span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>WhatsApp</span>
                    <span className={styles.channelValue}>{profile.phone}</span>
                  </span>
                  <span className="visually-hidden"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className={styles.channel}>
                  <span className={styles.channelIcon}><Phone /></span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>Phone</span>
                    <span className={styles.channelValue}>{profile.phone}</span>
                  </span>
                </a>
              </li>
            </ul>

            <div className={styles.footerRow}>
              <a href={profile.resumeUrl} className="btn" download>
                <Download /> Download CV
              </a>
              <ul className={styles.socials}>
                {profile.socials.map((s) => {
                  const Icon = socialIcons[s.label as keyof typeof socialIcons];
                  return (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social} title={s.label}>
                        {Icon && <Icon />}
                        <span className="visually-hidden">{s.label} (opens in new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
