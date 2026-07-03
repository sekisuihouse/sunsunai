"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { LogoMark, navigation } from "./HeaderNavigation";

export function OverlayNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      aria-hidden={!open}
      className="km-overlay"
      data-open={open}
      id="km-overlay-navigation"
    >
      <div aria-hidden className="km-overlay__close-bg" />
      <div className="km-overlay__content">
        <div className="km-overlay__top">
          <LogoMark />
          <button className="km-overlay__close" onClick={onClose} type="button">
            <X aria-hidden size={18} /> 閉じる
          </button>
        </div>
        <nav aria-label="オーバーレイナビゲーション" className="km-overlay__links">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
