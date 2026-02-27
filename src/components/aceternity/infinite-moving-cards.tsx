"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface InfiniteMovingCardsProps {
  items: {
    quote: string;
    name: string;
    title?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  renderItem?: (item: { quote: string; name: string; title?: string }) => React.ReactNode;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  renderItem,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      const container = containerRef.current;
      if (direction === "left") {
        container.style.setProperty("--animation-direction", "forwards");
      } else {
        container.style.setProperty("--animation-direction", "reverse");
      }

      const speedMap = { fast: "20s", normal: "40s", slow: "80s" };
      container.style.setProperty("--animation-duration", speedMap[speed]);

      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-6 md:w-[450px]"
            key={`${item.name}-${idx}`}
          >
            {renderItem ? (
              renderItem(item)
            ) : (
              <blockquote>
                <p className="relative z-20 text-sm leading-relaxed text-slate-300">
                  {item.quote}
                </p>
                <footer className="relative z-20 mt-4 flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {item.name}
                  </span>
                  {item.title && (
                    <span className="text-sm text-slate-400">
                      — {item.title}
                    </span>
                  )}
                </footer>
              </blockquote>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
