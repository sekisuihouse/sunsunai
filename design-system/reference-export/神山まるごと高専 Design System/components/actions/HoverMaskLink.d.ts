/** Image link with circular-mask hover reveal (desktop hover_mask pattern). */
export interface HoverMaskLinkProps {
  src: string;
  alt?: string;
  href?: string;
  /** CSS width, default '100%' */
  width?: string;
  /** CSS aspect-ratio, default '3 / 2' */
  aspectRatio?: string;
  /** Optional bold caption under the image */
  label?: string;
  onClick?: () => void;
}
