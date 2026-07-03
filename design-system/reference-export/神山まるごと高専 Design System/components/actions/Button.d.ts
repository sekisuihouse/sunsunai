/**
 * Primary CTA button — pill, thick black border, color inversion + expanding circle on hover.
 */
export interface ButtonProps {
  /** 'white' (default, white bg / black text) or 'black' (black bg / white text) */
  variant?: 'white' | 'black';
  /** 'default' 312px / 'mobile' 184px */
  size?: 'default' | 'mobile';
  /** Renders an <a> when set, otherwise <button> */
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
