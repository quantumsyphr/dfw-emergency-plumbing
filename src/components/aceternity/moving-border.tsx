"use client";

import { cn } from "@/lib/utils";
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
  duration = 3,
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
        "group relative overflow-hidden rounded-2xl p-[1px]",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <div
          className={cn(
            "absolute inset-[-100%] animate-spin-slow",
            borderClassName
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, #3b82f6 10%, #06b6d4 20%, #8b5cf6 30%, transparent 40%)`,
            animationDuration: `${duration}s`,
          }}
        />
      </div>

      {/* Inner content with glass effect */}
      <div
        className={cn(
          "relative z-10 bg-white/80 backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </Component>
  );
}
