/** News rows: date, outlined category chip, bold title link. */
export interface NewsListProps {
  items: Array<{ date: string; category: string; title: string; href?: string }>;
}
