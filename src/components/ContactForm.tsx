"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Check, Send } from "./Icons";
import styles from "./ContactForm.module.css";

/**
 * Free key from https://web3forms.com (enter your email, the key arrives by mail).
 * It is a public key by design: it only allows sending to the address it was created for.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Without a key, fall back to opening the visitor's mail app with the message pre-filled.
    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    data.append("access_key", ACCESS_KEY);
    data.append("subject", `Portfolio message from ${data.get("name")}`);
    data.append("from_name", "Portfolio contact form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Submission failed");
      form.reset();
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
        <label htmlFor="cf-message">Message</label>
        <textarea
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
