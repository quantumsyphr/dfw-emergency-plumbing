"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useEffect } from "react";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${fill}15, transparent 80%)`;

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 transition-opacity duration-300",
        className
      )}
      style={{ background }}
    />
  );
}
