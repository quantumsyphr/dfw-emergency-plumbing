"use client";

import { Spotlight } from "@/components/aceternity/spotlight";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { Phone } from "lucide-react";

interface HeroSectionProps {
  cityName?: string;
}

export function HeroSection({ cityName }: HeroSectionProps) {
  const location = cityName ?? "DFW";
  const headline = `24/7 Emergency Plumber in ${location}`;
  const subheadline = cityName
    ? `Fast response across ${cityName} — our trucks arrive within ${COMPANY.responseTime}`
    : `Fast response across the DFW metroplex — our trucks arrive within ${COMPANY.responseTime}`;

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-primary">
      <Spotlight className="z-10" fill="#60A5FA" />

      <div className="relative z-20 mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {headline}
        </h1>

        <p className="mt-6 text-lg text-blue-100 sm:text-xl">
          {subheadline}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="destructive"
            size="lg"
            className="text-base px-8 py-6"
            asChild
          >
            <a href={COMPANY.phoneHref}>
              <Phone className="size-5" />
              Call Now: {COMPANY.phone}
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 text-base px-8 py-6"
            asChild
          >
            <a href="#contact">Get a Free Quote</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
