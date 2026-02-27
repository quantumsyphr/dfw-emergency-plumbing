"use client";

import { COMPANY, SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
  Pipette, Waves, Flame, Search, Construction, Bath, Fuel, Trash2,
};

interface ServicesSectionProps {
  cityName?: string;
}

export function ServicesSection({ cityName }: ServicesSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 to-slate-900 py-20 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-bold text-white md:text-4xl"
        >
          Our Emergency Plumbing Services
          {cityName ? ` in ${cityName}` : ""}
        </motion.h2>
        <p className="mb-14 text-center text-slate-400 max-w-lg mx-auto">
          Expert solutions for every plumbing emergency, available around the clock.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:border-blue-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/5"
              >
                {Icon && (
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3">
                    <Icon className="size-6 text-blue-400" />
                  </div>
                )}
                <h3 className="text-base font-semibold text-white mb-2">
                  {service.title}
                  {cityName ? ` in ${cityName}` : ""}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>
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
