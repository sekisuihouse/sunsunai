import type { ReactNode } from "react";

export type NoticeTone = "info" | "success" | "error";

export type NoticeProps = {
  tone?: NoticeTone;
  children: ReactNode;
  className?: string;
};

export function Notice({ tone = "info", children, className = "" }: NoticeProps) {
  const classes = ["km-notice", tone !== "info" ? `km-notice--${tone}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={classes} role={tone === "error" ? "alert" : "status"}>
      {children}
    </p>
  );
}
