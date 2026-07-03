"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Footer } from "./Footer";
import { HeaderNavigation } from "./HeaderNavigation";
import { OverlayNavigation } from "./OverlayNavigation";

export function GlobalShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="km-shell">
      <HeaderNavigation onMenu={() => setOpen(true)} />
      <OverlayNavigation onClose={() => setOpen(false)} open={open} />
      <main className="km-shell__main">{children}</main>
      <Footer />
    </div>
  );
}
