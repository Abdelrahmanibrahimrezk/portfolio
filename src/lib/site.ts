import { profile } from "@/data/profile";

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL for a custom domain; on Vercel it falls back to the
 * project's production URL automatically.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Portfolio of Abdelrahman Abdelrehim, Senior AI Engineer specializing in Arabic speech recognition, Whisper fine-tuning, LLM systems, RAG and GPU inference optimization. Case studies, skills and experience.",
  keywords: [
    "Senior AI Engineer",
    "AI engineer portfolio",
    "machine learning engineer portfolio",
    "developer portfolio",
    "full-stack developer portfolio",
    "Claude Code portfolio",
    "speech AI",
    "Arabic ASR",
    "Whisper fine-tuning",
    "LLM engineer",
    "LoRA fine-tuning",
    "RAG",
    "generative AI",
    "GPU inference optimization",
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];
