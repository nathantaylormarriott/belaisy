import { useState, type FormEvent } from "react";
import {
  NETLIFY_FORM_ENDPOINT,
  NETLIFY_FORM_NAME,
  submitNetlifyForm,
} from "@/lib/netlify-form";
import { business } from "@/lib/business";

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
    "w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10";

  const label = "mb-2 block text-sm font-medium text-foreground";

  return (
    <form
      name={NETLIFY_FORM_NAME}
      action={NETLIFY_FORM_ENDPOINT}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="card-soft space-y-5 p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input required name="name" autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input required type="email" name="email" autoComplete="email" className={field} placeholder="you@example.com" />
        </label>
      </div>

      <label className="block">
        <span className={label}>Subject</span>
        <select name="subject" className={field} defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>Book an appointment</option>
          <option>Colour consultation</option>
          <option>Bridal and occasion hair</option>
          <option>Nails and beauty</option>
          <option>Group booking</option>
        </select>
      </label>

      <label className="block">
        <span className={label}>Message</span>
        <textarea
          required
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Preferred date, service or stylist…"
        />
      </label>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-primary">Thank you — we&apos;ll be in touch shortly.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please call us on {business.phoneDisplay}.
        </p>
      )}
    </form>
  );
}
