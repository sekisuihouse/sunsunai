/** Right-aligned breadcrumb, 12px bold, dash separators. */
export interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
  /** 'mobile' = 91px tall / 11px text */
  size?: 'default' | 'mobile';
}
