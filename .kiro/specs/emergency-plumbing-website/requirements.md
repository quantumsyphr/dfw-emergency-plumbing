# Requirements Document

## Introduction

A multi-page lead generation website for 24/7 emergency plumbing services targeting the DFW (Dallas–Fort Worth) metroplex. The site follows a "rank and rent" business model: city-specific landing pages are optimized for local SEO, AIO (AI Overview), and GEO (Generative Engine Optimization) to capture search traffic for high-intent plumbing keywords. Calls are routed through tracking numbers to a plumbing business partner, and the site owner earns recurring revenue from the leads generated.

The website targets 10 major DFW cities with dedicated landing pages, a shared homepage, and a contact/quote system. Built with Next.js (App Router), Aceternity UI, shadcn/ui, and Tailwind CSS. Deployed on Vercel.

## Glossary

- **Website**: The Next.js-based emergency plumbing lead generation website
- **CTA**: A call-to-action element (button, link, or banner) prompting the visitor to call the tracking phone number
- **City_Page**: A dedicated landing page for a specific DFW city, optimized for local SEO with city-specific content, keywords, and structured data
- **Homepage**: The main landing page at the root URL, targeting the broader DFW metroplex
- **Hero_Section**: The top-most visible area of a page containing the primary headline, value proposition, and main CTA
- **Trust_Badge**: A visual element displaying third-party credibility indicators such as Google review ratings, BBB accreditation, or licensing info
- **Process_Section**: A step-by-step visual guide showing how the service works from initial call to job completion
- **Services_Section**: A content area describing the emergency plumbing services offered
- **FAQ_Section**: A section with frequently asked questions and answers, optimized for AI search engines and featured snippets
- **Testimonials_Carousel**: A rotating display of client reviews and testimonials
- **Contact_Section**: A section containing a contact/quote form, phone number, service list, and 24/7 availability messaging
- **Sticky_Header**: A fixed-position header element that remains visible as the user scrolls, always displaying the phone number
- **Floating_CTA**: A fixed-position call button visible on mobile devices at all times
- **Tracking_Number**: A VoIP phone number used to track call volume and forward calls to the actual plumbing business partner
- **Visitor**: A person browsing the website
- **DFW_Cities**: The 10 target cities: Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Grand Prairie, Denton
- **Target_Keywords**: The set of high-intent search terms each City_Page targets, including variations of "emergency plumber [city]", "24 hour plumber [city]", "plumber near me [city]", and service-specific terms

## Requirements

### Requirement 1: Multi-Page Site Structure with Keyword Targeting

**User Story:** As a site owner, I want dedicated pages for each DFW city targeting all common emergency plumbing search terms, so that each page can rank for the full range of local search queries.

#### Acceptance Criteria

1. THE Website SHALL have a Homepage at the root URL targeting "emergency plumber DFW", "DFW plumbing", and broader metroplex keywords
2. THE Website SHALL have a dedicated City_Page for each of the 10 DFW_Cities at the URL path `/[city-slug]` (e.g., `/plano`, `/fort-worth`)
3. WHEN a City_Page is rendered, THE Website SHALL include the city name naturally in the h1 heading, h2 subheadings, body copy, and image alt text
4. THE Website SHALL target the following keyword patterns for each city: "[city] emergency plumber", "emergency plumber in [city]", "24 hour plumber [city]", "plumber near me [city]", "[city] plumbing repair", "[city] burst pipe repair", "[city] drain cleaning", "[city] water heater repair", "[city] leak detection", "[city] sewer repair"
5. THE Website SHALL include a sitemap.xml listing all pages for search engine discovery

### Requirement 2: SEO, AIO, and GEO Optimization

**User Story:** As a site owner, I want each page optimized for traditional search, AI Overviews, and generative AI engines, so that the site appears in all modern search result formats.

#### Acceptance Criteria

