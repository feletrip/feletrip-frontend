"use client";

type SectionHeaderProps = {
  title: string;
  description?: string;
  highlight?: string;
};

export default function SectionHeader({
  title,
  description,
  highlight,
}: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      {highlight && (
        <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
          {highlight}
        </p>
      )}

      <h1 className="text-3xl lg:text-4xl xl:text-5xl mt-7 font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
        {title}
      </h1>

      {description && (
        <p className="text-muted-foreground max-w-3xl text-sm md:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
