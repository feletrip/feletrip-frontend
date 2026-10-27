import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";

interface DestinationsHeaderProps {
  onCreate: () => void;
  onRefresh: () => void;
}

export function DestinationsHeader({ onCreate, onRefresh }: DestinationsHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 p-8 border border-primary/20">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Destination Management
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Manage destination locations, view status, and toggle active state.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={onCreate} className="gap-2">
            <Plus className="h-4 w-4" /> Create Destination
          </Button>
          <Button onClick={onRefresh} variant="secondary" className="gap-2">
            <RefreshCcw className="h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
