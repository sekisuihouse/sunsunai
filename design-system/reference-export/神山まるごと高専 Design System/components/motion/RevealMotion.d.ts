/** Scroll-reveal wrapper: opacity 0 + translateY(15px) → visible over .8s ease-in-out. */
export interface RevealMotionProps {
  children?: React.ReactNode;
  /** ms stagger */
  delay?: number;
  /** wrapper tag, default 'div' */
  as?: string;
  style?: React.CSSProperties;
}
