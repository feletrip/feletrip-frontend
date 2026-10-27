"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  isSubmitting?: boolean;
};

export default function InputField({
  label,
  type,
  error,
  isSubmitting,
  className,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      {/* Input wrapper */}
      <div className="relative">
        {/* Label */}
        <Label className="absolute left-3 -top-2.5 text-primary bg-background px-1 py-0.5 rounded-xs z-50 text-xs">
          {label}
        </Label>

        {/* Input with animated border */}
        <motion.div
          animate={
            error
              ? { scale: 1.01, x: [0, -2, 2, -2, 2, 0] }
              : { scale: 1, x: 0 }
          }
          transition={{ duration: 0.25 }}
        >
          <Input
            type={isPassword && showPassword ? "text" : type}
            disabled={isSubmitting || false}
            className={cn(
              "transition-colors duration-300 placeholder:text-foreground/20",
              error && "border-destructive focus-visible:ring-destructive",
              isPassword ? "pr-10" : "",
              className,
            )}
            {...props}
          />
        </motion.div>

        {/* Eye icon */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
          >
            <motion.div
              initial={false}
              animate={{ rotate: showPassword ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.div>
          </button>
        )}
      </div>

      {/* Animated error */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-destructive overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
