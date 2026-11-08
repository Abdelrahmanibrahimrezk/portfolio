export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  /** Slugs of related case studies in projects.ts. */
  projects?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Vodafone Egypt",
    role: "Data Scientist — Speech & Generative AI",
    period: "Feb 2023 – Oct 2026",
    location: "Alexandria, Egypt",
    summary:
      "Led the AI side of Customer Care's flagship Arabic speech analytics platform and delivered applied ML for Marketing.",
    highlights: [
      "Built a large-scale Arabic call-analytics workflow: audio preprocessing → ASR → LLM enrichment → TIBCO Spotfire reporting.",
      "Fine-tuned Whisper for Egyptian-Arabic customer-care calls, a 61% relative WER reduction (96% → 37%).",
      "Cut transcription runtime by 87% with multiprocessing, dynamic batching and dual-GPU inference.",
      "Shipped hierarchical intent classification with dynamic few-shot prompting and LoRA-tuned Qwen-14B (87% accuracy across 160 intents + sub-intents).",
      "Built LLM call summaries, recurring-issue rollups, PII redaction and callback-promise extraction.",
      "Delivered a bilingual Lifestyle Analyzer (Azure AI) and KPI-based audience targeting for the Vodafone Maaky campaign.",
    ],
    projects: [
      "speech-analytics-platform",
      "whisper-egyptian-arabic",
      "qwen-intent-classification",
      "lifestyle-analyzer",
      "call-volume-forecasting",
      "voice-assistant-rag",
    ],
  },
  {
    company: "Upwork",
    role: "Freelance Data Scientist",
    period: "2021 – 2024",
    location: "Remote",
    summary: "Delivered machine learning and data science projects for international clients.",
    highlights: [
      "Completed 40 contracts spanning ML modeling, computer vision, NLP and data visualization.",
      "25 five-star client reviews; Top Rated status with a 100% Job Success Score.",
    ],
  },
  {
    company: "Information Technology Institute (ITI)",
    role: "AI Engineer Intern",
    period: "Jan – Dec 2021",
    location: "Egypt",
    summary: "Intensive applied AI program covering computer vision, NLP and MLOps.",
    highlights: [
      "Built a real-time PPE detection application with YOLO, OpenCV, PyTorch and Streamlit.",
    ],
  },
];
