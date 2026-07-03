import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

type IconComponent = ComponentType<{ size?: number; "aria-hidden"?: boolean }>;

type BaseProps = {
  children: ReactNode;
  icon?: IconComponent;
  variant?: "white" | "black";
  size?: "default" | "small";
  className?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
  type?: never;
  disabled?: boolean;
  onClick?: never;
};

type NativeButtonProps = BaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({
  children,
  icon: Icon,
  variant = "white",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "km-button",
    variant === "black" ? "km-button--black" : "",
    size === "small" ? "km-button--small" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {Icon ? <Icon aria-hidden size={size === "small" ? 18 : 22} /> : null}
      <span>{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link
        aria-disabled={props.disabled ? "true" : undefined}
        className={classes}
        href={props.disabled ? "#" : props.href}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type ?? "button"}
    >
      {content}
    </button>
  );
}
