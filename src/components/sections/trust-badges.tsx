"use client";

import { Star, Award, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Star, title: "Google Reviews", value: "4.9★", description: "500+ verified reviews", color: "from-yellow-400/20 to-orange-400/20", lightColor: "from-yellow-50 to-orange-50" },
  { icon: Award, title: "BBB A+ Rating", value: "A+", description: "Accredited business", color: "from-blue-400/20 to-indigo-400/20", lightColor: "from-blue-50 to-indigo-50" },
  { icon: Shield, title: "Licensed & Insured", value: "Fully Licensed", description: "State-certified plumbers", color: "from-green-400/20 to-emerald-400/20", lightColor: "from-green-50 to-emerald-50" },
  { icon: Clock, title: "30-Min Response", value: "30 Min", description: "Average arrival time", color: "from-purple-400/20 to-violet-400/20", lightColor: "from-purple-50 to-violet-50" },
];

export function TrustBadges() {
  return (
    <section className="relative bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-900 py-12 px-4 -mt-1">
      <div className="mx-auto max-w-6xl grid grid-cols-2 gap-4 md:grid-cols-4">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className={`h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-br ${badge.lightColor} dark:${badge.color} dark:backdrop-blur-xl p-6 text-center transition-all hover:border-slate-300 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-blue-500/5`}>
              <badge.icon className="mx-auto size-8 text-blue-600 dark:text-blue-400 mb-3" />
              <p className="text-xl font-bold text-slate-900 dark:text-white">{badge.value}</p>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-200 mt-1">{badge.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
