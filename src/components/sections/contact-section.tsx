"use client";

import { useState } from "react";
import { COMPANY, SERVICES } from "@/lib/constants";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Clock, CheckCircle } from "lucide-react";

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

function validateField(name: keyof ContactFormData, value: string): string | undefined {
  const result = contactFormSchema.shape[name].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function validateForm(data: ContactFormData): FormErrors {
  const result = contactFormSchema.safeParse(data);
  if (result.success) return {};
  const errors: FormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactFormData;
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isFormValid = contactFormSchema.safeParse(formData).success;

  function handleChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  }

  function handleBlur(field: keyof ContactFormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const allTouched: typeof touched = { name: true, phone: true, email: true, message: true };
    setTouched(allTouched);

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    try {
      // Client-side only — no backend yet
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      setSubmitError(
        `Something went wrong. Please try again or call us directly at ${COMPANY.phone}.`
      );
    }
  }

  return (
    <section id="contact" className="bg-white py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-brand-text">
          Get a Free Quote
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left column: Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {submitted && (
              <div className="rounded-md bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
                <CheckCircle className="inline size-4 mr-2" />
                Thank you! We&apos;ll get back to you shortly.
              </div>
            )}

            {submitError && (
              <div className="rounded-md bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
                {submitError}
              </div>
            )}

            <div>
              <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-brand-text">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!errors.name}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-brand-text">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                id="contact-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                aria-invalid={!!errors.phone}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-brand-text">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!errors.email}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-brand-text">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="contact-message"
                placeholder="Describe your plumbing issue..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                aria-invalid={!!errors.message}
                className={errors.message ? "border-red-500" : ""}
                rows={4}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="destructive"
              size="lg"
              disabled={!isFormValid}
              className="w-full bg-brand-accent hover:bg-brand-accent/90"
            >
              Send Quote Request
            </Button>
          </form>

          {/* Right column: Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-brand-text">
                Call Us Directly
              </h3>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-3 text-3xl font-bold text-brand-accent hover:underline"
              >
                <Phone className="size-8" />
                {COMPANY.phone}
              </a>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
              <Clock className="size-4" />
              Available 24/7
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-brand-text">
                Our Services
              </h3>
              <ul className="space-y-2">
                {SERVICES.map((service) => (
                  <li key={service.slug} className="flex items-center gap-2 text-sm text-brand-text-muted">
                    <CheckCircle className="size-4 text-brand-primary" />
                    {service.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
