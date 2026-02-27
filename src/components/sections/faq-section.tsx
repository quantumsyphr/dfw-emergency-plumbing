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
    <section id="faq" aria-labelledby="faq-heading" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="text-3xl font-bold text-center text-slate-900 mb-8">
          {heading}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-base text-slate-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
