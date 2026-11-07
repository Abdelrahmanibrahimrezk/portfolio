# Abdelrahman Abdelrehim — AI Engineering Portfolio

Next.js 16 (App Router) + TypeScript portfolio for a Senior AI Engineer. Every page is statically pre-rendered. There is no UI framework: styling uses CSS Modules and a small set of design tokens.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

## Customize: edit data, not components

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, role, headline, contact, socials, photo, hero metrics, education, certifications |
| `src/data/projects.ts` | Case studies: cards, filters, `/projects/[slug]` pages, sitemap, metadata |
| `src/data/skills.ts` | Skill groups (`core: true` highlights a skill) |
| `src/data/achievements.ts` | Hall of Fame: award video, certificates, credentials, Upwork stats |
| `src/data/experience.ts` | Timeline entries; `projects` links roles to case studies |
| `public/resume/` | CV PDF used by every "Download CV" button |

**Add a case study:** append an object to `projects`. The route, card, sitemap entry, metadata and JSON-LD are all generated from it.

**GitHub / live demo links:** set `links.repo` / `links.demo` on a project. If neither is set, the card shows a "Private" badge, and the case study explains that the work is proprietary.

**Profile photo:** add a square image (≥ 400×400) at `public/images/profile.jpg` and set `photo: "/images/profile.jpg"` in `profile.ts`. Until then, a monogram is shown.

**Project screenshots or diagrams:** add `image: { src, alt, width, height }` to a project. If a project has no image, its cover art is generated from its `architecture` steps.

## Structure

```
src/
  app/
    layout.tsx               # fonts, metadata, Person JSON-LD, header/contact/footer
    page.tsx                 # Home: Hero → CaseStudyPreview + ProjectGrid → SkillsCloud → ExperienceTimeline
    projects/page.tsx        # All projects with category filter
    projects/[slug]/page.tsx # Case study (generateStaticParams + generateMetadata)
    about/page.tsx           # Bio, experience, education, certifications, skills
    opengraph-image.tsx      # Generated 1200×630 social card
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
  components/                # Hero, ProjectGrid, ProjectCard, ProjectCover, ProjectFilter,
                             # CaseStudyPreview, ArchitectureFlow, SkillsCloud,
                             # ExperienceTimeline, ContactCTA, SiteHeader, ThemeToggle, …
  data/                      # All content (see above)
  lib/site.ts, lib/theme.ts  # Site URL, SEO keywords, nav links, theme bootstrapping
```

## Implementation notes

- **Accessibility:** skip link; semantic landmarks (`header`, `nav`, `main`, `article`, `section` with `aria-labelledby`); visible `:focus-visible` rings. The hamburger menu uses `aria-expanded`/`aria-controls`, closes on Escape and returns focus to the button. Project cards use a single "stretched link", so each card is one tab stop. Metrics use `<dl>`. Filter buttons use `aria-pressed` and announce result counts through a live region. Animations are disabled when `prefers-reduced-motion` is set.
- **Responsive breakpoints:** mobile first. Breakpoints are 640px (tablet: 2-column grid), 900px (desktop navigation and split layouts) and 1024px (3-column grid, case-study sidebar). Pages are tested at 390px with no horizontal scrolling.
- **Theme:** dark by default, with a light theme. An inline script in `<head>` applies the saved or system theme before first paint, so there is no flash.
- **Images:** `next/image` serves AVIF/WebP with `sizes` hints (`Avatar`, `ProjectCover`). Fonts are self-hosted with `next/font`.
- **SEO:** per-page `title`/`description`/canonical, Open Graph and Twitter cards, `Person` and `CreativeWork` JSON-LD, plus `sitemap.xml` and `robots.txt`.

## Deploy

**Vercel (free Hobby plan):** push to GitHub, import the repo at vercel.com/new, then click Deploy. No settings are needed: the site URL falls back to Vercel's production domain automatically. If you add a custom domain, set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` and redeploy.

**Any static host (Netlify, GitHub Pages, S3):** add `output: "export"` and `images: { unoptimized: true }` to `next.config.ts`, run `npm run build`, then deploy the `out/` folder.

Raw source material (`Achievments/`, the original CV and the notes markdown) is git-ignored on purpose. Everything the site needs is in `public/`.
