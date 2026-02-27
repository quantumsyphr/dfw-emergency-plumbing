"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef } from "react";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
  as?: React.ElementType;
}

export function MovingBorder({
  children,
  duration = 2000,
  borderRadius = "1rem",
  containerClassName,
  borderClassName,
  className,
  as: Component = "div",
}: MovingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Component
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-transparent p-[1px]",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius }}
      >
        <motion.div
          className={cn(
            "absolute h-20 w-20 rounded-full bg-[radial-gradient(#1E40AF_40%,transparent_60%)] opacity-80",
            borderClassName
          )}
          animate={{
            x: [0, 200, 200, 0, 0],
            y: [0, 0, 200, 200, 0],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: "-10px",
            left: "-10px",
          }}
        />
      </div>
      <div
        className={cn(
          "relative z-10 rounded-[calc(1rem-1px)] bg-white",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </Component>
  );
}
