import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  EMAIL, PHONE_DISPLAY, PHONE_TEL, PLATFORMS, SERVICES, WA_BASE,
  gmailComposeLink, inquiryText, mailtoLink, reviewEmail, validateInquiry, validateReview,
  waLink, type Inquiry, type Review,
} from "@/lib/contact";
import { Arrow, FieldError, Reveal, SectionHead, Star, btn, field } from "./ui";

const label = "mb-1.5 block text-sm font-semibold text-navy";

export function Contact() {
  const empty: Inquiry = { name: "", email: "", service: "", platform: "", brief: "" };
  const [d, setD] = useState<Inquiry>(empty);
  const [err, setErr] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [sent, setSent] = useState<string | null>(null);
  const set = (k: keyof Inquiry) => (e: { target: { value: string } }) => setD({ ...d, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = validateInquiry(d);
    setErr(v);
    if (Object.keys(v).length) {
      setSent(null);
      document.getElementById(`c-${Object.keys(v)[0]}`)?.focus();
      return;
    }
    const url = waLink(inquiryText(d));
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const a = (k: keyof Inquiry) => ({ id: `c-${k}`, "aria-invalid": !!err[k], "aria-describedby": err[k] ? `c-${k}-e` : undefined });

  return (
    <section id="contact" aria-labelledby="contact-h" className="border-t border-border bg-cloud py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead id="contact-h" eyebrow="Contact" title="Tell us what you're making.">
            Send a quick brief and it opens in WhatsApp, ready to send. Prefer email? That works too.
          </SectionHead>
          <Reveal className="mt-10 space-y-3">
            <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="lift flex items-center justify-between rounded-lg border border-border bg-background p-5 shadow-soft">
              <span><span className="block text-sm text-muted-foreground">WhatsApp</span><span className="font-display text-lg font-semibold text-navy">{PHONE_DISPLAY}</span></span><Arrow />
            </a>
            <a href={mailtoLink("Project inquiry – Blueframe Motion")} className="lift flex items-center justify-between rounded-lg border border-border bg-background p-5 shadow-soft">
              <span className="min-w-0"><span className="block text-sm text-muted-foreground">Email</span><span className="block break-all font-display text-lg font-semibold text-navy">{EMAIL}</span></span><Arrow />
            </a>
            <a href={`tel:${PHONE_TEL}`} className="block pl-1 text-sm text-muted-foreground hover:text-primary">Or call {PHONE_DISPLAY}</a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form onSubmit={submit} noValidate className="border-t-2 border-primary bg-background p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className={label}>Name</label>
                <input {...a("name")} className={field} value={d.name} onChange={set("name")} maxLength={100} autoComplete="name" />
                <FieldError id="c-name-e" msg={err.name} />
              </div>
              <div>
                <label htmlFor="c-email" className={label}>Email</label>
                <input {...a("email")} type="email" className={field} value={d.email} onChange={set("email")} maxLength={255} autoComplete="email" />
                <FieldError id="c-email-e" msg={err.email} />
              </div>
              <div>
                <label htmlFor="c-service" className={label}>Service</label>
                <select {...a("service")} className={field} value={d.service} onChange={set("service")}>
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <FieldError id="c-service-e" msg={err.service} />
              </div>
              <div>
                <label htmlFor="c-platform" className={label}>Target platform</label>
                <select {...a("platform")} className={field} value={d.platform} onChange={set("platform")}>
                  <option value="">Select a platform</option>
                  {PLATFORMS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <FieldError id="c-platform-e" msg={err.platform} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-brief" className={label}>Short brief</label>
                <textarea {...a("brief")} rows={5} className={field} value={d.brief} onChange={set("brief")} maxLength={1500} placeholder="What are you making, who is it for, and when do you need it?" />
                <FieldError id="c-brief-e" msg={err.brief} />
              </div>
            </div>
            <Button variant="ghost" type="submit" className={`${btn.primary} h-auto whitespace-normal mt-6 w-full`}>Send brief via WhatsApp <Arrow /></Button>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Or <a className="font-semibold text-primary underline" href={mailtoLink("Project inquiry – Blueframe Motion", inquiryText(d))}>send these details by email</a>
            </p>
            <div role="status" aria-live="polite">
              {sent && (
                <div className="mt-5 rounded-lg border border-primary/25 bg-pale p-4 text-sm text-navy">
                  WhatsApp should have opened with your brief — just press send. Didn't open?{" "}
                  <a href={sent} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Open WhatsApp</a> or{" "}
                  <a href={mailtoLink("Project inquiry – Blueframe Motion", inquiryText(d))} className="font-semibold text-primary underline">use email instead</a>. Your details stay in the form.
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Reviews() {
  const [open, setOpen] = useState(false);
  return (
    <section id="reviews" aria-labelledby="reviews-h" className="border-b border-border bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead id="reviews-h" eyebrow="Reviews" title="Client feedback, published honestly.">
          Reviews appear here only after a real client submits them and they've been checked.
        </SectionHead>
        <Reveal className="mt-8">
          <div className="border-t border-border pt-8 text-center">
            <div className="flex justify-center gap-1.5" aria-hidden>{[1, 2, 3, 4, 5].map((i) => <Star key={i} filled={false} className="h-7 w-7" />)}</div>
            <p className="mt-2 text-sm font-medium text-muted-foreground">No published reviews yet</p>
            <h3 className="mx-auto mt-5 max-w-xl text-2xl font-semibold text-navy md:text-3xl">Have we worked together? Your feedback helps the next client know what to expect.</h3>
            <Button variant="ghost" type="button" onClick={() => setOpen(true)} className={`${btn.primary} h-auto whitespace-normal mt-8`}>Leave a review</Button>
          </div>
        </Reveal>
      </div>
      <ReviewDialog open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function ReviewDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const empty: Review = { name: "", company: "", service: "", rating: 0, review: "", consent: false };
  const [d, setD] = useState<Review>(empty);
  const [err, setErr] = useState<Partial<Record<keyof Review, string>>>({});
  const [draft, setDraft] = useState<{ gmail: string; mailto: string } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = validateReview(d);
    setErr(v);
    if (Object.keys(v).length) {
      setDraft(null);
      document.getElementById(`r-${Object.keys(v)[0]}`)?.focus();
      return;
    }
    // Future: replace with a backend POST; keep email as moderation fallback.
    const { subject, body } = reviewEmail(d);
    const links = { gmail: gmailComposeLink(subject, body), mailto: mailtoLink(subject, body) };
    setDraft(links);
    window.open(links.gmail, "_blank", "noopener,noreferrer");
  };
  const a = (k: keyof Review) => ({ id: `r-${k}`, "aria-invalid": !!err[k], "aria-describedby": err[k] ? `r-${k}-e` : undefined });

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="review-title"
      className="media-modal m-auto w-[min(94vw,620px)] max-h-[92vh] overflow-auto rounded-lg border border-border bg-background p-0 text-foreground shadow-lift"
    >
      <form onSubmit={submit} noValidate className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Leave a review</p>
            <h2 id="review-title" className="mt-1 text-2xl font-semibold text-navy">Share your experience</h2>
          </div>
          <Button variant="ghost" type="button" onClick={onClose} aria-label="Close review form" className="grid p-0 h-10 w-10 shrink-0 place-items-center rounded-md border border-border hover:border-primary">
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path d="M3 3l10 10M13 3L3 13" /></svg>
          </Button>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="r-name" className={label}>Name *</label>
            <input {...a("name")} className={field} value={d.name} maxLength={100} onChange={(e) => setD({ ...d, name: e.target.value })} autoComplete="name" />
            <FieldError id="r-name-e" msg={err.name} />
          </div>
          <div>
            <label htmlFor="r-company" className={label}>Company / role <span className="font-normal text-muted-foreground">(optional)</span></label>
            <input id="r-company" className={field} value={d.company} maxLength={120} onChange={(e) => setD({ ...d, company: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="r-service" className={label}>Service received *</label>
            <select {...a("service")} className={field} value={d.service} onChange={(e) => setD({ ...d, service: e.target.value })}>
              <option value="">Select a service</option>
              {SERVICES.filter((s) => s !== "Not sure yet").map((s) => <option key={s}>{s}</option>)}
            </select>
            <FieldError id="r-service-e" msg={err.service} />
          </div>
          <fieldset className="sm:col-span-2" aria-describedby={err.rating ? "r-rating-e" : undefined}>
            <legend className={label}>Rating *</legend>
            <div id="r-rating" tabIndex={-1} role="radiogroup" className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="cursor-pointer rounded p-1 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring">
                  <input type="radio" name="rating" value={n} checked={d.rating === n} onChange={() => setD({ ...d, rating: n })} className="sr-only" />
                  <span className="sr-only">{n} star{n > 1 ? "s" : ""}</span>
                  <Star filled={n <= d.rating} className="h-8 w-8 transition-transform hover:scale-110" />
                </label>
              ))}
            </div>
            <FieldError id="r-rating-e" msg={err.rating} />
          </fieldset>
          <div className="sm:col-span-2">
            <label htmlFor="r-review" className={label}>Your review *</label>
            <textarea {...a("review")} rows={5} className={field} value={d.review} maxLength={2000} onChange={(e) => setD({ ...d, review: e.target.value })} />
            <FieldError id="r-review-e" msg={err.review} />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 text-sm text-navy">
              <input {...a("consent")} type="checkbox" checked={d.consent} onChange={(e) => setD({ ...d, consent: e.target.checked })} className="mt-0.5 h-5 w-5 accent-primary" />
              I agree that Blueframe Motion may display my name, company/role and review publicly on this website. *
            </label>
            <FieldError id="r-consent-e" msg={err.consent} />
          </div>
        </div>
        <Button variant="ghost" type="submit" className={`${btn.primary} h-auto whitespace-normal mt-6 w-full`}>Prepare review email</Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">This opens an email draft to {EMAIL}. Reviews are published only after moderation.</p>
        <div role="status" aria-live="polite">
          {draft && (
            <div className="mt-5 rounded-lg border border-primary/25 bg-pale p-4 text-sm text-navy">
              <strong>Your email draft is ready — please press send.</strong> Your review isn't public yet; it will be published after moderation. Gmail didn't open?{" "}
              <a href={draft.gmail} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Open Gmail draft</a> or{" "}
              <a href={draft.mailto} className="font-semibold text-primary underline">use your email app</a>.
            </div>
          )}
        </div>
      </form>
    </dialog>
  );
}