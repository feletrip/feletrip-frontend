import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function VideoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="h-12 rounded-full px-5 font-medium hover:bg-secondary/40 hover:text-primary-foreground/90"
        >
          <Play className="size-4" />
          Watch Video
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl overflow-hidden border-border p-0 sm:max-w-4xl">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/8H6EKcnL6e0?si=1aLDXKQYyCZDkiBs" 
          title="Hotel Mania Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video border-0"
        />
      </DialogContent>
    </Dialog>
  );
}
