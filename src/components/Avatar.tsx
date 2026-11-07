import Image from "next/image";
import { profile } from "@/data/profile";

type AvatarProps = { size?: number; priority?: boolean };

/** Shows profile.photo via next/image when set, otherwise a monogram. */
export default function Avatar({ size = 64, priority = false }: AvatarProps) {
  const shared = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: "2px solid var(--accent)",
    boxShadow: "0 0 0 4px var(--accent-soft)",
  } as const;

  if (profile.photo) {
    return (
      <Image
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        width={size}
        height={size}
        sizes={`${size}px`}
        priority={priority}
        style={{ ...shared, objectFit: "cover" }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{
        ...shared,
        display: "grid",
        placeItems: "center",
        background: "var(--surface-2)",
        color: "var(--accent)",
        font: `600 ${Math.round(size * 0.36)}px/1 var(--font-mono)`,
      }}
    >
      {profile.initials}
    </span>
  );
}
