import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { DFW_CITIES } from "../cities";

/**
 * Feature: emergency-plumbing-website
 * Property-based tests for city data (Property 6)
 */

describe("Feature: emergency-plumbing-website, Property 6: FAQ data completeness", () => {
  /**
   * **Validates: Requirements 2.8**
   *
   * For any city in the DFW_Cities configuration, the city's FAQ array
   * should contain at least 5 items, and each FAQ item should have a
   * non-empty question and a non-empty answer.
   */
  it("every city should have at least 5 FAQs with non-empty question and answer", () => {
    fc.assert(
      fc.property(fc.constantFrom(...DFW_CITIES), (city) => {
        expect(city.faqs.length).toBeGreaterThanOrEqual(5);

        for (const faq of city.faqs) {
          expect(faq.question.trim().length).toBeGreaterThan(0);
          expect(faq.answer.trim().length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 }
    );
  });
});
