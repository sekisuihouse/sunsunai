/** Common page frame: left-rail header ≥1204px, top header + overlay menu below; white canvas; footer. */
export interface GlobalShellProps {
  children?: React.ReactNode;
  logoSrc?: string;
  whiteLogoSrc?: string;
  activeIndex?: number;
  navItems?: Array<{ label: string; href?: string }>;
  /** Override the responsive switch (useful in fixed-width previews) */
  forceVariant?: 'desktop-left-rail' | 'tablet-mobile-top';
}