1. THE Website SHALL generate unique meta titles for each City_Page following the pattern "[City] Emergency Plumber | 24/7 Fast Response | [Company Name]"
2. THE Website SHALL generate unique meta descriptions for each City_Page containing the city name, primary service keywords, and a call-to-action
3. THE Website SHALL use semantic HTML elements (h1, h2, h3, section, article, nav, footer, main) for proper document structure on every page
4. THE Website SHALL include JSON-LD structured data for LocalBusiness schema on each City_Page with city-specific service area, phone number, and business hours
5. THE Website SHALL include JSON-LD structured data for FAQPage schema on each City_Page
6. THE Website SHALL include JSON-LD structured data for Service schema listing each plumbing service offered
7. THE Website SHALL include an FAQ_Section on each City_Page with city-specific questions and concise, direct answers formatted for AI extraction
8. THE FAQ_Section SHALL contain at least 5 questions covering: cost of emergency plumbing, response time, common emergencies handled, service area, and availability
9. THE Website SHALL use Open Graph and Twitter Card meta tags for social sharing optimization
10. THE Website SHALL include a robots.txt file allowing search engine crawling of all public pages

### Requirement 3: Sticky Header with Tracking Number

**User Story:** As a visitor, I want to always see the phone number, so that I can call immediately regardless of where I am on the page.

#### Acceptance Criteria

1. THE Sticky_Header SHALL display the Tracking_Number as a clickable tel: link at all times
2. WHILE a visitor scrolls the page, THE Sticky_Header SHALL remain fixed at the top of the viewport
3. THE Sticky_Header SHALL include the company logo and a prominent CTA button to call
4. THE Sticky_Header SHALL include navigation links to city pages via a dropdown or menu
5. WHEN the page is viewed on a mobile device, THE Floating_CTA SHALL display a fixed-position call button at the bottom of the screen

### Requirement 4: Hero Section with City-Specific Messaging

**User Story:** As a visitor, I want to immediately see that this emergency plumber serves my city with fast response times, so that I feel confident calling right away.

#### Acceptance Criteria

1. THE Hero_Section SHALL display an h1 headline communicating 24/7 emergency plumbing availability
2. WHEN displayed on a City_Page, THE Hero_Section SHALL include the city name in the h1 headline (e.g., "24/7 Emergency Plumber in Plano")
3. THE Hero_Section SHALL include a subheadline mentioning fast response time (e.g., "Our trucks arrive within 30 minutes")
4. THE Hero_Section SHALL contain a prominent CTA with the Tracking_Number to call
5. THE Hero_Section SHALL use Aceternity UI animation effects to create visual impact

### Requirement 5: Trust Badges and Social Proof

**User Story:** As a visitor, I want to see evidence of the company's credibility, so that I trust them with my emergency plumbing needs.

#### Acceptance Criteria

1. THE Website SHALL display Trust_Badge elements showing Google review ratings, BBB accreditation, and licensing information
2. THE Trust_Badge elements SHALL be positioned immediately below the Hero_Section

### Requirement 6: How It Works Process Section

**User Story:** As a visitor, I want to understand the service process at a glance, so that I know what to expect when I call.

#### Acceptance Criteria

1. THE Process_Section SHALL display a step-by-step visual guide with at least four steps: call us, on-site quickly, action plan, job done
2. THE Process_Section SHALL use numbered or icon-based step indicators for clarity
3. THE Process_Section SHALL include a CTA with the Tracking_Number after the steps

### Requirement 7: Emergency Services Description

**User Story:** As a visitor, I want to learn about the specific emergency plumbing services offered, so that I know the company can handle my problem.

#### Acceptance Criteria

1. THE Services_Section SHALL list emergency plumbing services including: burst pipe repair, drain cleaning, water heater repair, leak detection, sewer repair, toilet repair, gas line repair, and garbage disposal repair
2. THE Services_Section SHALL use card-based layouts with icons for each service type
3. THE Services_Section SHALL include a CTA with the Tracking_Number
4. WHEN displayed on a City_Page, THE Services_Section SHALL reference the city name in service descriptions (e.g., "Burst Pipe Repair in Plano")

