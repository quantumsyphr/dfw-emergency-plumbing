"use client";

import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { LampEffect } from "@/components/aceternity/lamp-effect";
import { Phone } from "lucide-react";

interface PersuasiveCTAProps {
  headline: string;
  body: string;
  cityName?: string;
  variant: "problem" | "nearme";
}

export function PersuasiveCTA({
  headline,
  body,
  cityName,
  variant,
}: PersuasiveCTAProps) {
  const bodyText = cityName ? body.replace("{city}", cityName) : body;

  const content = (
    <div className="flex flex-col items-center gap-6 text-center px-4">
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        {headline}
      </h2>
      <p className="max-w-2xl text-lg text-slate-200">
        {bodyText}
      </p>
      <Button
        variant="destructive"
        size="lg"
        className="bg-brand-accent hover:bg-brand-accent/90 text-lg px-8 py-6"
        asChild
      >
        <a href={COMPANY.phoneHref}>
          <Phone className="size-5" />
          Call Now: {COMPANY.phone}
        </a>
      </Button>
    </div>
  );

  if (variant === "problem") {
    return (
      <section>
        <LampEffect>{content}</LampEffect>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-brand-primary to-blue-600 py-20">
      {content}
    </section>
  );
}
