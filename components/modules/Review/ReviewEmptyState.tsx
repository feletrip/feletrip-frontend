import { MessageSquareText } from "lucide-react";

import { Motion } from "@/components/Reuseable/common/Framermotion";

export function ReviewEmptyState() {
  return (
    <Motion animationType="scale">
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 p-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-accent">
          <MessageSquareText className="size-7 text-primary" />
        </div>

        <h3 className="mt-4 font-semibold">No reviews yet</h3>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          You have not submitted any reviews yet. Reviews you share about your
          stays will appear here.
        </p>
      </div>
    </Motion>
  );
}