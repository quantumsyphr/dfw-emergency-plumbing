"use client";

import { cn } from "@/lib/utils";

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
  return (
    <Component
      className={cn(
        "group relative rounded-2xl p-[1px]",
        containerClassName
      )}
      style={{
        borderRadius,
        background: "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(6,182,212,0.3), rgba(139,92,246,0.5), rgba(59,130,246,0.5))",
        backgroundSize: "300% 300%",
        animation: `gradient-shift ${duration}s ease infinite`,
      }}
    >
      {/* Inner content with glass effect */}
      <div
        className={cn(
          "relative z-10 bg-slate-900/90 backdrop-blur-xl h-full",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </Component>
  );
}
