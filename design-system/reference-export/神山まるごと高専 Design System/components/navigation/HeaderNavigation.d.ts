/** Site header: left rail (≥1204px) or top fixed bar with menu button. */
export interface HeaderNavigationProps {
  variant?: 'desktop-left-rail' | 'tablet-mobile-top';
  items?: Array<{ label: string; href?: string; onClick?: () => void }>;
  activeIndex?: number;
  /** e.g. 'assets/logos/logo.svg' */
  logoSrc?: string;
  onMenuClick?: () => void;
  menuOpen?: boolean;
}
