"use client";

import Link from "next/link";

const navigation = [
  { href: "/", label: "概要" },
  { href: "/teacher", label: "教員" },
  { href: "/session", label: "授業開始" },
  { href: "/student", label: "学生参加" },
  { href: "/live", label: "ライブ" },
  { href: "/report", label: "AIレポート" },
  { href: "/extension", label: "拡張機能" },
];

export function LogoMark() {
  return (
    <Link aria-label="SunSun AI ホーム" className="km-logo" href="/">
      <span aria-hidden className="km-logo__mark">
        SS
      </span>
      <span className="km-logo__name">
        <strong>SunSun AI</strong>
        <span>授業改善支援</span>
      </span>
    </Link>
  );
}

export function HeaderNavigation({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="km-header">
      <div className="km-header__inner">
        <LogoMark />
        <nav aria-label="主要ナビゲーション" className="km-header__nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          aria-controls="km-overlay-navigation"
          aria-expanded="false"
          aria-label="メニューを開く"
          className="km-menu-button"
          onClick={onMenu}
          type="button"
        >
          <span />
        </button>
      </div>
    </header>
  );
}

export { navigation };
