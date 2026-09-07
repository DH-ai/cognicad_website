import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button primitive mapped onto the JusCAD button system in globals.css
 * (.btn, .btn-primary, .btn-secondary, .btn-ghost).
 */
const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "btn-primary",
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-secondary",
      ghost: "btn-ghost",
      destructive: "btn-primary [--btn-primary-bg:var(--danger)] [--btn-primary-bg-hover:var(--danger)] [--btn-primary-fg:var(--white)]",
      link: "btn-ghost underline underline-offset-4",
    },
    size: {
      default: "",
      sm: "btn-sm",
      lg: "min-h-[56px] px-7 text-base",
      icon: "btn-icon",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
