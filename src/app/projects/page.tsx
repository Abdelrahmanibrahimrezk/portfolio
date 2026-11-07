import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectFilter from "@/components/ProjectFilter";
import { categories, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI engineering case studies: Arabic speech analytics, Whisper fine-tuning, Qwen-14B LoRA intent classification, voice RAG, LLM information extraction and call-volume forecasting.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="projects" title="Case studies">
        <p className="lead">
          Each case study covers the business problem, my role, the architecture, key engineering decisions and
          measured results. Most of this work is proprietary, so code and data stay private — the thinking
          doesn&apos;t have to.
        </p>
      </PageHeader>
      <section className="container" style={{ paddingBottom: 80 }} aria-label="Project list">
        <ProjectFilter projects={projects} categories={categories} />
      </section>
    </>
  );
}
