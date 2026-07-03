/** Site footer: logo, nav link groups, circular SNS buttons, copyright. */
export interface FooterProps {
  logoSrc?: string;
  size?: 'default' | 'mobile';
  navGroups?: Array<{ items: Array<{ label: string; href?: string }> }>;
}
