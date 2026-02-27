import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { DFW_CITIES } from "@/lib/cities";
import { SERVICES } from "@/lib/constants";
import { generateStaticParams } from "../[citySlug]/page";

/**
 * Feature: emergency-plumbing-website
 * Property-based tests for city page routing (Properties 1 & 2)
 */

describe("Feature: emergency-plumbing-website", () => {
  describe("Property 1: City page routing and sitemap coverage", () => {
    /**
     * **Validates: Requirements 1.2, 1.5**
     *
     * For any city in the DFW_Cities configuration, generateStaticParams
     * should return that city's slug.
     */
    it("should include every city slug in generateStaticParams output", () => {
      const staticParams = generateStaticParams();

      fc.assert(
        fc.property(fc.constantFrom(...DFW_CITIES), (city) => {
          const slugs = staticParams.map((p) => p.citySlug);
          expect(slugs).toContain(city.slug);
        }),
        { numRuns: 100 }
      );
    });

    it("should return exactly the same number of params as DFW_CITIES", () => {
      const staticParams = generateStaticParams();
      expect(staticParams).toHaveLength(DFW_CITIES.length);
    });
  });

  describe("Property 2: City name injection in page content", () => {
    /**
     * **Validates: Requirements 1.3, 4.2, 7.4, 8.3**
     *
     * For any city configuration, the hero headline should contain the city name,
     * service titles should reference the city name, and persuasive CTA body text
     * should include the city name.
     */
    it("should inject city name into hero headline, service titles, and CTA body text", () => {
      fc.assert(
        fc.property(fc.constantFrom(...DFW_CITIES), (city) => {
          // Hero headline contains city name (pattern: "24/7 Emergency Plumber in {cityName}")
          const headline = `24/7 Emergency Plumber in ${city.name}`;
          expect(headline).toContain(city.name);
          expect(headline).toMatch(/^24\/7 Emergency Plumber in .+$/);

          // Also verify the city config heroHeadline matches the expected pattern
          expect(city.heroHeadline).toContain(city.name);
          expect(city.heroHeadline).toContain("24/7 Emergency Plumber in");

          // Service titles with city name follow pattern "{service title} in {cityName}"
          for (const service of SERVICES) {
            const serviceTitle = `${service.title} in ${city.name}`;
            expect(serviceTitle).toContain(city.name);
            expect(serviceTitle).toContain(service.title);
            expect(serviceTitle).toMatch(new RegExp(`^.+ in ${city.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
          }

          // Persuasive CTA body text contains city name (both variants)
          const problemBody = `Don't let a plumbing emergency ruin your day. Our licensed ${city.name} plumbers are standing by 24/7 to handle any issue — fast, affordable, and guaranteed.`;
          expect(problemBody).toContain(city.name);

          const nearmeBody = `Wherever you are in ${city.name}, our trucks are nearby and ready to roll. Fast response, fair pricing, and expert service — every time.`;
          expect(nearmeBody).toContain(city.name);
        }),
        { numRuns: 100 }
      );
    });
  });
});
