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

  if (variant === "problem") {
    return (
      <section>
        <LampEffect>
          <div className="flex flex-col items-center gap-6 text-center px-4">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {headline}
            </h2>
            <p className="max-w-2xl text-lg text-slate-300">
              {bodyText}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg px-8 py-6 shadow-lg shadow-red-500/25 border-0"
              asChild
            >
              <a href={COMPANY.phoneHref}>
                <Phone className="size-5" />
                Call Now: {COMPANY.phone}
              </a>
            </Button>
          </div>
        </LampEffect>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-950 dark:via-indigo-950 dark:to-blue-950 py-20 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-48 w-48 rounded-full bg-blue-400/20 dark:bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-indigo-400/20 dark:bg-indigo-500/20 blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          {headline}
        </h2>
        <p className="max-w-2xl text-lg text-blue-100 dark:text-slate-300">
          {bodyText}
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg px-8 py-6 shadow-lg shadow-red-500/25 border-0"
          asChild
        >
          <a href={COMPANY.phoneHref}>
            <Phone className="size-5" />
            Call Now: {COMPANY.phone}
          </a>
        </Button>
      </div>
    </section>
  );
}
