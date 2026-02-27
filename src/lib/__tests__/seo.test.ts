import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  generateCityMetadata,
  generateLocalBusinessJsonLd,
  generateFAQJsonLd,
  generateServiceJsonLd,
} from "../seo";
import { DFW_CITIES } from "../cities";
import { COMPANY, SERVICES } from "../constants";

/**
 * Feature: emergency-plumbing-website
 * Property-based tests for SEO utilities (Properties 3, 4, 5)
 */

describe("Feature: emergency-plumbing-website", () => {
  describe("Property 3: City-specific metadata generation", () => {
    /**
     * **Validates: Requirements 2.1, 2.2**
     *
     * For any city configuration, the generated metadata should produce a title
     * containing the city name following the pattern
     * "[City] Emergency Plumber | 24/7 Fast Response | [Company]",
     * and a description containing the city name, at least one service keyword,
     * and a call-to-action phrase.
     */
    it("should generate metadata with city name in title pattern and description with keywords and CTA", () => {
      const serviceKeywords = [
        "burst pipe",
        "drain cleaning",
        "leak detection",
        "water heater",
        "sewer",
        "plumb",
        "emergency",
      ];

      const ctaPhrases = ["call now", "call", "contact", "response"];

      fc.assert(
        fc.property(fc.constantFrom(...DFW_CITIES), (city) => {
          const metadata = generateCityMetadata(city);

          // Title follows pattern: "[City] Emergency Plumber | 24/7 Fast Response | [Company]"
          const title = metadata.title as string;
          expect(title).toContain(city.name);
          expect(title).toContain("Emergency Plumber");
          expect(title).toContain("24/7 Fast Response");
          expect(title).toContain(COMPANY.name);

          // Description contains city name
          const description = metadata.description as string;
          expect(description.toLowerCase()).toContain(city.name.toLowerCase());

          // Description contains at least one service keyword
          const descLower = description.toLowerCase();
          const hasServiceKeyword = serviceKeywords.some((kw) =>
            descLower.includes(kw)
          );
          expect(hasServiceKeyword).toBe(true);

          // Description contains a call-to-action phrase
          const hasCTA = ctaPhrases.some((cta) => descLower.includes(cta));
          expect(hasCTA).toBe(true);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("Property 4: City-specific JSON-LD generation", () => {
    /**
     * **Validates: Requirements 2.4, 2.5**
     *
     * For any city configuration, the generated JSON-LD should include a
     * LocalBusiness object with the city's name in the areaServed field,
     * and a FAQPage object whose questions and answers match the city's FAQ data.
     */
    it("should generate LocalBusiness JSON-LD with city in areaServed and FAQPage matching FAQ data", () => {
      fc.assert(
        fc.property(fc.constantFrom(...DFW_CITIES), (city) => {
          // LocalBusiness: areaServed contains city name
          const localBusiness = generateLocalBusinessJsonLd(city);
          expect(localBusiness["@type"]).toBe("LocalBusiness");
          expect(localBusiness.areaServed).toBeDefined();
          expect(localBusiness.areaServed.name).toBe(city.name);

          // FAQPage: questions and answers match city FAQ data
          const faqJsonLd = generateFAQJsonLd(city.faqs);
          expect(faqJsonLd["@type"]).toBe("FAQPage");
          expect(faqJsonLd.mainEntity).toHaveLength(city.faqs.length);

          city.faqs.forEach((faq, index) => {
            const entity = faqJsonLd.mainEntity[index];
            expect(entity["@type"]).toBe("Question");
            expect(entity.name).toBe(faq.question);
            expect(entity.acceptedAnswer["@type"]).toBe("Answer");
            expect(entity.acceptedAnswer.text).toBe(faq.answer);
          });
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("Property 5: Service JSON-LD generation", () => {
    /**
     * **Validates: Requirements 2.6**
     *
     * For any service in the services list, the generated Service JSON-LD
     * should contain the service name and description matching the source data.
     */
    it("should generate Service JSON-LD containing name and description for all services", () => {
      fc.assert(
        fc.property(fc.constantFrom(...SERVICES), (service) => {
          const jsonLd = generateServiceJsonLd([service]);
          expect(jsonLd["@type"]).toBe("ItemList");
          expect(jsonLd.itemListElement).toHaveLength(1);

          const item = jsonLd.itemListElement[0];
          expect(item["@type"]).toBe("ListItem");
          expect(item.item["@type"]).toBe("Service");
          expect(item.item.name).toBe(service.title);
          expect(item.item.description).toBe(service.description);
        }),
        { numRuns: 100 }
      );
    });
  });
});
