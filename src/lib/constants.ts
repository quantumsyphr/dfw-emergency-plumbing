import type { Service, Testimonial, ProcessStep } from "@/types";

export const COMPANY = {
  name: "AquaTorque Plumbing",
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  tagline: "24/7 Emergency Plumbing Services",
  responseTime: "30 minutes",
  domain: "https://aquatorqueplumbing.com",
} as const;

export const SERVICES: Service[] = [
  { icon: "Pipette", title: "Burst Pipe Repair", description: "Fast response for burst and broken pipes to minimize water damage.", slug: "burst-pipe-repair" },
  { icon: "Waves", title: "Drain Cleaning", description: "Professional drain cleaning to clear stubborn clogs and blockages.", slug: "drain-cleaning" },
  { icon: "Flame", title: "Water Heater Repair", description: "Expert water heater diagnosis and repair — tank and tankless.", slug: "water-heater-repair" },
  { icon: "Search", title: "Leak Detection", description: "Advanced leak detection to find hidden leaks before they cause damage.", slug: "leak-detection" },
  { icon: "Construction", title: "Sewer Repair", description: "Sewer line repair and replacement using modern trenchless methods.", slug: "sewer-repair" },
  { icon: "Bath", title: "Toilet Repair", description: "Toilet repair and replacement for clogs, leaks, and running toilets.", slug: "toilet-repair" },
  { icon: "Fuel", title: "Gas Line Repair", description: "Licensed gas line repair for leaks and installations — safety first.", slug: "gas-line-repair" },
  { icon: "Trash2", title: "Garbage Disposal Repair", description: "Garbage disposal repair and replacement to keep your kitchen running.", slug: "garbage-disposal-repair" },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "John M.", rating: 5, text: "Called at 2 AM for a burst pipe. They were at my door in 25 minutes. Incredible service.", city: "Dallas" },
  { name: "Sarah K.", rating: 5, text: "Professional, fast, and fair pricing. Fixed our water heater the same day.", city: "Plano" },
  { name: "Mike R.", rating: 5, text: "Best emergency plumber in Fort Worth. They saved us from a major flood.", city: "Fort Worth" },
  { name: "Lisa T.", rating: 5, text: "Arrived quickly and fixed our clogged drain. Very reasonable price.", city: "Arlington" },
  { name: "David W.", rating: 5, text: "Excellent leak detection service. Found the problem fast and fixed it right.", city: "Frisco" },
  { name: "Jennifer P.", rating: 5, text: "24/7 availability is a lifesaver. Called on a Sunday and they came right out.", city: "Irving" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { stepNumber: 1, icon: "Phone", title: "Call Us", description: "Call our 24/7 emergency line. We answer immediately." },
  { stepNumber: 2, icon: "Truck", title: "We Arrive Fast", description: "A licensed plumber arrives at your door within 30 minutes." },
  { stepNumber: 3, icon: "ClipboardList", title: "Action Plan", description: "We diagnose the issue and give you an upfront price — no surprises." },
  { stepNumber: 4, icon: "CheckCircle", title: "Job Done", description: "We fix the problem right the first time. Guaranteed." },
];
