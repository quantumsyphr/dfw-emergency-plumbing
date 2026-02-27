export interface CityConfig {
  slug: string;
  name: string;
  county: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  faqs: FAQ[];
  nearbyAreas: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  slug: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  city: string;
}

export interface ProcessStep {
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}
