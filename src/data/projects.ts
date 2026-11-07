export type ProjectStatus = "Production" | "Deployed component" | "Prototype" | "Evaluation";

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: "Speech AI" | "LLMs" | "RAG" | "Forecasting";
  status: ProjectStatus;
  context: string;
  featured: boolean;
  /** Accent hue (0–360) for the generated cover art. */
  hue: number;
  /** Optional real screenshot/diagram in /public. Falls back to generated cover art. */
  image?: { src: string; alt: string; width: number; height: number };
  links: {
    /** Leave undefined for proprietary work; the card shows a "private" badge instead. */
    repo?: string;
    demo?: string;
  };
  tags: string[];
  stack: string[];
  summary: string;
  metrics: Metric[];
  problem: string[];
  role: string[];
  architecture: string[];
  approach: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  results: string[];
  next?: string[];
  /** Optional honesty note shown on the case study. */
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "speech-analytics-platform",
    title: "Enterprise Arabic Speech Analytics Platform",
    tagline: "Customer-care calls → transcripts → LLM insights → business dashboards.",
    category: "Speech AI",
    status: "Production",
    context: "Vodafone Egypt · Customer Care",
    featured: true,
    hue: 170,
    links: {},
    tags: ["ASR", "LLM", "Analytics", "GPU"],
    stack: ["Python", "Whisper", "Qwen 2.5", "PyTorch", "Hugging Face", "SGLang", "Hive", "Parquet", "TIBCO Spotfire"],
    summary:
      "An end-to-end platform that turns Egyptian-Arabic customer-care recordings into structured, searchable insight — intents, summaries, sentiment, callback promises and recurring issues — for Customer Care leadership.",
    metrics: [
      { value: "−87%", label: "transcription runtime" },
      { value: "−61%", label: "relative WER" },
      { value: "≤87%", label: "intent accuracy" },
    ],
    problem: [
      "Customer-care conversations held the clearest signal about why customers call, why they call back and what keeps breaking — but it was locked inside audio that nobody had time to listen to.",
      "The goal was deliberately broader than a single First-Call-Resolution metric: produce reliable transcripts once, then enrich them so many teams could ask many questions of the same data.",
    ],
    role: [
      "Shaped the project objective and the analytics use cases with business stakeholders.",
      "Owned the ASR track: Egyptian-Arabic Whisper adaptation, audio preprocessing and GPU inference.",
      "Built the LLM enrichment layer: hierarchical intent classification, summarization, PII redaction and callback-promise extraction.",
      "Designed the structured outputs feeding Hive/Parquet datasets and Spotfire dashboards; led capacity planning for a new GPU environment.",
    ],
    architecture: [
      "Call recordings",
      "Audio prep & VAD",
      "Fine-tuned Whisper ASR",
      "Transcript cleanup",
      "LLM enrichment",
      "Validation → Parquet/Hive",
      "Spotfire dashboards",
    ],
    approach: [
      {
        title: "Transcribe once, enrich many times",
        body: "ASR is the expensive step, so transcripts are produced once and stored. Every downstream feature — intents, summaries, sentiment, promises — is an independent LLM pass over the same text, which makes adding a new use case cheap.",
      },
      {
        title: "Hierarchical intent taxonomy",
        body: "Calls are mapped to ~31 top-level intents and their sub-intents using dynamic few-shot prompting and a LoRA-tuned Qwen-14B, with JSON parsing and allowed-label validation so every record is usable in reporting.",
      },
      {
        title: "Summaries that are safe to share",
        body: "LLM-generated call summaries and recurring-issue rollups are passed through sensitive-data redaction (names, phone numbers, identifiers) before they reach business users.",
      },
      {
        title: "Follow-up accountability",
        body: "The pipeline detects when an agent promises a callback and extracts the promised time, enabling checks on whether follow-up obligations were met.",
      },
    ],
    challenges: [
      {
        title: "Dialect, noise and hold music",
        body: "Off-the-shelf Whisper performed poorly on Egyptian-Arabic call audio. Solved with domain fine-tuning and speech-focused preprocessing — see the Whisper case study.",
      },
      {
        title: "Throughput on fixed hardware",
        body: "Transcription dominated runtime. Multiprocessing, dynamic batching and dual-GPU model replicas cut it by 87%.",
      },
      {
        title: "Free text → reliable records",
        body: "LLM output had to be both syntactically valid and consistent with the taxonomy. Constrained prompts plus schema and label validation turned generations into analytical rows.",
      },
    ],
    results: [
      "Production workflow delivering call-level intents, summaries, sentiment and promises into business dashboards.",
      "87% reduction in transcription runtime.",
      "Business teams analyze recurring issues and service performance by intent instead of by sampling calls.",
    ],
    next: [
      "Capacity and latency benchmarking for a new GPU environment (end-to-end timing, GPU utilization, cost/performance).",
    ],
  },
  {
    slug: "whisper-egyptian-arabic",
    title: "Egyptian-Arabic Whisper Fine-Tuning & GPU Optimization",
    tagline: "Adapting Whisper to dialect, domain and noisy call-center audio.",
    category: "Speech AI",
    status: "Deployed component",
    context: "Vodafone Egypt · ASR",
    featured: true,
    hue: 200,
    links: {},
    tags: ["ASR", "Fine-tuning", "GPU"],
    stack: ["Whisper", "PyTorch", "Hugging Face", "NVIDIA A40", "Python", "audfprint"],
    summary:
      "Fine-tuned Whisper on 300+ hours of Egyptian-Arabic speech and rebuilt the inference path for batched, multi-GPU throughput — the foundation of the speech analytics platform.",
    metrics: [
      { value: "−61%", label: "relative WER (96→37%)" },
      { value: "−72%", label: "relative CER (86→24%)" },
      { value: "~7 h", label: "audio in 4 min" },
    ],
    problem: [
      "Customer-care audio differs sharply from Whisper's training distribution: Egyptian dialect, telecom terminology, code-switching with English, line noise and hold music.",
      "Baseline Whisper produced a 96% word error rate on this audio — unusable for any downstream analytics.",
    ],
    role: [
      "Curated training data: 200+ hours of manually annotated customer-care audio plus 100 hours of public Egyptian-Arabic speech to preserve general language ability.",
      "Built the preprocessing and augmentation pipeline.",
      "Ran fine-tuning and evaluation (WER / CER).",
      "Optimized batched GPU inference for production throughput.",
    ],
    architecture: [
      "Annotated + public audio",
      "Preprocess & augment",
      "Log-Mel features",
      "Whisper fine-tuning",
      "WER/CER evaluation",
      "Batched multi-GPU inference",
      "Transcript normalization",
    ],
    approach: [
      {
        title: "Domain data with a general-language anchor",
        body: "Mixing in-domain annotated calls with public Egyptian-Arabic audio targeted the call-center distribution while guarding against catastrophic forgetting.",
      },
      {
        title: "Speech-focused preprocessing",
        body: "Voice activity detection, silence handling, channel selection, normalization and music removal (audio fingerprinting) ensure the model hears speech, not hold music.",
      },
      {
        title: "Throughput engineering",
        body: "Duration-aware dynamic batching, dynamic padding, multiprocessing for I/O and one model replica per GPU across two A40s, with batch-size sweeps (64 / 128 / 256) to find the sweet spot.",
      },
      {
        title: "Mixed-script cleanup",
        body: "Normalization of mixed Arabic/English transcripts so downstream LLMs and analytics receive consistent text.",
      },
    ],
    challenges: [
      {
        title: "Measuring the right thing",
        body: "WER and CER are error rates, not accuracy — reporting both shows that even where words differ (dialect spelling), characters largely align.",
      },
      {
        title: "Balancing adaptation and retention",
        body: "Over-fitting to call audio risks losing general Arabic. The public-audio mix and careful epoch selection kept the model robust.",
      },
    ],
    results: [
      "Word error rate reduced from 96% to 37% — a 61% relative reduction.",
      "Character error rate reduced from 86% to 24% — a 72% relative reduction.",
      "Batched processing of ~100 calls (~7 hours of audio) in about 4 minutes.",
    ],
  },
  {
    slug: "qwen-intent-classification",
    title: "Hierarchical Intent Classification with Qwen-14B",
    tagline: "LoRA-tuned LLM mapping calls to a 31-intent taxonomy with validated JSON output.",
    category: "LLMs",
    status: "Deployed component",
    context: "Vodafone Egypt · LLM",
    featured: true,
    hue: 280,
    links: {},
    tags: ["LLM", "Fine-tuning", "LoRA"],
    stack: ["Qwen-14B", "PEFT / LoRA", "bitsandbytes (NF4)", "Transformers", "SGLang", "Python"],
    summary:
      "Adapter-based fine-tuning and dynamic few-shot prompting of Qwen-14B to classify customer-care transcripts into intents and sub-intents, producing validated, report-ready labels.",
    metrics: [
      { value: "≤87%", label: "accuracy" },
      { value: "~31", label: "top-level intents" },
      { value: "4-bit", label: "QLoRA training" },
    ],
    problem: [
      "Business reporting needed every call mapped to a consistent intent / sub-intent taxonomy. Keyword rules couldn't cope with dialect and free-form conversation, and generic LLM prompting drifted from the allowed labels.",
    ],
    role: [
      "Designed the prompt + taxonomy format and dynamic few-shot example selection.",
      "Ran QLoRA fine-tuning experiments on Qwen-14B.",
      "Built JSON parsing and allowed-label validation.",
      "Integrated serving with SGLang for self-hosted inference.",
    ],
    architecture: [
      "Transcripts + labeled examples",
      "Taxonomy & instructions",
      "Dynamic few-shot retrieval",
      "QLoRA fine-tuned Qwen-14B",
      "JSON + label validation",
      "Analytical records",
    ],
    approach: [
      {
        title: "Memory-efficient fine-tuning",
        body: "4-bit NF4 base model with FP16 compute, LoRA rank 16 / alpha 64 on attention projections (q, k, v, o), gradient checkpointing and 32-step gradient accumulation to fit a 14B model on available GPUs.",
      },
      {
        title: "Dynamic few-shot prompting",
        body: "For each call, the most relevant labeled examples are inserted into the prompt — improving consistency without retraining for every taxonomy tweak.",
      },
      {
        title: "Output you can trust in a dashboard",
        body: "Generations are parsed as JSON and checked against the allowed intent/sub-intent pairs; invalid outputs are rejected rather than silently reported.",
      },
    ],
    challenges: [
      {
        title: "Long-tail classes",
        body: "Low-data categories underperformed after fine-tuning. Mitigation: targeted data collection (~200 more examples for weak classes) and short continued training from the last checkpoint.",
      },
      {
        title: "Serving merged adapters",
        body: "Merged 14B checkpoints hit tokenizer initialization issues in SGLang — a reminder to validate the full artifact (weights + tokenizer files) before deployment.",
      },
    ],
    results: [
      "Up to 87% accuracy on hierarchical intent classification.",
      "Structured, validated intent labels powering repeat-contact and recurring-issue analytics.",
    ],
  },
  {
    slug: "voice-assistant-rag",
    title: "Conversational Voice Assistant with RAG",
    tagline: "Speak a question, get a grounded spoken answer from a knowledge base.",
    category: "RAG",
    status: "Prototype",
    context: "Independent proof of concept",
    featured: false,
    hue: 150,
    links: {},
    tags: ["RAG", "Voice", "LLM"],
    stack: ["Python", "OpenAI APIs", "Speech-to-text", "Embeddings", "Vector search", "Text-to-speech"],
    summary:
      "A voice-first assistant chaining speech-to-text, retrieval-augmented generation over knowledge content, LLM response generation and text-to-speech.",
    metrics: [
      { value: "4", label: "stage voice loop" },
      { value: "RAG", label: "grounded answers" },
      { value: "PoC", label: "standalone build" },
    ],
    problem: [
      "Self-service channels need answers grounded in up-to-date knowledge content — and many customers prefer to speak rather than type.",
    ],
    role: [
      "Designed and built the full prototype independently.",
      "Implemented document chunking, embeddings and similarity retrieval.",
      "Wired STT → retrieval → generation → TTS into a single conversational loop.",
    ],
    architecture: [
      "User speech",
      "Speech-to-text",
      "Query embedding",
      "Vector retrieval",
      "LLM answer",
      "Text-to-speech",
    ],
    approach: [
      {
        title: "Retrieval first",
        body: "Knowledge documents are split into overlapping chunks, embedded and indexed; each spoken query retrieves the most relevant context before generation.",
      },
      {
        title: "Grounded generation",
        body: "The LLM is instructed to answer from retrieved context, keeping responses tied to the knowledge source.",
      },
      {
        title: "Open-model variant",
        body: "A separate experiment explored the same RAG pattern with a quantized Qwen model for self-hosted use.",
      },
    ],
    challenges: [
      {
        title: "Error propagation",
        body: "Transcription mistakes become retrieval mistakes. Query quality from STT is the first thing to evaluate in a voice RAG system.",
      },
      {
        title: "End-to-end latency",
        body: "Four sequential model calls add up; streaming and caching are the natural next optimizations.",
      },
    ],
    results: ["Working voice-to-voice RAG prototype demonstrating the full conversational loop."],
    next: ["Streaming responses and barge-in handling", "Retrieval and groundedness evaluation"],
  },
  {
    slug: "lifestyle-analyzer",
    title: "AI-Powered Lifestyle Analyzer",
    tagline: "Bilingual interviews and diaries → structured marketing insight.",
    category: "LLMs",
    status: "Production",
    context: "Vodafone Egypt · Marketing",
    featured: false,
    hue: 35,
    links: {},
    tags: ["Extraction", "Azure AI", "Speech"],
    stack: ["Python", "Azure AI Speech", "Azure OpenAI", "Whisper", "JSON Schema", "Azure Blob Storage"],
    summary:
      "An audio-to-insights workflow that transcribes Arabic/English customer interviews and lifestyle diaries and extracts structured activities, places, brands and products, mapped to customer segments.",
    metrics: [
      { value: "AR + EN", label: "bilingual input" },
      { value: "JSON", label: "schema-validated output" },
      { value: "Segments", label: "mapped interests" },
    ],
    problem: [
      "Marketing research produced hours of interviews and pages of diaries. Reviewing them manually was slow, and insights stayed anecdotal instead of comparable across segments.",
    ],
    role: [
      "Built the transcription integration with Azure speech services, including long-audio chunking.",
      "Designed extraction prompts, field definitions and speaker filtering.",
      "Implemented schema validation and mapping of extracted entities to customer segments.",
    ],
    architecture: [
      "Interview audio / diaries",
      "Convert & chunk audio",
      "AR/EN transcription",
      "Speaker filtering",
      "LLM field extraction",
      "Schema validation",
      "Segment mapping",
    ],
    approach: [
      {
        title: "Participant-only signal",
        body: "Speaker identification separates the interviewer's prompts from the participant's answers so extracted interests belong to the customer.",
      },
      {
        title: "Explicit field definitions",
        body: "Each output field (activity, place, brand, product, influencer, relationship context) has a definition and extraction rules, reducing inconsistent or invented values.",
      },
      {
        title: "Segment-level insight",
        body: "Extracted locations and activities are mapped to customer segments, informing targeting and surfacing relevant interests for each segment.",
      },
    ],
    challenges: [
      {
        title: "Code-switching",
        body: "Mixed Arabic/English speech was initially translated to English-only output; language settings had to preserve the original mix.",
      },
      {
        title: "Service limits",
        body: "Long recordings exceeded file-size limits, requiring conversion and chunking while preserving continuity across segments.",
      },
      {
        title: "Valid ≠ correct",
        body: "Schema-valid JSON doesn't prove faithful extraction — prompts explicitly forbid inventing entities that weren't mentioned.",
      },
    ],
    results: [
      "Structured lifestyle records from bilingual interviews and diaries.",
      "Segment-level interest maps used to inform Marketing targeting.",
    ],
  },
  {
    slug: "call-volume-forecasting",
    title: "AI Call Volume Forecasting",
    tagline: "Next-month, next-day and 30-minute intraday demand forecasts for workforce planning.",
    category: "Forecasting",
    status: "Evaluation",
    context: "Vodafone Egypt · Customer Care",
    featured: false,
    hue: 320,
    links: {},
    tags: ["Time series", "Optuna", "XGBoost"],
    stack: ["Python", "Pandas", "Prophet", "XGBoost", "Optuna", "scikit-learn"],
    summary:
      "Daily and intraday call-volume forecasting with Prophet and XGBoost, tuned with Optuna and evaluated against the existing manual forecast.",
    metrics: [
      { value: "8.42%", label: "next-month MAPE" },
      { value: "vs 9.45%", label: "manual forecast" },
      { value: "30 min", label: "intraday intervals" },
    ],
    problem: [
      "Workforce planning depended on manual forecasts. Under- or over-forecasting call demand directly affects staffing cost and customer wait times.",
    ],
    role: [
      "Built daily next-month and next-day forecasting models.",
      "Designed leakage-safe evaluation per forecast horizon.",
      "Extended forecasts to 30-minute intraday intervals with daily/interval consistency checks.",
      "Tuned Prophet with Optuna (time-series CV, RMSE objective, 150 trials).",
    ],
    architecture: [
      "Historical volumes",
      "Calendar & event features",
      "Chronological validation",
      "Prophet / XGBoost",
      "Intraday forecasts",
      "Consistency checks",
      "Compare vs manual",
    ],
    approach: [
      {
        title: "Horizon-honest features",
        body: "A next-month forecast can't use actual volumes from later in that month. Recursive forecasting only uses information available at the forecast origin.",
      },
      {
        title: "Business-event awareness",
        body: "Ramadan, Eid, public holidays, incidents and billing-cycle timing are modeled as holidays/regressors alongside lag and rolling features.",
      },
      {
        title: "Systematic tuning",
        body: "Optuna searched changepoint, seasonality, holiday and incident-regressor settings with time-series cross-validation.",
      },
    ],
    challenges: [
      {
        title: "Data leakage",
        body: "Identified and removed leakage that would have made month-ahead accuracy look better than it could be in practice.",
      },
      {
        title: "Daily vs intraday reconciliation",
        body: "Interval forecasts must sum to a sensible daily total — checked explicitly rather than assumed.",
      },
    ],
    results: [
      "XGBoost next-month MAPE of 8.42% vs 9.45% for the manual forecast on the evaluated period (~11% relative improvement).",
      "Intraday 30-minute forecast workflow with daily bounds and actuals for comparison.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const categories = Array.from(new Set(projects.map((p) => p.category)));
