import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-background hover:bg-accent-strong hover:border-accent-strong",
  secondary:
    "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-surface-soft",
};

type BaseProps = {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly className?: string;
};

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    readonly href: string;
  };

type NativeButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function getButtonClasses(variant: ButtonVariant, className?: string): string {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = getButtonClasses(variant, className);

  if ("href" in props) {
    const { href, variant: _variant, className: _className, children: _children, ...anchorProps } =
      props;
    void _variant;
    void _className;
    void _children;

    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    type = "button",
    variant: _variant,
    className: _className,
    children: _children,
    ...buttonProps
  } = props;
  void _variant;
  void _className;
  void _children;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
