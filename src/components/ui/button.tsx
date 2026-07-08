import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] hover:-translate-y-[2px] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-accent-blue text-white hover:bg-blue-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)]",
        secondary:
          "panel text-text-primary hover:border-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
        link: "text-text-tertiary underline-offset-4 hover:text-text-primary hover:underline p-0 h-auto active:scale-100 hover:translate-y-0",
        outline:
          "border border-border-subtle bg-transparent text-text-primary hover:border-accent-blue/60 hover:bg-accent-blue/5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.12)]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
