"use client";

import { COMPANY, SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Pipette,
  Waves,
  Flame,
  Search,
  Construction,
  Bath,
  Fuel,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Pipette,
  Waves,
  Flame,
  Search,
  Construction,
  Bath,
  Fuel,
  Trash2,
};

interface ServicesSectionProps {
  cityName?: string;
}

export function ServicesSection({ cityName }: ServicesSectionProps) {
  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-brand-text">
          Our Emergency Plumbing Services
          {cityName ? ` in ${cityName}` : ""}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.slug}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center gap-3 text-center">
                  {Icon && (
                    <Icon className="size-10 text-brand-primary" />
                  )}
                  <h3 className="text-lg font-semibold text-brand-text">
                    {service.title}
                    {cityName ? ` in ${cityName}` : ""}
                  </h3>
                  <p className="text-sm text-brand-text-muted">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
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
