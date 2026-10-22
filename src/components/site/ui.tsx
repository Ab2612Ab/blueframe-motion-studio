import { useEffect, useRef, type ReactNode } from "react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden className="relative grid h-9 w-9 place-items-center rounded-md border-[2.5px] border-primary">
        <span className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-primary ml-0.5" />
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-sm bg-primary" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[15px] font-bold tracking-[0.14em] ${light ? "text-navy-foreground" : "text-navy"}`}>BLUEFRAME</span>
        <span className={`block text-[9.5px] font-semibold tracking-[0.32em] ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>MOTION STUDIO</span>
      </span>
    </span>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, children, id }: { eyebrow: string; title: ReactNode; children?: ReactNode; id?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-4xl font-semibold text-navy md:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{children}</p>}
    </Reveal>
  );
}

const base = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-all duration-300 group min-h-11";
export const btn = {
  primary: `${base} bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift`,
  outline: `${base} border border-input bg-background text-navy hover:border-primary hover:text-primary`,
  navy: `${base} bg-navy text-navy-foreground hover:bg-primary`,
};

export const field =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-[16px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25 aria-[invalid=true]:border-destructive";

export function FieldError({ id, msg }: { id: string; msg?: string | undefined }) {
  if (!msg) return null;
  return <p id={id} className="mt-1.5 text-sm text-destructive">{msg}</p>;
}

export function Arrow() {
  return (
    <svg className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

export function Star({ filled, className = "h-5 w-5" }: { filled: boolean; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={`${className} ${filled ? "fill-star text-star" : "fill-none text-input"}`} stroke="currentColor" strokeWidth="1.4">
      <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" strokeLinejoin="round" />
    </svg>
  );
}