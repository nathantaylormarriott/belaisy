import { useState, type FormEvent } from "react";
import {
  NETLIFY_FORM_ENDPOINT,
  NETLIFY_FORM_NAME,
  submitNetlifyForm,
} from "@/lib/netlify-form";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      await submitNetlifyForm(form);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-brass focus:outline-none transition-colors";

  return (
    <form
      name={NETLIFY_FORM_NAME}
      action={NETLIFY_FORM_ENDPOINT}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Name</span>
          <input required name="name" autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input required type="email" name="email" autoComplete="email" className={field} placeholder="you@example.com" />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow">Subject</span>
        <select name="subject" className={field} defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>Table &amp; group booking</option>
          <option>Private hire</option>
          <option>Book club &amp; events</option>
          <option>Wine tasting evening</option>
        </select>
      </label>

      <label className="block">
        <span className="eyebrow">Message</span>
        <textarea
          required
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Tell us what you have in mind…"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-classic bg-primary text-primary-foreground transition-colors duration-500 hover:bg-brass hover:text-primary disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-primary">Thank you — we'll be in touch shortly.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-oxblood">
          Something went wrong. Please call us on 01827 908437.
        </p>
      )}
    </form>
  );
}
