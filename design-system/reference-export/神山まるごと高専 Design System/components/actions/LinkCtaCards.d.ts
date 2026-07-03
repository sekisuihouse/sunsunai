/** 2-column CTA link cards: 4px black border, black title bar, description, underlined link text. */
export interface LinkCtaCardsProps {
  items: Array<{
    title: string;
    description: string;
    /** default: 詳しく見る */
    linkText?: string;
    href?: string;
    image?: string;
    onClick?: () => void;
  }>;
  /** default 2 */
  columns?: number;
}
