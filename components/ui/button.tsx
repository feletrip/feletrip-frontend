"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
   transition-all duration-300 cursor-pointer
   disabled:pointer-events-none disabled:opacity-50
   [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
   outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
   aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
   hover:scale-[1.03]

   /* 🔥 NAVBAR AUTO ADAPT */
   [&.navbar-adapt]:text-white
   group-data-[scrolled=true]:[&.navbar-adapt]:text-brand-primary
  `,
  {
    variants: {
      variant: {
        default: "bg-primary text-background! px-4!",

        outline: "border border-primary px-4! bg-transparent text-foreground hover:bg-primary hover:text-muted",

        secondary:
          "border border-primary px-4! bg-transparent hover:bg-primary hover:text-foreground hover:text-background",

        ghost: "hover:bg-accent hover:text-accent-foreground",

        link: "text-primary underline-offset-4 hover:underline",

        hoverSlide:
          "group relative inline-flex items-center justify-center overflow-hidden duration-500",

        outlineHoverSlide:
          "group relative inline-flex items-center justify-center overflow-hidden border border-primary duration-500",

        warning:
          "border border-destructive px-4! bg-transparent text-destructive hover:bg-destructive hover:text-white",
        warningFill: "bg-destructive text-white hover:scale-105 rounded-full text-sm px-4!",
      },

      size: {
        default:
          "h-9 px-2.5 py-2 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    afterText?: string;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  afterText,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  // 🔥 Animated Variants
  if (variant === "hoverSlide" || variant === "outlineHoverSlide") {
    const childText = typeof children === "string" ? children : "";

    const baseText =
      (afterText?.length ?? 0) > childText.length ? afterText : children;

    const isOutline = variant === "outlineHoverSlide";

    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(
          "relative inline-flex w-fit",
          buttonVariants({ variant, size }),
          className,
        )}
        {...props}
      >
        {/* 👇 width controller */}
        <span className="invisible px-4 py-2 font-semibold uppercase">
          {baseText}
        </span>

        {/* Top Layer */}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center font-semibold uppercase transition-all duration-500 group-hover:-translate-y-full",
            isOutline
              ? "text-current bg-transparent group-hover:scale-0 group-hover:rotate-120"
              : "bg-brand-primary text-white",
          )}
        >
          {children}
        </span>

        {/* Bottom Layer */}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center font-semibold uppercase transition-all duration-500 translate-y-full group-hover:translate-y-0 group-hover:scale-110",
            isOutline
              ? "bg-primary text-white "
              : "bg-primary text-primary-foreground",
          )}
        >
          {afterText ?? children}
        </span>
      </Comp>
    );
  }

  // ✅ Normal button
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
