/** Full-screen overlay menu; black circle scales open behind white nav links. */
export interface OverlayNavigationProps {
  open?: boolean;
  items?: Array<{ label: string; href?: string }>;
  onClose?: () => void;
}
