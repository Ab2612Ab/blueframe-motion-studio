// Contact helpers: pure functions so a backend can replace the "open draft" step later.
export const EMAIL = "webdevdigitalagency@gmail.com";
export const PHONE_DISPLAY = "+234 904 594 5470";
export const PHONE_TEL = "+2349045945470";
export const WA_BASE = "https://wa.me/2349045945470";

export const waLink = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;
export const mailtoLink = (subject: string, body = "") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const gmailComposeLink = (subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const SERVICES = [
  "CGI & 3D product animation",
  "Product launch film",
  "Character & mascot animation",
  "AI avatar / spokesperson video",
  "AI-assisted video ads & social clips",
  "Motion graphics, explainer & logo animation",
  "Not sure yet",
] as const;

export const PLATFORMS = ["Instagram / TikTok / Reels (vertical)", "YouTube", "Website / landing page", "Paid ads", "Presentation / event", "Other / multiple"] as const;

export const serviceMessage = (service: string) =>
  `Hi Taiwo, I found Blueframe Motion and I'd like to discuss ${service}. Here's a little about my project: `;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export type Inquiry = { name: string; email: string; service: string; platform: string; brief: string };
export function validateInquiry(d: Inquiry) {
  const e: Partial<Record<keyof Inquiry, string>> = {};
  if (!d.name.trim()) e.name = "Please enter your name.";
  else if (d.name.length > 100) e.name = "Name must be under 100 characters.";
  if (!isEmail(d.email.trim())) e.email = "Please enter a valid email address.";
  if (!d.service) e.service = "Choose a service.";
  if (!d.platform) e.platform = "Choose a target platform.";
  if (d.brief.trim().length < 10) e.brief = "Add a short brief (at least 10 characters).";
  else if (d.brief.length > 1500) e.brief = "Keep the brief under 1500 characters.";
  return e;
}
export const inquiryText = (d: Inquiry) =>
  `Hi Taiwo, new project inquiry from the Blueframe Motion website.\n\nName: ${d.name.trim()}\nEmail: ${d.email.trim()}\nService: ${d.service}\nTarget platform: ${d.platform}\n\nBrief:\n${d.brief.trim()}`;

export type Review = { name: string; company: string; service: string; rating: number; review: string; consent: boolean };
export function validateReview(d: Review) {
  const e: Partial<Record<keyof Review, string>> = {};
  if (!d.name.trim()) e.name = "Please enter your name.";
  else if (d.name.length > 100) e.name = "Name must be under 100 characters.";
  if (!d.service) e.service = "Choose the service you received.";
  if (!Number.isInteger(d.rating) || d.rating < 1 || d.rating > 5) e.rating = "Select a rating from 1 to 5 stars.";
  if (d.review.trim().length < 20) e.review = "Please write at least 20 characters.";
  else if (d.review.length > 2000) e.review = "Keep the review under 2000 characters.";
  if (!d.consent) e.consent = "Please confirm we may display your review publicly.";
  return e;
}
export const reviewEmail = (d: Review) => ({
  subject: `Review submission (${d.rating}/5) – ${d.name.trim()}`,
  body: `New review for Blueframe Motion (for moderation)\n\nName: ${d.name.trim()}\nCompany / role: ${d.company.trim() || "—"}\nService: ${d.service}\nRating: ${d.rating}/5\n\nReview:\n${d.review.trim()}\n\nConsent to display publicly: Yes`,
});