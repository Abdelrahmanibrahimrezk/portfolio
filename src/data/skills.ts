export type SkillGroup = {
  id: string;
  title: string;
  /** Short command shown in the terminal-style header. */
  command: string;
  skills: { name: string; core?: boolean }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "speech",
    title: "Speech & Audio AI",
    command: "ls ./speech",
    skills: [
      { name: "Whisper", core: true },
      { name: "ASR fine-tuning", core: true },
      { name: "WER / CER evaluation", core: true },
      { name: "Azure AI Speech" },
      { name: "Voice activity detection" },
      { name: "Audio preprocessing" },
      { name: "Speaker diarization" },
    ],
  },
  {
    id: "llm",
    title: "LLMs & Generative AI",
    command: "ls ./genai",
    skills: [
      { name: "LoRA / PEFT", core: true },
      { name: "RAG", core: true },
      { name: "Qwen-14B", core: true },
      { name: "OpenAI APIs" },
      { name: "Azure OpenAI" },
      { name: "Hugging Face Transformers" },
      { name: "Embeddings & vector search" },
      { name: "SGLang" },
      { name: "Prompt engineering" },
    ],
  },
  {
    id: "inference",
    title: "ML & Inference",
    command: "ls ./ml",
    skills: [
      { name: "PyTorch", core: true },
      { name: "GPU optimization", core: true },
      { name: "Dynamic batching", core: true },
      { name: "CUDA" },
      { name: "Quantization (NF4)" },
      { name: "TensorFlow" },
      { name: "scikit-learn" },
      { name: "XGBoost" },
      { name: "Prophet" },
    ],
  },
  {
    id: "data",
    title: "Data & Analytics",
    command: "ls ./data",
    skills: [
      { name: "Python", core: true },
      { name: "SQL", core: true },
      { name: "PySpark" },
      { name: "Databricks" },
      { name: "Pandas / NumPy" },
      { name: "Hive / Parquet" },
      { name: "TIBCO Spotfire" },
      { name: "Power BI" },
      { name: "Arabic NLP" },
    ],
  },
];
