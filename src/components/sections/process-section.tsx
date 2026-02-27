"use client";

import { COMPANY, PROCESS_STEPS } from "@/lib/constants";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { Button } from "@/components/ui/button";
import { Phone, Truck, ClipboardList, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Truck,
  ClipboardList,
  CheckCircle,
};

export function ProcessSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-brand-text">
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => {
            const Icon = iconMap[step.icon];
            return (
              <MovingBorder key={step.stepNumber} containerClassName="h-full">
                <div className="flex flex-col items-center gap-3 p-6 text-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                    {step.stepNumber}
                  </div>
                  {Icon && <Icon className="size-8 text-brand-primary" />}
                  <h3 className="text-lg font-semibold text-brand-text">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-text-muted">
                    {step.description}
                  </p>
                </div>
              </MovingBorder>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="destructive"
            size="lg"
            className="bg-brand-accent hover:bg-brand-accent/90"
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
