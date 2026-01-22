import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "",
      destructive: "btn-destructive",
      outline: "btn-secondary",
      secondary: "btn-secondary",
      ghost: "btn-secondary opacity-60 hover:opacity-100",
      link: "!bg-transparent !border-0 !shadow-none text-current hover:underline",
    },
    size: {
      default: "",
      sm: "!text-xs !py-2 !px-3",
      lg: "!text-base !py-4 !px-6",
      icon: "!p-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
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
