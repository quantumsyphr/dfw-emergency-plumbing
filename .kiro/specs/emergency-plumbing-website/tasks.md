# Implementation Plan: Emergency Plumbing Website

## Overview

Build a multi-page lead generation website for 24/7 emergency plumbing services targeting 10 DFW cities. The implementation follows an incremental approach: project setup → data layer → shared components → page assembly → SEO → testing → deployment config.

## Tasks

- [x] 1. Project setup and configuration
  - [x] 1.1 Initialize Next.js 15 project with TypeScript, Tailwind CSS v4, and App Router
    - Run `npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router, src directory
    - Install dependencies: `framer-motion`, `clsx`, `tailwind-merge`, `zod`, `lucide-react`
    - Install shadcn/ui via `npx shadcn@latest init`
    - Add shadcn/ui components: `button`, `card`, `input`, `textarea`, `accordion`
    - Create `src/lib/utils.ts` with `cn()` utility
    - _Requirements: 12.3, 12.4, 12.5_

  - [x] 1.2 Set up Aceternity UI components
    - Create `src/components/aceternity/` directory
    - Add Spotlight component for hero backgrounds
    - Add InfiniteMovingCards component for testimonials carousel
    - Add MovingBorder component for process step cards
    - Add LampEffect component for persuasive CTA backgrounds
    - _Requirements: 12.3_

  - [x] 1.3 Configure color system and global styles
    - Set up CSS variables in `globals.css` for the color system: blue-800 primary, red-600 accent, slate surfaces
    - Configure Tailwind theme extensions for custom colors
    - Set up Inter font via `next/font/google`
    - _Requirements: 12.1_

- [x] 2. Data layer and types
  - [x] 2.1 Create TypeScript types and interfaces
    - Create `src/types/index.ts` with CityConfig, FAQ, Service, Testimonial, ProcessStep, ContactFormData interfaces
    - _Requirements: 1.2, 1.3_

  - [x] 2.2 Create constants and city configuration data
    - Create `src/lib/constants.ts` with COMPANY info, SERVICES array (8 services), TESTIMONIALS array (6+), PROCESS_STEPS array (4 steps)
    - Create `src/lib/cities.ts` with DFW_CITIES array containing all 10 city configs (Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Grand Prairie, Denton) each with slug, name, county, metaTitle, metaDescription, heroHeadline, heroSubheadline, faqs (5+ per city), nearbyAreas
    - _Requirements: 1.2, 1.4, 2.1, 2.2, 2.8, 7.1_

  - [x] 2.3 Create contact form validation schema
    - Create `src/lib/validation.ts` with Zod schema for ContactFormData: name (required, max 100), phone (required, regex pattern), email (required, email format), message (required, max 1000)
    - _Requirements: 13.1, 13.2, 13.3_

  - [x] 2.4 Write property tests for contact form validation (Properties 8 & 9)
    - Install fast-check: `npm install -D fast-check`
    - **Property 8: Valid contact form data passes validation** — generate random valid form data, verify Zod schema passes
    - **Validates: Requirements 13.3**
    - **Property 9: Invalid contact form data fails with field-specific errors** — generate random invalid form data, verify Zod schema fails with correct field errors
    - **Validates: Requirements 10.2, 10.3, 13.1, 13.2**

  - [x] 2.5 Write property test for FAQ data completeness (Property 6)
    - **Property 6: FAQ data completeness** — for all city configs, verify FAQ array has >= 5 items with non-empty question and answer
    - **Validates: Requirements 2.8**

- [x] 3. SEO utilities
  - [x] 3.1 Create SEO utility functions
    - Create `src/lib/seo.ts` with:
      - `generateCityMetadata(city: CityConfig)` returning Next.js Metadata with title, description, openGraph, twitter
      - `generateLocalBusinessJsonLd(city?: CityConfig)` returning LocalBusiness schema JSON-LD
      - `generateFAQJsonLd(faqs: FAQ[])` returning FAQPage schema JSON-LD
      - `generateServiceJsonLd(services: Service[])` returning Service schema JSON-LD
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6, 2.9_

  - [x] 3.2 Write property tests for SEO utilities (Properties 3, 4, 5)
    - **Property 3: City-specific metadata generation** — for all city configs, verify title contains city name in pattern, description contains city name + keywords
    - **Validates: Requirements 2.1, 2.2**
    - **Property 4: City-specific JSON-LD generation** — for all city configs, verify LocalBusiness areaServed and FAQPage questions match
    - **Validates: Requirements 2.4, 2.5**
    - **Property 5: Service JSON-LD generation** — for all services, verify JSON-LD contains name and description
    - **Validates: Requirements 2.6**

- [x] 4. Checkpoint - Verify data layer and SEO utilities
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Shared section components
  - [x] 5.1 Build StickyHeader component
    - Create `src/components/sticky-header.tsx`
    - Fixed position header with backdrop blur on scroll
    - Company logo (text + Lucide wrench icon), city navigation dropdown, tracking number tel: link, "Call Now" button (red accent)
    - Mobile: hamburger menu, compact layout
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 5.2 Build FloatingCallButton component
    - Create `src/components/floating-call-button.tsx`
    - Fixed bottom-center, visible only below md breakpoint
    - shadcn/ui Button with red background, phone icon, "Call Now" text, tel: link
    - _Requirements: 3.5_

  - [x] 5.3 Build HeroSection component
    - Create `src/components/sections/hero-section.tsx`
    - Aceternity Spotlight background effect
    - h1 headline with optional city name injection
    - Subheadline with response time
    - Primary CTA (Call Now with phone number) + secondary CTA (Get a Free Quote anchor)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 5.4 Build TrustBadges component
    - Create `src/components/sections/trust-badges.tsx`
    - 4 badges: Google Reviews 4.9★, BBB A+ Rating, Licensed & Insured, 30-Min Response
    - shadcn/ui Card for each, Framer Motion fade-in
    - Responsive: 2x2 mobile, 4-col desktop
    - _Requirements: 5.1, 5.2_

  - [x] 5.5 Build ProcessSection component
    - Create `src/components/sections/process-section.tsx`
    - 4 steps from PROCESS_STEPS data with numbered circles and Lucide icons
    - Aceternity MovingBorder on step cards
    - CTA with tracking number below
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 5.6 Build ServicesSection component
    - Create `src/components/sections/services-section.tsx`
    - 8 service cards from SERVICES data with Lucide icons
    - Optional city name injection in titles
    - Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop
    - CTA with tracking number below
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 5.7 Build PersuasiveCTA component
    - Create `src/components/sections/persuasive-cta.tsx`
    - Two variants: "problem" and "nearme" with different backgrounds
    - Aceternity LampEffect or gradient background
    - Headline, body copy with optional city name, phone CTA
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 5.8 Build TestimonialsCarousel component
    - Create `src/components/sections/testimonials-carousel.tsx`
    - Aceternity InfiniteMovingCards for auto-scrolling
    - Each card: name, star rating (filled/empty stars), review text, city
    - shadcn/ui Card styling
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 5.9 Build FAQSection component
    - Create `src/components/sections/faq-section.tsx`
    - shadcn/ui Accordion for expandable Q&A
    - Receives FAQ array and optional city name as props
    - Semantic HTML structure
    - _Requirements: 2.7, 2.8_

  - [x] 5.10 Build ContactSection component
    - Create `src/components/sections/contact-section.tsx`
    - Two-column layout: form (left) + info (right)
    - Form with shadcn/ui Input, Textarea, Button; Zod validation with inline errors
    - Right column: large tracking number tel: link, services list, "Available 24/7" badge
    - Submit button disabled until valid; success toast on submit
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 13.1, 13.2, 13.3, 13.4_

  - [x] 5.11 Build Footer component
    - Create `src/components/footer.tsx`
    - 4-column layout: branding, service areas (10 city links), services, contact info
    - Tracking number tel: link, copyright bar
    - _Requirements: 11.1, 11.2, 11.3_

- [x] 6. Checkpoint - Verify all section components render
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Page assembly and routing
  - [x] 7.1 Build RootLayout
    - Create `src/app/layout.tsx` with Inter font, global metadata defaults (Open Graph, Twitter Card), StickyHeader, Footer, FloatingCallButton
    - Wrap children in `<main>` with semantic structure
    - _Requirements: 2.3, 2.9_

  - [x] 7.2 Build Homepage
    - Create `src/app/page.tsx` composing all section components without city name (DFW-wide)
    - Add metadata for homepage: "DFW Emergency Plumber | 24/7 Fast Response | FastFlow Plumbing"
    - Include JSON-LD scripts: LocalBusiness (DFW-wide), FAQPage, Service
    - Add "Service Areas" section linking to all 10 city pages
    - _Requirements: 1.1, 2.3, 2.4, 2.5, 2.6_

  - [x] 7.3 Build City Page with dynamic routing
    - Create `src/app/[city-slug]/page.tsx` with `generateStaticParams()` returning all 10 city slugs
    - Look up city config from DFW_CITIES by slug; call `notFound()` for invalid slugs
    - `generateMetadata()` using `generateCityMetadata(city)`
    - Compose all section components with city name prop
    - Include city-specific JSON-LD scripts
    - _Requirements: 1.2, 1.3, 2.1, 2.2, 2.4, 2.5_

  - [x] 7.4 Write property tests for city page routing (Properties 1 & 2)
    - **Property 1: City page routing and sitemap coverage** — for all city configs, verify generateStaticParams returns their slug and sitemap includes their URL
    - **Validates: Requirements 1.2, 1.5**
    - **Property 2: City name injection in page content** — for all city configs, verify rendered sections contain city name in h1, services, CTAs
    - **Validates: Requirements 1.3, 4.2, 7.4, 8.3**

- [x] 8. Sitemap and robots
  - [x] 8.1 Create sitemap and robots.txt
    - Create `src/app/sitemap.ts` generating sitemap with homepage (priority 1.0) + all 10 city pages (priority 0.9), changeFrequency "weekly"
    - Create `src/app/robots.ts` allowing all crawlers, referencing sitemap URL
    - _Requirements: 1.5, 2.10_

- [x] 9. Remaining property tests
  - [x] 9.1 Write property test for testimonial rendering (Property 7)
    - **Property 7: Testimonial rendering completeness** — for random testimonials, verify rendered card contains name, rating, text
    - **Validates: Requirements 9.1**

- [x] 10. Final checkpoint - Ensure all tests pass and site builds
  - Run `npm run build` to verify SSG generates all pages
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Vercel deployment configuration
  - [x] 11.1 Configure Vercel deployment
    - Verify `next.config.ts` has proper settings for static export if needed
    - Add `vercel.json` if custom headers/redirects are needed
    - Ensure build command and output directory are correct for Vercel
    - _Requirements: 14.1, 14.2, 14.3_

## Notes

- All tasks including property tests are required
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- City data in `lib/cities.ts` is the single source of truth — adding a new city is just adding a config object
- All pages are statically generated at build time for maximum SEO and Vercel edge performance
