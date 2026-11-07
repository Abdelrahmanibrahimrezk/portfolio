"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/data/achievements";
import { ArrowLeft, ArrowRight, Close, Expand } from "./Icons";
import styles from "./AchievementGallery.module.css";

type AchievementGalleryProps = {
  items: GalleryImage[];
  layout?: "grid" | "cards";
};

/**
 * Thumbnail grid with a native <dialog> lightbox: Escape closes it, focus is trapped while
 * open and returns to the thumbnail afterwards, and ←/→ step through images.
 */
export default function AchievementGallery({ items, layout = "grid" }: AchievementGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={styles.grid} data-layout={layout}>
        {items.map((item, i) => (
          <li key={item.src} className={styles.item}>
            <button type="button" className={styles.thumb} onClick={() => open(i)}>
              <span className={styles.imageWrap}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className={styles.image}
                />
                <span className={styles.zoom} aria-hidden="true">
                  <Expand />
                </span>
              </span>
              <span className={styles.meta}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.caption}>{item.caption}</span>
              </span>
              <span className="visually-hidden">— view full size</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={current ? current.title : "Image viewer"}
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && (
          <div className={styles.viewer}>
            <div className={styles.viewerBar}>
              <p className={styles.counter}>
                {index! + 1} / {items.length}
              </p>
              <button type="button" className={styles.iconBtn} onClick={close} autoFocus>
                <Close />
                <span className="visually-hidden">Close</span>
              </button>
            </div>
            <div className={styles.full}>
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 1000px, 100vw"
                className={styles.fullImage}
              />
            </div>
            <div className={styles.viewerFoot}>
              <div>
                <p className={styles.title}>{current.title}</p>
                <p className={styles.caption}>{current.caption}</p>
              </div>
              {items.length > 1 && (
                <div className={styles.nav}>
                  <button type="button" className={styles.iconBtn} onClick={() => step(-1)}>
                    <ArrowLeft />
                    <span className="visually-hidden">Previous image</span>
                  </button>
                  <button type="button" className={styles.iconBtn} onClick={() => step(1)}>
                    <ArrowRight />
                    <span className="visually-hidden">Next image</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
