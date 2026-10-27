type TabCountProps = {
  count: number;
};

export function TabCount({ count }: TabCountProps) {
  return (
    <span className="flex size-5 items-center justify-center rounded-full border border-border/60 bg-muted/80 text-[10px] font-medium text-muted-foreground">
      {count}
    </span>
  );
}