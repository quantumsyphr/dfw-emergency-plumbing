import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[\d\s\-\(\)]{7,15}$/,
      "Please enter a valid phone number (e.g., (555) 123-4567)"
    ),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z.string()
    .min(1, "Message is required")
    .max(1000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
