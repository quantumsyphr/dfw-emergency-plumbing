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
              : "fill-none text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
          What Our Customers Say
        </h2>
        <InfiniteMovingCards
          items={items}
          speed="slow"
          renderItem={(item) => {
            const testimonial = item as typeof items[number];
            return (
              <blockquote>
                <StarRating rating={testimonial.rating ?? 5} />
                <p className="relative z-20 mt-3 text-sm leading-relaxed text-slate-600">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="relative z-20 mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900">
                    {item.name}
                  </span>
                  {item.title && (
                    <span className="text-sm text-slate-500">{item.title}</span>
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
