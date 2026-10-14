import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="container-tight">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">Questions</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Booking, opening hours and what to know before you visit.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <Accordion type="single" collapsible className="card-soft mt-10 px-6 sm:px-8">
            {faqs.map((item) => (
              <AccordionItem key={item.question} value={item.question} className="border-border">
                <AccordionTrigger className="py-5 font-display text-lg text-foreground hover:no-underline sm:text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
