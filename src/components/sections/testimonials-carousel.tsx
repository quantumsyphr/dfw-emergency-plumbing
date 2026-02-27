"use client";

import { Star } from "lucide-react";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { TESTIMONIALS } from "@/lib/constants";

const items = TESTIMONIALS.map((t) => ({
  quote: t.text,
  name: t.name,
  title: t.city,
  rating: t.rating,
}));

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-slate-300 dark:text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="relative py-16 bg-white dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-blue-100/50 dark:bg-blue-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
          What Our Customers Say
        </h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Real reviews from DFW homeowners</p>
        <InfiniteMovingCards
          items={items}
          speed="slow"
          renderItem={(item) => {
            const testimonial = item as typeof items[number];
            return (
              <blockquote>
                <StarRating rating={testimonial.rating ?? 5} />
                <p className="relative z-20 mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="relative z-20 mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.name}
                  </span>
                  {item.title && (
                    <span className="text-sm text-slate-500 dark:text-slate-400">{item.title}</span>
                  )}
                </footer>
              </blockquote>
            );
          }}
        />
      </div>
    </section>
  );
}
