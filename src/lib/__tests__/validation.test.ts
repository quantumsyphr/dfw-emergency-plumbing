import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { contactFormSchema } from "../validation";

/**
 * Feature: emergency-plumbing-website
 * Property-based tests for contact form validation (Properties 8 & 9)
 */

// --- Arbitraries ---

/** Generates a non-empty string of 1..100 alphanumeric chars */
const validNameArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,99}$/);

/**
 * Generates a phone string matching /^\+?[\d\s\-\(\)]{7,15}$/
 * Built from the allowed character set with length 7-15,
 * optionally prefixed with '+'.
 */
const validPhoneArb = fc
  .tuple(
    fc.boolean(),
    fc.array(fc.constantFrom("0","1","2","3","4","5","6","7","8","9"," ","-","(",")"), { minLength: 7, maxLength: 15 })
  )
  .map(([hasPlus, chars]) => (hasPlus ? "+" : "") + chars.join(""))
  .filter((p) => /^\+?[\d\s\-\(\)]{7,15}$/.test(p));

/**
 * Generates a valid email that Zod's .email() will accept.
 * Simple alphanumeric local parts + common TLDs.
 */
const validEmailArb = fc
  .tuple(
    fc.stringMatching(/^[a-z][a-z0-9]{0,19}$/),
    fc.stringMatching(/^[a-z]{2,10}$/),
    fc.constantFrom("com", "net", "org", "io", "co")
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

/** Generates a non-empty message string of 1..1000 chars */
const validMessageArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 .,!?]{0,999}$/);

/** Generates a complete valid contact form data object */
const validFormDataArb = fc.record({
  name: validNameArb,
  phone: validPhoneArb,
  email: validEmailArb,
  message: validMessageArb,
});

// --- Invalid field arbitraries ---

/** Empty name or name > 100 chars */
const invalidNameArb = fc.oneof(
  fc.constant(""),
  fc.string({ minLength: 101, maxLength: 150 })
);

/** Phone that does NOT match the regex */
const invalidPhoneArb = fc.oneof(
  fc.constant(""),
  fc.constant("abc"),
  fc.constant("123"),
  fc.constant("+1234567890123456"),
  fc.constant("12-34@56")
);

/** Invalid email */
const invalidEmailArb = fc.oneof(
  fc.constant(""),
  fc.constant("notanemail"),
  fc.constant("missing@"),
  fc.constant("@nodomain.com"),
  fc.constant("spaces in@email.com")
);

/** Empty message or message > 1000 chars */
const invalidMessageArb = fc.oneof(
  fc.constant(""),
  fc.string({ minLength: 1001, maxLength: 1100 }).filter((s) => s.length > 1000)
);

describe("Feature: emergency-plumbing-website", () => {
  describe("Property 8: Valid contact form data passes validation", () => {
    /**
     * **Validates: Requirements 13.3**
     *
     * For any contact form input where name is a non-empty string (≤100 chars),
     * phone matches the pattern ^\+?[\d\s\-\(\)]{7,15}$, email is a valid email
     * format, and message is a non-empty string (≤1000 chars), the Zod schema
     * validation should succeed with no errors.
     */
    it("should accept any valid contact form data", () => {
      fc.assert(
        fc.property(validFormDataArb, (formData) => {
          const result = contactFormSchema.safeParse(formData);
          expect(result.success).toBe(true);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("Property 9: Invalid contact form data fails with field-specific errors", () => {
    /**
     * **Validates: Requirements 10.2, 10.3, 13.1, 13.2**
     *
     * For any contact form input where at least one field is invalid,
     * the Zod schema validation should fail and the error result should
     * identify the specific invalid field(s).
     */
    it("should reject form data with an invalid name and report the name field", () => {
      fc.assert(
        fc.property(
          invalidNameArb,
          validPhoneArb,
          validEmailArb,
          validMessageArb,
          (name, phone, email, message) => {
            const result = contactFormSchema.safeParse({ name, phone, email, message });
            expect(result.success).toBe(false);
            if (!result.success) {
              const fieldNames = result.error.issues.map((i) => i.path[0]);
              expect(fieldNames).toContain("name");
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it("should reject form data with an invalid phone and report the phone field", () => {
      fc.assert(
        fc.property(
          validNameArb,
          invalidPhoneArb,
          validEmailArb,
          validMessageArb,
          (name, phone, email, message) => {
            const result = contactFormSchema.safeParse({ name, phone, email, message });
            expect(result.success).toBe(false);
            if (!result.success) {
              const fieldNames = result.error.issues.map((i) => i.path[0]);
              expect(fieldNames).toContain("phone");
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it("should reject form data with an invalid email and report the email field", () => {
      fc.assert(
        fc.property(
          validNameArb,
          validPhoneArb,
          invalidEmailArb,
          validMessageArb,
          (name, phone, email, message) => {
            const result = contactFormSchema.safeParse({ name, phone, email, message });
            expect(result.success).toBe(false);
            if (!result.success) {
              const fieldNames = result.error.issues.map((i) => i.path[0]);
              expect(fieldNames).toContain("email");
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it("should reject form data with an invalid message and report the message field", () => {
      fc.assert(
        fc.property(
          validNameArb,
          validPhoneArb,
          validEmailArb,
          invalidMessageArb,
          (name, phone, email, message) => {
            const result = contactFormSchema.safeParse({ name, phone, email, message });
            expect(result.success).toBe(false);
            if (!result.success) {
              const fieldNames = result.error.issues.map((i) => i.path[0]);
              expect(fieldNames).toContain("message");
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
