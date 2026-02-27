import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { DFW_CITIES } from "@/lib/cities";
import { SERVICES } from "@/lib/constants";
import {
  generateCityMetadata,
  generateLocalBusinessJsonLd,
  generateFAQJsonLd,
  generateServiceJsonLd,
} from "@/lib/seo";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustBadges } from "@/components/sections/trust-badges";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PersuasiveCTA } from "@/components/sections/persuasive-cta";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

interface CityPageProps {
  params: Promise<{ citySlug: string }>;
}

export function generateStaticParams() {
  return DFW_CITIES.map((city) => ({ citySlug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const city = DFW_CITIES.find((c) => c.slug === citySlug);
  if (!city) return {};
  return generateCityMetadata(city);
}

export default async function CityPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const city = DFW_CITIES.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const localBusinessJsonLd = generateLocalBusinessJsonLd(city);
  const faqJsonLd = generateFAQJsonLd(city.faqs);
  const serviceJsonLd = generateServiceJsonLd(SERVICES);

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

      <HeroSection cityName={city.name} />
      <TrustBadges />
      <ProcessSection />
      <ServicesSection cityName={city.name} />

      <PersuasiveCTA
        variant="problem"
        headline="Ready to take care of your plumbing problem?"
        body={`Don't let a plumbing emergency ruin your day. Our licensed ${city.name} plumbers are standing by 24/7 to handle any issue — fast, affordable, and guaranteed.`}
        cityName={city.name}
      />

      <TestimonialsCarousel />

      <PersuasiveCTA
        variant="nearme"
        headline="Need urgent plumbers near me?"
        body={`Wherever you are in ${city.name}, our trucks are nearby and ready to roll. Fast response, fair pricing, and expert service — every time.`}
        cityName={city.name}
      />

      <FAQSection faqs={city.faqs} cityName={city.name} />
      <ContactSection />
    </>
  );
}
