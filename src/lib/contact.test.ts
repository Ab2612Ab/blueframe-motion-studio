import { describe, expect, it } from "vitest";
import { validateReview, validateInquiry, inquiryText, reviewEmail, mailtoLink, serviceMessage, waLink, gmailComposeLink } from "./contact";

const ok = { name: "A", company: "", service: "Product launch film", rating: 5, review: "Great collaboration on our launch.", consent: true };

describe("contact rules", () => {
  it("WhatsApp links go to +234 904 594 5470", () => {
    expect(waLink("hi there")).toBe("https://wa.me/2349045945470?text=hi%20there");
  });
  it("review drafts are addressed to the studio email", () => {
    expect(gmailComposeLink("s", "b")).toContain("to=webdevdigitalagency%40gmail.com");
  });
  it("review requires public-display consent", () => {
    expect(validateReview({ ...ok, consent: false }).consent).toBeDefined();
    expect(validateReview(ok)).toEqual({});
  });
  it("review requires a 1-5 star rating", () => {
    expect(validateReview({ ...ok, rating: 0 }).rating).toBeDefined();
    expect(validateReview({ ...ok, rating: 6 }).rating).toBeDefined();
    for (const rating of [1, 2, 3, 4, 5]) expect(validateReview({ ...ok, rating })).toEqual({});
  });
  it("inquiry drafts include every supplied field and encode the summary", () => {
    const inquiry = { name: "Taiwo", email: "visitor@example.com", service: "CGI & 3D product animation", platform: "YouTube", brief: "A launch film with blue packaging & product details." };
    expect(validateInquiry(inquiry)).toEqual({});
    const message = new URL(waLink(inquiryText(inquiry))).searchParams.get("text");
    for (const value of Object.values(inquiry)) expect(message).toContain(value);
  });
  it("inquiries require name, email, service, platform and written brief", () => {
    expect(Object.keys(validateInquiry({ name: "", email: "invalid", service: "", platform: "", brief: "" }))).toEqual(["name", "email", "service", "platform", "brief"]);
  });
  it("review drafts include the review fields for manual moderation", () => {
    const data = { ...ok, company: "Brand founder" };
    const { subject, body } = reviewEmail(data);
    const draft = new URL(gmailComposeLink(subject, body));
    expect(draft.searchParams.get("to")).toBe("webdevdigitalagency@gmail.com");
    expect(draft.searchParams.get("body")).toBe(body);
    for (const value of [data.name, data.company, data.service, "5/5", data.review, "Consent to display publicly: Yes", "for moderation"]) expect(body).toContain(value);
  });
  it("review requires name, service and written review", () => {
    const errors = validateReview({ ...ok, name: "", service: "", review: "" });
    expect(Object.keys(errors)).toEqual(["name", "service", "review"]);
  });
  it("email fallbacks use the supplied studio address", () => {
    expect(mailtoLink("Hello", "A & B")).toBe("mailto:webdevdigitalagency@gmail.com?subject=Hello&body=A%20%26%20B");
  });
  it("service inquiries prefill the selected category", () => {
    const category = "Character & mascot animation";
    expect(new URL(waLink(serviceMessage(category))).searchParams.get("text")).toContain(category);
  });
});