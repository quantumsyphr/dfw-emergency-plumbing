"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function FloatingCallButton() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <Button
        asChild
        size="lg"
        className="bg-brand-accent hover:bg-brand-accent/90 text-white rounded-full px-6 shadow-lg"
      >
        <a href={COMPANY.phoneHref}>
          <Phone className="size-5" />
          Call Now
        </a>
      </Button>
    </div>
  );
}
