"use client";
import { Button } from "@/components/ui/button";

interface CounterProps {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min?: number;
}

export const Counter = ({ label, value, setValue, min = 0 }: CounterProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          disabled={value <= min}
          onClick={() => setValue(value - 1)}
        >
          −
        </Button>
        <span className="w-4 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setValue(value + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
