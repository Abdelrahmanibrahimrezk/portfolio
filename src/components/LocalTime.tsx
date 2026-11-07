"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";
import styles from "./LocalTime.module.css";

const MY_TIME_ZONE = "Africa/Cairo";
const MY_CITY = "Alexandria, Egypt";
/** Hours (local, 24h) when I'm usually around to reply. */
const AWAKE_FROM = 9;
const AWAKE_UNTIL = 23;

/** UTC offset in minutes for a time zone at a given instant, e.g. "GMT+5:30" → 330. Handles DST. */
function offsetMinutes(timeZone: string, date: Date) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
  const match = name?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3] ?? 0);
  return match[1] === "-" ? -minutes : minutes;
}

function formatGap(diffMinutes: number) {
  if (diffMinutes === 0) return "same time zone as you";
  const abs = Math.abs(diffMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const amount = [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ");
  return `${amount} ${diffMinutes > 0 ? "ahead of" : "behind"} you`;
}

/**
 * Shows my current local time and how it relates to the visitor's, so they know when their
 * message lands. Rendered after mount only — the server can't know the visitor's time zone.
 */
export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <div className={styles.box} aria-hidden="true" />;

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: MY_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
  const day = new Intl.DateTimeFormat("en-GB", { timeZone: MY_TIME_ZONE, weekday: "long" }).format(now);
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { timeZone: MY_TIME_ZONE, hour: "2-digit", hourCycle: "h23" }).format(now),
  );

  const mine = offsetMinutes(MY_TIME_ZONE, now);
  const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const gap = formatGap(mine - offsetMinutes(visitorZone, now));
  const utc = `GMT${mine >= 0 ? "+" : "-"}${Math.abs(mine / 60)}`;
  const awake = hour >= AWAKE_FROM && hour < AWAKE_UNTIL;

  return (
    <div className={styles.box} data-awake={awake}>
      <span className={styles.icon} aria-hidden="true">{awake ? <Sun /> : <Moon />}</span>
      <p className={styles.text}>
        Your message will arrive at <strong className={styles.time}>{time}</strong> my time
        <span className={styles.meta}>
          {" "}({day}, {MY_CITY} · {utc} · {gap}).
        </span>{" "}
        <span className={styles.reply}>
          {awake ? "I'm usually around now — expect a reply today." : "It's night here — I'll reply in the morning."}
        </span>
      </p>
    </div>
  );
}
