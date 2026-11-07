import styles from "./ArchitectureFlow.module.css";

type ArchitectureFlowProps = {
  steps: string[];
  label: string;
};

/** Accessible pipeline diagram: an ordered list styled as connected stages. */
export default function ArchitectureFlow({ steps, label }: ArchitectureFlowProps) {
  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <span aria-hidden="true">$ cat </span>pipeline.yaml
      </figcaption>
      <ol className={styles.flow} aria-label={label}>
        {steps.map((step, i) => (
          <li key={step} className={styles.step}>
            <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
