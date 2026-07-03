"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function RevealMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="km-reveal" data-visible={visible} ref={ref}>
      {children}
    </div>
  );
}
