import Link from "next/link";
import { ArrowUpRight, HeadphonesIcon, MessageCircle } from "lucide-react";

const SupportCard = () => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Header */}
      <div className="border-b px-5 py-4 sm:px-6">
        <h3 className="text-sm font-semibold text-foreground sm:text-base">
          Need Assistance?
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Our support team is available 24/7 to help with your booking queries.
        </p>
      </div>

      {/* Support options */}
      <div className="space-y-3 p-5 sm:p-6">
        <Link
          href="/support"
          className="group flex items-center gap-3 rounded-xl border bg-background p-3 transition-colors hover:bg-muted/50"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <HeadphonesIcon className="size-4.5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              Talk to Support
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Get help from our support team
            </p>
          </div>

          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>

        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-xl border bg-background p-3 text-left transition-colors hover:bg-muted/50"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <MessageCircle className="size-4.5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Live Chat</p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Start an instant conversation
            </p>
          </div>

          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SupportCard;
