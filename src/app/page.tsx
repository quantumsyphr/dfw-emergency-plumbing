import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustBadges } from "@/components/sections/trust-badges";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PersuasiveCTA } from "@/components/sections/persuasive-cta";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DFW_CITIES } from "@/lib/cities";
import { SERVICES, COMPANY } from "@/lib/constants";
import {
  generateLocalBusinessJsonLd,
  generateFAQJsonLd,
  generateServiceJsonLd,
} from "@/lib/seo";
import type { FAQ } from "@/types";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "DFW Emergency Plumber | 24/7 Fast Response | FastFlow Plumbing",
  description:
    "Need an emergency plumber in DFW? FastFlow Plumbing offers 24/7 service across Dallas-Fort Worth with 30-minute response times. Call now for burst pipes, drain cleaning, leak detection & more.",
  openGraph: {
    title: "DFW Emergency Plumber | 24/7 Fast Response | FastFlow Plumbing",
    description:
      "Need an emergency plumber in DFW? FastFlow Plumbing offers 24/7 service across Dallas-Fort Worth with 30-minute response times. Call now!",
    url: COMPANY.domain,
  },
  twitter: {
    title: "DFW Emergency Plumber | 24/7 Fast Response | FastFlow Plumbing",
    description:
      "Need an emergency plumber in DFW? FastFlow Plumbing offers 24/7 service across Dallas-Fort Worth with 30-minute response times. Call now!",
  },
};

const HOMEPAGE_FAQS: FAQ[] = [
  {
    question: "How much does an emergency plumber cost in DFW?",
    answer:
      "Emergency plumbing rates in the DFW metroplex typically range from $150-$500 depending on the issue. We provide upfront pricing with no hidden fees before any work begins.",
  },
  {
    question: "How fast can a plumber get to my house in DFW?",
    answer:
      "Our plumbing trucks are dispatched 24/7 across the entire DFW metroplex and typically arrive within 30 minutes of your call.",
  },
  {
    question: "What plumbing emergencies do you handle?",
    answer:
      "We handle all plumbing emergencies including burst pipes, drain clogs, water heater failures, gas leaks, sewer backups, toilet overflows, and leak detection.",
  },
  {
    question: "Which cities do you serve in DFW?",
    answer:
      "We serve 10 major cities across the DFW metroplex: Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Grand Prairie, and Denton.",
  },
  {
    question: "Are you available 24/7 in the DFW area?",
    answer:
      "Absolutely. Our emergency plumbing team is available 24 hours a day, 7 days a week, including holidays, across the entire DFW metroplex. Call anytime and we will be there.",
  },
];

const localBusinessJsonLd = generateLocalBusinessJsonLd();
const faqJsonLd = generateFAQJsonLd(HOMEPAGE_FAQS);
const serviceJsonLd = generateServiceJsonLd(SERVICES);

export default function HomePage() {
  return (
    <>
      <Script
        id="jsonld-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="jsonld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <HeroSection />
      <TrustBadges />
      <ProcessSection />
      <ServicesSection />

      <PersuasiveCTA
        variant="problem"
        headline="Ready to take care of your plumbing problem?"
        body="Don't let a plumbing emergency ruin your day. Our licensed DFW plumbers are standing by 24/7 to handle any issue — fast, affordable, and guaranteed."
      />

      <TestimonialsCarousel />

      {/* Service Areas Section */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            Service Areas
          </h2>
          <p className="mb-10 text-center text-slate-600">
            We proudly serve 10 cities across the Dallas–Fort Worth metroplex.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {DFW_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-blue-300 hover:bg-blue-50"
              >
                <MapPin className="size-4 text-blue-700 shrink-0" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PersuasiveCTA
        variant="nearme"
        headline="Need urgent plumbers near me?"
        body="Wherever you are in the DFW metroplex, our trucks are nearby and ready to roll. Fast response, fair pricing, and expert service — every time."
      />

      <FAQSection faqs={HOMEPAGE_FAQS} />
      <ContactSection />
    </>
  );
}