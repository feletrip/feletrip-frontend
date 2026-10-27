import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DestinationCreateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  createName: string;
  setCreateName: (value: string) => void;
  createDescription: string;
  setCreateDescription: (value: string) => void;
  createIsActive: boolean;
  setCreateIsActive: (value: boolean) => void;
  setCreateCoverImg: (file: File | null) => void;
  onSubmit: () => void;
  isCreating: boolean;
}

export function DestinationCreateDialog({
  isOpen,
  onOpenChange,
  createName,
  setCreateName,
  createDescription,
  setCreateDescription,
  createIsActive,
  setCreateIsActive,
  setCreateCoverImg,
  onSubmit,
  isCreating,
}: DestinationCreateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 border-2 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-bold">Create Destination</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Add a new destination with name, description, status, and cover image.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Label htmlFor="create-name" className="text-base font-semibold text-foreground">
              Name
            </Label>
            <Input
              id="create-name"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              className="h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="create-description" className="text-base font-semibold text-foreground">
              Description
            </Label>
            <Textarea
              id="create-description"
              value={createDescription}
              onChange={(e) => setCreateDescription(e.target.value)}
              className="min-h-30 border-2 focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="create-isActive"
              type="checkbox"
              checked={createIsActive}
              onChange={(e) => setCreateIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <Label htmlFor="create-isActive" className="text-base font-medium text-foreground">
              Active
            </Label>
          </div>
          <div className="space-y-3">
            <Label htmlFor="create-coverImg" className="text-base font-semibold text-foreground">
              Cover Image
            </Label>
            <Input
              id="create-coverImg"
              type="file"
              onChange={(e) => setCreateCoverImg(e.target.files?.[0] || null)}
              className="h-auto text-base border-2 focus:border-primary transition-colors"
            />
          </div>
        </div>
        <DialogFooter className="gap-4 pt-4">
          <Button variant="warning" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Destination"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
