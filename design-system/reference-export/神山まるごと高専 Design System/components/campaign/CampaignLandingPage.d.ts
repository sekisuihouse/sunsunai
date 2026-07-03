/** Campaign LP scaffold — separate theme from the mono core (tour: 水色/黄緑, event: 青/シアン/ピンク/黄). */
export interface CampaignLandingPageProps {
  scope?: 'campaign-tour' | 'campaign-event';
  title?: string;
  subtitle?: string;
  heroImage?: string;
  /** white logo for colored backgrounds: assets/logos/kamiyama_logo-white.svg */
  whiteLogoSrc?: string;
  ctaLabel?: string;
  sections?: Array<{ heading: string; body: string }>;
  children?: React.ReactNode;
}
