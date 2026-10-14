import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NETLIFY_FORM_ENDPOINT,
  NETLIFY_FORM_NAME,
  submitNetlifyForm,
} from "@/lib/netlify-form";
import { getTimeSlotsForDay, openDays } from "@/lib/appointment-slots";
import { business } from "@/lib/business";
import { createFormBooking } from "@/lib/bookings.functions";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [selectedDay, setSelectedDay] = useState("");
  const timeSlots = selectedDay ? getTimeSlotsForDay(selectedDay) : [];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      await submitNetlifyForm(form);
      const data = new FormData(form);
      try {
        await createFormBooking({
          data: {
            clientName: String(data.get("name") ?? ""),
            phone: String(data.get("phone") ?? ""),
            service: String(data.get("subject") ?? ""),
            preferredDay: String(data.get("preferred-day") ?? ""),
            preferredTime: String(data.get("preferred-time") ?? ""),
            notes: String(data.get("message") ?? ""),
          },
        });
      } catch {
        /* The enquiry email is already sent if the diary is unavailable. */
      }
      form.reset();
      setSelectedDay("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10";

  const selectField = cn(field, "form-field-select cursor-pointer");

  const label = "mb-2 block text-sm font-medium text-foreground";

  return (
    <form
      name={NETLIFY_FORM_NAME}
      action={NETLIFY_FORM_ENDPOINT}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className={cn("appointment-card space-y-5 p-6 sm:p-8", className)}
    >
      <div>
        <h3 className="font-display text-[1.625rem] text-foreground sm:text-[2.125rem]">
          Book your appointment
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Call, message or DM us on Instagram. We&apos;ll find a time that works.
        </p>
      </div>

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
        <span className={label}>Telephone</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className={field}
          placeholder="Your phone number"
        />
      </label>

      <label className="block">
        <span className={label}>Subject</span>
        <select name="subject" className={selectField} defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>Book an appointment</option>
          <option>Colour consultation</option>
          <option>Bridal and occasion hair</option>
          <option>Nails and beauty</option>
          <option>Group booking</option>
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Preferred day</span>
          <select
            required
            name="preferred-day"
            className={selectField}
            value={selectedDay}
            onChange={(event) => setSelectedDay(event.target.value)}
          >
            <option value="" disabled>Select a day</option>
            {openDays.map((entry) => (
              <option key={entry.day} value={entry.day}>
                {entry.day}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Preferred time</span>
          <select
            required
            name="preferred-time"
            className={selectField}
            disabled={!selectedDay}
            defaultValue=""
            key={selectedDay}
          >
            <option value="" disabled>
              {selectedDay ? "Select a time" : "Choose a day first"}
            </option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={label}>Message</span>
        <textarea
          required
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Service, stylist or anything else we should know…"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "book-now-cta inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium sm:w-auto",
          status === "sending" && "book-now-cta-still opacity-70",
        )}
      >
        <span className="relative z-[1]">{status === "sending" ? "Sending…" : "Send message"}</span>
        <ArrowRight
          className={cn(
            "relative z-[1] h-4 w-4",
            status !== "sending" && "book-now-arrow-nudge",
          )}
          aria-hidden
        />
      </button>

      {status === "sent" && (
        <p className="text-sm text-primary">Thank you - we&apos;ll be in touch shortly.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please call us on {business.phoneDisplay}.
        </p>
      )}
    </form>
  );
}
