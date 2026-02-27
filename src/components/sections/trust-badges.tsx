"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Star,
    title: "Google Reviews",
    value: "4.9★",
    description: "500+ verified reviews",
  },
  {
    icon: Award,
    title: "BBB A+ Rating",
    value: "A+",
    description: "Accredited business",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    value: "Fully Licensed",
    description: "State-certified plumbers",
  },
  {
    icon: Clock,
    title: "30-Min Response",
    value: "30 Min",
    description: "Average arrival time",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-brand-surface py-12 px-4">
      <div className="mx-auto max-w-6xl grid grid-cols-2 gap-4 md:grid-cols-4">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-full text-center items-center border-brand-border">
              <CardContent className="flex flex-col items-center gap-2 pt-2">
                <badge.icon className="size-8 text-brand-primary" />
                <p className="text-lg font-bold text-brand-text">{badge.value}</p>
                <p className="text-sm font-medium text-brand-text">{badge.title}</p>
                <p className="text-xs text-brand-text-muted">{badge.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
