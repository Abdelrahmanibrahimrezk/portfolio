import Link from "next/link";
import { highlights, profile } from "@/data/profile";
import Avatar from "./Avatar";
import { ArrowRight, Download, MapPin } from "./Icons";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`grid-bg ${styles.backdrop}`} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-title" className={styles.title}>
            {profile.name}
            <span className={styles.role}>
              {profile.role}
              <span className={styles.specialties}> · {profile.specialties.join(" · ")}</span>
            </span>
          </h1>

          <p className="lead">{profile.headline}</p>

          <div className={styles.ctas}>
            <Link href="/projects" className="btn btn-primary">
              View case studies <ArrowRight />
            </Link>
            <a href={profile.resumeUrl} className="btn" download>
              <Download /> Download CV
            </a>
          </div>

          <p className={styles.location}>
            <MapPin width={16} height={16} /> {profile.location}
          </p>
        </div>

        <div className={styles.terminal} role="img" aria-label="Terminal summary: Whisper fine-tuned on Egyptian Arabic, word error rate reduced from 96 to 37 percent, a 61 percent relative drop; transcription runtime cut by 87 percent.">
          <div className={styles.termBar} aria-hidden="true">
            <span /><span /><span />
            <p>~/speech-analytics — zsh</p>
          </div>
          <pre className={styles.termBody} aria-hidden="true">
            <code>
              <span className={styles.p}>$</span> whoami{"\n"}
              <span className={styles.out}>{profile.role.toLowerCase().replaceAll(" ", "_")}</span>{"\n\n"}
              <span className={styles.p}>$</span> python eval_asr.py --model whisper-eg{"\n"}
              <span className={styles.muted}>baseline   </span>WER <span className={styles.bad}>96.0%</span>{"\n"}
              <span className={styles.muted}>fine-tuned </span>WER <span className={styles.good}>37.0%</span> <span className={styles.muted}>(−61% rel.)</span>{"\n\n"}
              <span className={styles.p}>$</span> python transcribe.py --gpus 2 --dynamic-batch{"\n"}
              <span className={styles.good}>✓</span> runtime <span className={styles.good}>−87%</span> vs baseline{"\n\n"}
              <span className={styles.p}>$</span> <span className={styles.caret} />
            </code>
          </pre>
          <div className={styles.avatarWrap}>
            <Avatar size={56} />
          </div>
        </div>
      </div>

      <div className="container">
        <dl className={styles.metrics}>
          {highlights.map((h) => (
            <div key={h.label} className={styles.metric}>
              <dt className={styles.metricLabel}>{h.label}</dt>
              <dd className={styles.metricValue}>{h.value}</dd>
              <dd className={styles.metricDetail}>{h.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
