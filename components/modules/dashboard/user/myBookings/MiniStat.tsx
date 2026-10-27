type MiniStatProps = {
  value: number;
  label: string;
};

export function MiniStat({ value, label }: MiniStatProps) {
  return (
    <div className="min-w-20 rounded-2xl border border-border/60 bg-background/70 px-3 py-3 text-center shadow-sm backdrop-blur-sm sm:min-w-24 sm:px-4">
      <p className="text-xl font-bold text-primary sm:text-2xl">{value}</p>

      <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
        {label}
      </p>
    </div>
  );
}
