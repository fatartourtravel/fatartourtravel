"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AutoSlider({
  children,
  className,
  interval = 3800,
}: {
  children: ReactNode;
  className?: string;
  interval?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const inView = useRef(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(root);

    const mobile = window.matchMedia("(max-width: 900px)");

    const advance = () => {
      if (!mobile.matches || paused.current || !inView.current) return;
      const item = root.firstElementChild as HTMLElement | null;
      if (!item) return;
      const styles = getComputedStyle(root);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "18") || 18;
      const step = item.getBoundingClientRect().width + gap;
      const maxScroll = root.scrollWidth - root.clientWidth;
      if (maxScroll <= 8) return;
      const next = root.scrollLeft + step;
      root.scrollTo({
        left: next >= maxScroll - 8 ? 0 : next,
        behavior: "smooth",
      });
    };

    const timer = window.setInterval(advance, interval);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, [interval]);

  return (
    <div
      ref={ref}
      className={className ? `mobile-slider ${className}` : "mobile-slider"}
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      onTouchStart={() => {
        paused.current = true;
      }}
      onTouchEnd={() => {
        window.setTimeout(() => {
          paused.current = false;
        }, 2200);
      }}
    >
      {children}
    </div>
  );
}
