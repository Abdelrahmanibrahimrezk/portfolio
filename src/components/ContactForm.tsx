"use client";

import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Check, Send } from "./Icons";
import LocalTime from "./LocalTime";
import styles from "./ContactForm.module.css";

/**
 * Free key from https://web3forms.com (enter your email, the key arrives by mail).
 * It is a public key by design: it only allows sending to the address it was created for.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

/** One-click openers; the visitor continues typing after the text. */
const STARTERS = [
  { label: "Full-time role", topic: "Full-time role", text: "Hi Abdelrahman, I'm hiring for a role that matches your AI experience. The position is " },
  { label: "Interview invite", topic: "Interview", text: "Hi Abdelrahman, we'd like to invite you to an interview for " },
  { label: "New project", topic: "New project", text: "Hi Abdelrahman, I'm planning a new project and " },
  { label: "Speech / Arabic ASR", topic: "Speech AI", text: "Hi Abdelrahman, we need help with speech recognition / Arabic audio — specifically " },
  { label: "LLM or RAG app", topic: "LLM / RAG", text: "Hi Abdelrahman, we're building an LLM / RAG solution and " },
  { label: "Consultation", topic: "Consultation", text: "Hi Abdelrahman, I'd like a short consultation about " },
  { label: "Just saying hi", topic: "Hello", text: "Hi Abdelrahman, I came across your portfolio and " },
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<string | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const applyStarter = (starter: (typeof STARTERS)[number]) => {
    const field = messageRef.current;
    if (!field) return;
    const current = field.value.trim();
    // Replace an empty or untouched starter; otherwise keep what they wrote below the opener.
    const untouched = current === "" || STARTERS.some((s) => s.text.trim() === current);
    field.value = untouched ? starter.text : `${starter.text}\n\n${field.value}`;
    setTopic(starter.topic);
    field.focus();
    field.setSelectionRange(starter.text.length, starter.text.length);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Without a key, fall back to opening the visitor's mail app with the message pre-filled.
    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`${topic ? `[${topic}] ` : ""}Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    data.append("access_key", ACCESS_KEY);
    data.append("subject", `${topic ? `[${topic}] ` : ""}Portfolio message from ${data.get("name")}`);
    if (topic) data.append("topic", topic);
    data.append("from_name", "Portfolio contact form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Submission failed");
      form.reset();
      setTopic(null);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneIcon} aria-hidden="true"><Check /></span>
        <p className={styles.doneTitle}>Message sent — thank you!</p>
        <p className={styles.doneText}>I&apos;ll reply to the email you provided, usually within a day.</p>
        <button type="button" className="btn" onClick={() => setStatus("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-labelledby="contact-form-title">
      <p id="contact-form-title" className={styles.title}>
        <span aria-hidden="true">$ </span>leave a message
      </p>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required maxLength={100} />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={200} />
        </div>
      </div>

      <div className={styles.field}>
        <p id="cf-starters-label" className={styles.startersLabel}>Not sure how to start? Pick one:</p>
        <ul className={styles.starters} aria-labelledby="cf-starters-label">
          {STARTERS.map((s) => (
            <li key={s.label}>
              <button
                type="button"
                className={styles.starter}
                aria-pressed={topic === s.topic}
                onClick={() => applyStarter(s)}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message">Message</label>
        <textarea
          ref={messageRef}
          id="cf-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          placeholder="Role, project or question — anything helps."
        />
      </div>

      {/* Honeypot: hidden from people, bots fill it and Web3Forms discards the submission. */}
      <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <LocalTime />

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        <Send /> {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p className={styles.error} role="alert">
        {status === "error" && (
          <>Something went wrong. Please email me directly at <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>.</>
        )}
      </p>
    </form>
  );
}
