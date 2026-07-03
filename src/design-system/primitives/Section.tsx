import type { ReactNode } from "react";

export function Section({
  children,
  tight = false,
  className = "",
}: {
  children: ReactNode;
  tight?: boolean;
  className?: string;
}) {
  return (
    <section className={`${tight ? "km-section km-section--tight" : "km-section"} ${className}`}>
      {children}
    </section>
  );
}
