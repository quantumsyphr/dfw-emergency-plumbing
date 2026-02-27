import { FAQ } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  faqs: FAQ[];
  cityName?: string;
}

export function FAQSection({ faqs, cityName }: FAQSectionProps) {
  const heading = cityName
    ? `Frequently Asked Questions — ${cityName}`
    : "Frequently Asked Questions";

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/4 h-48 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto">
        <h2 id="faq-heading" className="text-3xl font-bold text-center text-white mb-8">
          {heading}
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-white/10">
                <AccordionTrigger className="text-base text-white hover:text-blue-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
