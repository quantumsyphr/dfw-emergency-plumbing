"use client";

import { Spotlight } from "@/components/aceternity/spotlight";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <Spotlight className="z-10" fill="rgba(96, 165, 250, 0.15)" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-20 mx-auto max-w-4xl px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-sm text-blue-200">Available Now — 24/7 Emergency Service</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              {headline}
            </span>
          </h1>

          <p className="mt-6 text-lg text-blue-200/80 sm:text-xl max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-base px-8 py-6 shadow-lg shadow-red-500/25 border-0"
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
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm text-base px-8 py-6"
            asChild
          >
            <a href="#contact">Get a Free Quote</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
