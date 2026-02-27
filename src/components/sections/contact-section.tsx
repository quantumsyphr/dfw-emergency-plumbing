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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <section id="contact" className="relative bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Get a Free Quote
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left column: Form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {submitted && (
                <div className="rounded-md bg-green-500/10 border border-green-500/20 p-4 text-green-300 text-sm">
                  <CheckCircle className="inline size-4 mr-2" />
                  Thank you! We&apos;ll get back to you shortly.
                </div>
              )}

              {submitError && (
                <div className="rounded-md bg-red-500/10 border border-red-500/20 p-4 text-red-300 text-sm">
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-slate-200">
                  Name <span className="text-red-400">*</span>
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={!!errors.name}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-slate-200">
                  Phone <span className="text-red-400">*</span>
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  aria-invalid={!!errors.phone}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-slate-200">
                  Email <span className="text-red-400">*</span>
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={!!errors.email}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-slate-200">
                  Message <span className="text-red-400">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Describe your plumbing issue..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  aria-invalid={!!errors.message}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${errors.message ? "border-red-500" : ""}`}
                  rows={4}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={!isFormValid}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25 border-0 disabled:opacity-40"
              >
                Send Quote Request
              </Button>
            </form>
          </div>

          {/* Right column: Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Call Us Directly
              </h3>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-3 text-3xl font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                <Phone className="size-8" />
                {COMPANY.phone}
              </a>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
              <Clock className="size-4" />
              Available 24/7
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Our Services
              </h3>
              <ul className="space-y-2">
                {SERVICES.map((service) => (
                  <li key={service.slug} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle className="size-4 text-blue-400" />
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
