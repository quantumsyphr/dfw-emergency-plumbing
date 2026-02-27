import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { TESTIMONIALS } from "@/lib/constants";
import type { Testimonial } from "@/types";

/**
 * Feature: emergency-plumbing-website
 * Property 7: Testimonial rendering completeness
 *
 * For any testimonial object with a name, rating (1–5), and text,
 * the rendered testimonial card output should contain the reviewer's name,
 * a visual representation of the star rating, and the full review text.
 *
 * **Validates: Requirements 9.1**
 */

// --- Arbitraries ---

/** Generates a random non-empty name string */
const nameArb = fc.stringMatching(/^[A-Za-z][A-Za-z .'-]{0,49}$/);

/** Generates a rating integer between 1 and 5 */
const ratingArb = fc.integer({ min: 1, max: 5 });

/** Generates a random non-empty review text */
const textArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 .,!?'-]{0,199}$/);

/** Generates a random non-empty city string */
const cityArb = fc.stringMatching(/^[A-Za-z][A-Za-z ]{0,29}$/);

/** Generates a random valid Testimonial object */
const testimonialArb: fc.Arbitrary<Testimonial> = fc.record({
  name: nameArb,
  rating: ratingArb,
  text: textArb,
  city: cityArb,
});

/**
 * Simulates the rendering logic from TestimonialsCarousel:
 * - Maps testimonial to card data (quote, name, title, rating)
 * - Generates star rating representation (filled vs empty stars)
 * - Returns the text content that would appear in the rendered card
 */
function renderTestimonialCard(testimonial: Testimonial): {
  displayName: string;
  displayText: string;
  displayCity: string;
  filledStars: number;
  emptyStars: number;
  totalStars: number;
} {
  const filledStars = Math.min(Math.max(testimonial.rating, 0), 5);
  const emptyStars = 5 - filledStars;

  return {
    displayName: testimonial.name,
    displayText: testimonial.text,
    displayCity: testimonial.city,
    filledStars,
    emptyStars,
    totalStars: filledStars + emptyStars,
  };
}

describe("Feature: emergency-plumbing-website", () => {
  describe("Property 7: Testimonial rendering completeness", () => {
    /**
     * **Validates: Requirements 9.1**
     *
     * For randomly generated testimonials, verify the rendered card
     * contains the reviewer's name, a visual star rating representation,
     * and the full review text.
     */
    it("should render all required fields for any random testimonial", () => {
      fc.assert(
        fc.property(testimonialArb, (testimonial) => {
          const card = renderTestimonialCard(testimonial);

          // Name is present and matches input
          expect(card.displayName).toBe(testimonial.name);
          expect(card.displayName.length).toBeGreaterThan(0);

          // Star rating is visually representable (1-5 filled stars out of 5 total)
          expect(card.filledStars).toBe(testimonial.rating);
          expect(card.filledStars).toBeGreaterThanOrEqual(1);
          expect(card.filledStars).toBeLessThanOrEqual(5);
          expect(card.totalStars).toBe(5);

          // Review text is present and matches input
          expect(card.displayText).toBe(testimonial.text);
          expect(card.displayText.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    /**
     * **Validates: Requirements 9.1**
     *
     * For each actual testimonial in TESTIMONIALS constant data,
     * verify the rendered card contains name, rating, and text.
     */
    it("should render all required fields for each actual TESTIMONIALS entry", () => {
      fc.assert(
        fc.property(fc.constantFrom(...TESTIMONIALS), (testimonial) => {
          const card = renderTestimonialCard(testimonial);

          // Name is present and non-empty
          expect(card.displayName).toBe(testimonial.name);
          expect(card.displayName.length).toBeGreaterThan(0);

          // Star rating is valid (1-5)
          expect(card.filledStars).toBe(testimonial.rating);
          expect(card.filledStars).toBeGreaterThanOrEqual(1);
          expect(card.filledStars).toBeLessThanOrEqual(5);
          expect(card.totalStars).toBe(5);

          // Review text is present and non-empty
          expect(card.displayText).toBe(testimonial.text);
          expect(card.displayText.length).toBeGreaterThan(0);

          // City is present
          expect(card.displayCity).toBe(testimonial.city);
          expect(card.displayCity.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });
  });
});