### Requirement 8: Persuasive Content Sections

**User Story:** As a visitor, I want to be reassured and motivated to call, so that I take action on my plumbing emergency.

#### Acceptance Criteria

1. THE Website SHALL include a "Ready to take care of your plumbing problem?" section with persuasive copy and a CTA
2. THE Website SHALL include a "Need urgent plumbers near me?" section with location-relevant messaging and a CTA
3. WHEN displayed on a City_Page, THE persuasive sections SHALL reference the specific city name in the copy

### Requirement 9: Client Testimonials

**User Story:** As a visitor, I want to read reviews from past customers, so that I feel confident in the company's service quality.

#### Acceptance Criteria

1. THE Testimonials_Carousel SHALL display client reviews with reviewer name, star rating, and review text
2. THE Testimonials_Carousel SHALL support automatic rotation and manual navigation between reviews
3. THE Testimonials_Carousel SHALL display at least three testimonials

### Requirement 10: Contact / Quote Section

**User Story:** As a visitor, I want multiple ways to reach the company, so that I can contact them through my preferred method.

#### Acceptance Criteria

1. THE Contact_Section SHALL include a quote request form with fields for name, phone number, email, and message
2. WHEN a visitor submits the form with empty required fields, THE Contact_Section SHALL display validation error messages for each missing field
3. WHEN a visitor submits the form with a phone number or email in an incorrect format, THE Contact_Section SHALL display a format-specific validation error
4. THE Contact_Section SHALL display the Tracking_Number as a clickable tel: link
5. THE Contact_Section SHALL list the services offered by the company
6. THE Contact_Section SHALL prominently display 24/7 availability messaging

### Requirement 11: Footer with City Links and SEO Internal Linking

**User Story:** As a visitor, I want to find company information and navigate to other service areas, so that I can learn more or find my city.

#### Acceptance Criteria

1. THE Website SHALL include a footer with company branding, contact information, and the Tracking_Number as a clickable tel: link
2. THE footer SHALL include links to all 10 City_Pages for internal linking and SEO value
3. THE footer SHALL include links to key service types for additional keyword coverage

### Requirement 12: Visual Design and Responsiveness

**User Story:** As a visitor, I want the website to look professional and work well on any device, so that I have a good experience regardless of how I access it.

#### Acceptance Criteria

1. THE Website SHALL use a professional color scheme with blues and whites as primary colors and red or orange accents for urgency CTAs
2. THE Website SHALL be fully responsive with a mobile-first design approach
3. THE Website SHALL use Aceternity UI components for visual flair including animations, spotlight effects, and moving borders
4. THE Website SHALL use shadcn/ui components for form elements, buttons, and cards
5. THE Website SHALL use Tailwind CSS for layout and styling

### Requirement 13: Contact Form Validation

**User Story:** As a visitor, I want clear feedback when I fill out the quote form incorrectly, so that I can fix my input and successfully submit my request.

#### Acceptance Criteria

1. WHEN a visitor enters a phone number that does not match a valid phone format, THE Contact_Section SHALL display an inline error message indicating the expected format
2. WHEN a visitor enters an email that does not match a valid email format, THE Contact_Section SHALL display an inline error message indicating the expected format
3. WHEN all required fields are filled with valid data, THE Contact_Section SHALL enable the submit button
4. IF the form submission fails due to a network error, THEN THE Contact_Section SHALL display an error message and retain the visitor's input

### Requirement 14: Vercel Deployment

**User Story:** As a site owner, I want the website deployed on Vercel, so that it is fast, reliable, and easy to update.

#### Acceptance Criteria

1. THE Website SHALL be configured for deployment on Vercel with proper Next.js build settings
2. THE Website SHALL use Next.js static generation (SSG) for all pages to maximize performance and SEO
3. THE Website SHALL include proper caching headers for static assets
