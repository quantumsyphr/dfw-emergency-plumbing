"use client";

import { COMPANY, PROCESS_STEPS } from "@/lib/constants";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { Button } from "@/components/ui/button";
import { Phone, Truck, ClipboardList, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Truck,
  ClipboardList,
  CheckCircle,
};

export function ProcessSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 py-20 px-4 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-bold text-white md:text-4xl"
        >
          How It Works
        </motion.h2>
        <p className="mb-14 text-center text-slate-400 max-w-lg mx-auto">
          From your first call to job done — here&apos;s what to expect.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <MovingBorder
                  containerClassName="h-full"
                  className="bg-slate-900/80 backdrop-blur-xl"
                  duration={4 + i}
                >
                  <div className="flex flex-col items-center gap-4 p-6 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
                      {step.stepNumber}
                    </div>
                    {Icon && <Icon className="size-7 text-blue-400" />}
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </MovingBorder>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25 border-0"
            asChild
          >
            <a href={COMPANY.phoneHref}>
              <Phone className="size-4" />
              Call Now: {COMPANY.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
