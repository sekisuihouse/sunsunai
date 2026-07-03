import type { ReactNode } from "react";

export function Container({
  children,
  inner = false,
  className = "",
}: {
  children: ReactNode;
  inner?: boolean;
  className?: string;
}) {
  return (
    <div className={`${inner ? "km-container--inner" : "km-container"} ${className}`}>
      {children}
    </div>
  );
}
