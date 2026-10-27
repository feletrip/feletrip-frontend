import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  className?: string;
};

export default function AuthSectionTitle({
  title,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-px flex-1 bg-border" />
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
        {title}
      </h3>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
