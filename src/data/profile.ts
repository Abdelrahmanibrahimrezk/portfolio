export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const profile = {
  name: "Abdelrahman Abdelrehim",
  shortName: "Abdelrahman",
  initials: "AA",
  role: "Senior AI Engineer",
  specialties: ["Speech AI", "Generative AI", "LLM Systems"],
  location: "Alexandria, Egypt",
  availability: "Open to remote roles and relocation (Gulf / Europe)",
  email: "abdelrahman.i.rezk@gmail.com",
  phone: "+20 101 816 0185",
  phoneHref: "tel:+201018160185",
  // Same number on WhatsApp; wa.me needs digits only (country code, no +).
  whatsappHref: "https://wa.me/201018160185?text=Hi%20Abdelrahman%2C%20I%20saw%20your%20portfolio",
  // Square photo in /public; set to null to show the monogram instead.
  photo: "/images/profile.jpg" as string | null,
  resumeUrl: "/resume/Abdelrahman_Abdelrehim_Senior_AI.pdf",
  headline:
    "I build speech and LLM systems that turn messy, real-world Arabic audio into structured insight businesses can act on.",
  summary:
    "Machine learning engineer with ~5 years of experience shipping applied AI for telecom Customer Care and Marketing. I work end to end — from audio preprocessing and dataset curation, through Whisper and LLM fine-tuning, to GPU inference optimization and the dashboards stakeholders actually open.",
  focus: [
    "Arabic & Egyptian-dialect speech recognition",
    "LLM fine-tuning (LoRA / PEFT) and structured extraction",
    "Retrieval-augmented generation",
    "GPU inference optimization and batching",
  ],
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdelrahman-rezk-eg",
      handle: "in/abdelrahman-rezk-eg",
    },
    {
      label: "GitHub",
      href: "https://github.com/Abdelrahmanibrahimrezk",
      handle: "Abdelrahmanibrahimrezk",
    },
    {
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/abdelrahmanibrahim13",
      handle: "Upwork · Top Rated",
    },
  ] satisfies SocialLink[],
};

export const highlights = [
  { value: "−61%", label: "Relative WER reduction", detail: "Egyptian-Arabic calls: 96% → 37% after Whisper fine-tuning" },
  { value: "87%", label: "Faster transcription", detail: "Multiprocessing, dynamic batching, dual-GPU" },
  { value: "87%", label: "Intent accuracy", detail: "160 intents + sub-intents with Qwen-14B + LoRA" },
  { value: "40", label: "Upwork contracts", detail: "25 five-star reviews · Top Rated" },
];

export const education = [
  {
    title: "B.Sc. Electronics & Communication Engineering",
    org: "Alexandria University",
    year: "2018",
  },
  {
    title: "AI-Pro Diploma",
    org: "Information Technology Institute (ITI)",
    year: "2022",
  },
];

export const certifications = [
  "AWS Certified Machine Learning – Specialty (2022)",
  "Udacity Advanced Data Analysis Nanodegree — FWD scholarship (2022)",
];
