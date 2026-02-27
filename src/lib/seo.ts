import type { Metadata } from "next";
import type { CityConfig, FAQ, Service } from "@/types";
import { COMPANY } from "./constants";

/**
 * Generates Next.js Metadata for a city landing page.
 * Title pattern: "[City] Emergency Plumber | 24/7 Fast Response | [Company Name]"
 */
export function generateCityMetadata(city: CityConfig): Metadata {
  const canonicalUrl = `${COMPANY.domain}/${city.slug}`;

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: canonicalUrl,
      siteName: COMPANY.name,
      type: "website",
      images: [
        {
          url: `${COMPANY.domain}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${city.name} Emergency Plumber - ${COMPANY.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
      images: [`${COMPANY.domain}/og-image.png`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generates LocalBusiness JSON-LD structured data.
 * City-specific areaServed if city provided, DFW-wide if not.
 */
export function generateLocalBusinessJsonLd(city?: CityConfig) {
  const areaServed = city
    ? {
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: city.county,
        },
      }
    : {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 32.7767,
          longitude: -96.797,
        },
        geoRadius: "50 miles",
      };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    telephone: COMPANY.phone,
    url: city ? `${COMPANY.domain}/${city.slug}` : COMPANY.domain,
    description: COMPANY.tagline,
    areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
  };
}

/**
 * Generates FAQPage JSON-LD structured data from an FAQ array.
 */
export function generateFAQJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Service JSON-LD structured data for each plumbing service.
 */
export function generateServiceJsonLd(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "LocalBusiness",
          name: COMPANY.name,
        },
      },
    })),
  };
}
