const headphonesConcept = "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=format&fit=crop&w=1400&q=85";
const motionConcept = "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=format&fit=crop&w=1400&q=85";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WA_BASE, mailtoLink, serviceMessage, waLink } from "@/lib/contact";
import { MEDIA, type MediaRef } from "./media";
import { Arrow, Logo, Reveal, SectionHead, btn } from "./ui";

const NAV = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Reviews", "#reviews"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

const HERO_WA = waLink("Hi Taiwo! I'm working on something and would love Blueframe Motion's help bringing it to life. Here's the idea: ");

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className={`sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md transition-colors ${scrolled ? "border-border" : "border-transparent"}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" aria-label="Blueframe Motion home"><Logo /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="link-underline text-[15px] font-medium text-navy/80 hover:text-navy">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block"><a href="#contact" className={btn.primary}>Start a project</a></div>
          <Button variant="ghost"
            ref={menuButton}
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border p-0 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[2px] w-5 bg-navy transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] w-5 bg-navy transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </Button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="mobile-navigation max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 lg:hidden">
        <ul className="divide-y divide-border">
          {NAV.map(([l, h]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-4 text-lg font-medium text-navy">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" onClick={() => setOpen(false)} className={`${btn.primary} h-auto whitespace-normal mt-4 w-full`}>Start a project</a>
      </nav>
    </header>
  );
}

function PlayIcon({ big = false }: { big?: boolean }) {
  return (
    <span className={`grid place-items-center rounded-full bg-background text-primary shadow-lift transition-transform duration-300 group-hover:scale-110 ${big ? "h-20 w-20" : "h-14 w-14"}`}>
      <svg aria-hidden viewBox="0 0 24 24" className={big ? "h-7 w-7 ml-1" : "h-5 w-5 ml-0.5"} fill="currentColor"><path d="M7 4.5v15l12-7.5z" /></svg>
    </span>
  );
}

export function Hero({ onPlay }: { onPlay: (m: MediaRef) => void }) {
  return (
    <section id="top" className="overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:px-8 md:pt-14">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Blueframe Motion Studio / Animation • CGI • AI Video</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-[2.65rem] font-semibold leading-[1.08] text-navy md:text-6xl">Make your next idea <span className="text-primary">impossible</span> to scroll past.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Product animation and promotional films with a clear creative direction. 3D motion, character animation and AI-assisted video for brands, founders and creative teams.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={HERO_WA} target="_blank" rel="noopener noreferrer" className={btn.primary}>Tell us what you're making <Arrow /></a>
            <Button variant="ghost" type="button" onClick={() => onPlay(MEDIA[0])} className={`${btn.outline} h-auto whitespace-normal`}>Watch a product reference <Arrow /></Button>
          </div>
        </Reveal>
        <Reveal className="mt-9">
          <figure className="overflow-hidden rounded-lg bg-pale">
            <img src={headphonesConcept} alt="Cobalt headphones with brushed-metal details in a product concept styleframe" width={1440} height={960} fetchPriority="high" className="hero-production-frame w-full object-cover" />
          </figure>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-navy">Product direction / Concept styleframe</span>
            <span>Illustrative concept — not a client commission</span>
            <a href="#work" className="link-underline inline-flex items-center gap-2 font-semibold text-primary">Explore visual references <Arrow /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Strip() {
  const items = ["Product launches", "Campaigns", "Explainers", "Social-first content", "Brand stories", "Vertical video"];
  return (
    <section aria-label="What we make" className="border-y border-border bg-cloud">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-display text-lg font-semibold text-navy">Made for launches, campaigns, explainers and social-first content.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          {items.map((i) => <li key={i} className="flex items-center gap-2"><span aria-hidden className="h-1.5 w-1.5 rounded-sm bg-primary" />{i}</li>)}
        </ul>
      </div>
    </section>
  );
}

const SERVICES = [
  { t: "CGI & 3D product animation", d: "Show every angle, material and detail of your product with photoreal or stylised 3D renders.", img: headphonesConcept, n: "01", tag: "Product / 3D" },
  { t: "Product launch films", d: "A cinematic announcement piece that gives your launch a clear, memorable first impression.", img: MEDIA[0].poster, n: "02", tag: "Launch / Film" },
  { t: "Character & mascot animation", d: "Bring a brand character to life with personality, expression and consistent movement.", img: MEDIA[3].poster, n: "03", tag: "Character / VFX" },
  { t: "AI avatar / spokesperson video", d: "Present updates, tutorials or pitches with a talking-head avatar — no filming day required.", img: MEDIA[2].poster, n: "04", tag: "AI / Presentation" },
  { t: "AI-assisted video ads & social clips", d: "Fast, platform-ready short-form variations for testing hooks across Reels, TikTok and Shorts.", img: headphonesConcept, n: "05", tag: "Social / Campaign" },
  { t: "Motion graphics, explainers & logo animation", d: "Turn complex ideas into clear visual stories and give your logo a signature reveal.", img: motionConcept, n: "06", tag: "Brand / Explainer" },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-h" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <SectionHead id="services-h" eyebrow="Services" title="A studio catalogue, built around your goal.">
        From a single logo sting to a full launch film — pick a format, or tell us the goal and we'll recommend one.
      </SectionHead>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.t} delay={(i % 3) * 90}>
            <article className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft">
              <div className="relative aspect-[3/2] overflow-hidden bg-pale">
                <img src={s.img} alt="" loading="lazy" width={720} height={480} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute bottom-3 left-3 rounded bg-background/95 px-2.5 py-1 text-xs font-semibold text-navy">{s.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-3 text-xs font-semibold text-primary">/{s.n}</p><h3 className="min-h-14 text-xl font-semibold text-navy">{s.t}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{s.d}</p>
                <a href={waLink(serviceMessage(s.t))} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-primary">
                  <span className="link-underline">Discuss this service</span> <Arrow />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Service imagery: concept styleframes and Pexels visual references, not client commissions.</p>
    </section>
  );
}

export function Gallery({ onPlay }: { onPlay: (m: MediaRef) => void }) {
  const more = [
    ["Product animation", "https://www.pexels.com/search/videos/product%20animation/"],
    ["Character animation", "https://www.pexels.com/search/videos/character%20animation/"],
    ["3D avatar", "https://www.pexels.com/search/videos/3d%20avatar/"],
  ];
  return (
    <section id="work" aria-labelledby="work-h" className="bg-cloud py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead id="work-h" eyebrow="Visual references" title="Promo showcase. A sense of what’s possible." />
          <p className="max-w-sm border-l-2 border-primary pl-5 text-sm leading-relaxed text-muted-foreground">
            These are licensed visual references used to demonstrate possible formats. They are not claimed as Blueframe Motion client projects.
          </p>
        </div>
        <div className="mt-12 grid gap-x-7 gap-y-10 md:grid-cols-2">
          {MEDIA.map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <figure className="overflow-hidden">
                <Button variant="ghost" type="button" onClick={() => onPlay(m)} className="group relative block h-auto w-full whitespace-normal p-0 overflow-hidden rounded-lg hover:bg-transparent" aria-label={`Play visual reference: ${m.title}`}>
                  <img src={m.poster} alt={`${m.title} (stock footage still)`} loading="lazy" width={1260} height={750} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 grid place-items-center opacity-90 transition-opacity group-hover:opacity-100"><PlayIcon /></span>
                  <span className="absolute left-3 top-3 rounded bg-background/95 px-2 py-1 text-[11px] font-bold tracking-wide text-primary">Visual reference</span>
                  <span className="absolute right-3 top-3 rounded bg-navy/85 px-2 py-1 text-[11px] font-semibold text-navy-foreground">{m.tag}</span>
                </Button>
                <figcaption className="flex flex-wrap items-start justify-between gap-3 pt-4"><div>
                  <p className="font-display text-lg font-semibold text-navy">{m.title}</p>
                  <a href={m.source} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-sm text-muted-foreground underline-offset-2 hover:text-primary hover:underline">
                    Stock footage · {m.credit} ↗
                  </a></div><span className="pt-1 text-xs font-semibold text-primary">/{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:flex-wrap md:items-center md:gap-6">
          <span className="font-semibold text-navy">Browse more free references:</span>
          {more.map(([l, h]) => <a key={h} href={h} target="_blank" rel="noopener noreferrer" className="link-underline text-primary">{l} on Pexels ↗</a>)}
          <a href="https://www.heygen.com/tool/free-avatar-video-generator" target="_blank" rel="noopener noreferrer" className="link-underline text-primary">AI avatar example (external tool, not our work) ↗</a>
        </div>
      </div>
    </section>
  );
}

export function VideoModal({ media, onClose }: { media: MediaRef | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    const d = ref.current;
    if (!d) return;
    if (media && !d.open) d.showModal();
    if (!media && d.open) d.close();
  }, [media]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="video-title"
      className="media-modal m-auto w-[min(96vw,980px)] max-h-[94vh] overflow-auto rounded-lg border border-border bg-background p-0 text-foreground shadow-lift"
    >
      {media && (
        <div className="p-4 md:p-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Visual reference · stock footage</p>
              <h2 id="video-title" className="mt-1 text-xl font-semibold text-navy md:text-2xl">{media.title}</h2>
            </div>
            <Button variant="ghost" type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border p-0 hover:border-primary" aria-label="Close video">
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path d="M3 3l10 10M13 3L3 13" /></svg>
            </Button>
          </div>
          <div className="grid place-items-center overflow-hidden rounded-lg bg-navy">
            <video key={media.id} src={media.mp4} poster={media.poster} controls autoPlay playsInline preload="none" onError={() => setFailed(true)} className={media.vertical ? "max-h-[70vh] max-w-full w-auto" : "aspect-video w-full"}>
              Your browser does not support HTML video.
            </video>
          </div>
          {failed && <p role="status" className="mt-3 rounded-md border border-border bg-cloud p-3 text-sm text-muted-foreground">This browser couldn't play the clip. <a href={media.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Watch the reference on Pexels ↗</a></p>}
          <p className="mt-3 text-sm text-muted-foreground">
            Source: <a href={media.source} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">{media.credit} on Pexels ↗</a>. Shown as a format reference — not a Blueframe Motion project.
          </p>
        </div>
      )}
    </dialog>
  );
}

const STEPS = [
  ["Brief & direction", "Share your goal, audience, platform and references. We'll ask the right questions and confirm scope and timeline after reviewing the brief."],
  ["Storyboard / styleframes", "Before animating, we agree on the look, key frames and flow so there are no surprises later."],
  ["Production & motion", "Modelling, animation, AI-assisted generation, sound and edit — built to the approved direction."],
  ["Review & delivery", "You review drafts, request agreed revisions, and receive final files sized for your chosen platforms."],
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <SectionHead id="process-h" eyebrow="Process" title="A clear path from brief to final frame.">
        Every project is different, so we confirm scope and timeline after reviewing your brief — never before.
      </SectionHead>
      <ol className="mt-12 grid gap-8 border-t border-border md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(([t, d], i) => (
          <li key={t} className="bg-background pt-8">
            <Reveal delay={i * 90}>
              <span className="font-display text-5xl font-semibold text-primary/70">0{i + 1}</span>
              <h3 className="mt-6 text-xl font-semibold text-navy">{t}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function About() {
  const points = [
    ["Work directly with Taiwo Emmanuel", "No account-manager relay — you talk to the person leading your project."],
    ["Clear communication", "Regular updates and plain-language feedback rounds."],
    ["Direction agreed first", "Styleframes and storyboards approved before production begins."],
    ["Delivered for your platform", "Exports sized and formatted for where your video will live."],
  ];
  return (
    <section id="about" aria-labelledby="about-h" className="bg-navy py-24 text-navy-foreground md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-navy-foreground/70">About / approach</p>
          <h2 id="about-h" className="mt-4 text-4xl font-semibold md:text-5xl">Small-studio attention, flexible creative production.</h2>
          <p className="mt-6 text-lg leading-relaxed text-navy-foreground/80">
            Blueframe Motion is led by Taiwo Emmanuel. We combine traditional animation craft with modern AI-assisted tools, choosing whichever approach best serves your idea, timeline and budget.
          </p>
          <a href="#contact" className={`${btn.primary} h-auto whitespace-normal mt-8`}>Start a conversation <Arrow /></a>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {points.map(([t, d], i) => (
            <li key={t}>
              <Reveal delay={i * 80} className="h-full border-t border-navy-foreground/25 py-6">
                <span aria-hidden className="text-sm font-semibold text-navy-foreground/60">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-navy-foreground/75">{d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FAQS = [
  ["What do you need from me?", "A short description of your goal, audience and where the video will be published, plus any references, brand assets, product photos or scripts you have. If you don't have everything yet, that's fine — we can shape the brief together."],
  ["Can I request a specific style?", "Yes. Share reference videos or images you like and we'll discuss what's achievable for your scope. Styleframes are agreed before production so the direction is clear."],
  ["Can you make vertical video?", "Yes. We can produce vertical (9:16), square and widescreen versions. Let us know your target platforms at the start so framing is planned for each."],
  ["How are revisions handled?", "The number of revision rounds is agreed as part of the scope before work begins. Most changes are easiest at the storyboard and styleframe stage, so we review early and often."],
  ["Can you work from an existing product or photo?", "Often, yes. Product photos, CAD files, packaging artwork or a physical sample can be used as reference for 3D or motion work. We'll confirm what's needed after seeing your materials."],
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[1fr_1.4fr]">
      <SectionHead id="faq-h" eyebrow="FAQ" title="Good questions, honest answers." />
      <div className="divide-y divide-border border-y border-border">
        {FAQS.map(([q, a]) => (
          <details key={q} className="group py-2">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-4 font-display text-lg font-semibold text-navy hover:text-primary">
              {q}
              <span aria-hidden className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border text-primary transition-transform">+</span>
            </summary>
            <p className="pb-5 pr-12 leading-relaxed text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-cloud">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">CGI, 3D animation, character work and AI-assisted video for brands and creative teams.</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-navy">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {NAV.map(([l, h]) => <li key={h}><a href={h} className="link-underline hover:text-navy">{l}</a></li>)}
          </ul>
        </nav>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-navy">Contact</p>
          <a href={mailtoLink("Project inquiry – Blueframe Motion")} className="mt-3 block break-all hover:text-primary">{EMAIL}</a>
          <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="mt-2 block hover:text-primary">WhatsApp {PHONE_DISPLAY}</a>
          <a href={`tel:${PHONE_TEL}`} className="mt-2 block hover:text-primary">Call {PHONE_DISPLAY}</a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-8">
          <p>Blueframe Motion • led by Taiwo Emmanuel</p>
          <p>
            Visual references (stock footage via Pexels):{" "}
            {MEDIA.map((m, i) => (
              <span key={m.id}>
                <a href={m.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">{m.credit.replace(" / Pexels", "")}</a>
                {i < MEDIA.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}