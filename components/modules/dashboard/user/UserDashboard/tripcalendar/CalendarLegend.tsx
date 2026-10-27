interface CalendarLegendProps {
  label: string;
  dotClassName: string;
  pulse?: boolean;
}

export function CalendarLegend({
  label,
  dotClassName,
  pulse = false,
}: CalendarLegendProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex size-2.5">
        {pulse && (
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${dotClassName}`}
          />
        )}

        <span
          className={`relative inline-flex size-2.5 rounded-full ${dotClassName}`}
        />
      </span>

      <span className="text-muted-foreground">
        {label}
      </span>
    </div>
  );
}