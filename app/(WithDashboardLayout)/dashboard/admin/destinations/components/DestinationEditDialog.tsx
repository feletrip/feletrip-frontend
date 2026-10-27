import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DestinationEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editName: string;
  setEditName: (value: string) => void;
  editDescription: string;
  setEditDescription: (value: string) => void;
  editIsActive: boolean;
  setEditIsActive: (value: boolean) => void;
  setEditCoverImg: (file: File | null) => void;
  onSubmit: () => void;
}

export function DestinationEditDialog({
  isOpen,
  onOpenChange,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  editIsActive,
  setEditIsActive,
  setEditCoverImg,
  onSubmit,
}: DestinationEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 border-2 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-bold">Edit Destination</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Update the destination details and cover image.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Label htmlFor="edit-name" className="text-base font-semibold text-foreground">
              Name
            </Label>
            <Input
              id="edit-name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="edit-description" className="text-base font-semibold text-foreground">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="min-h-30 border-2 focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="edit-isActive"
              type="checkbox"
              checked={editIsActive}
              onChange={(e) => setEditIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <Label htmlFor="edit-isActive" className="text-base font-medium text-foreground">
              Active
            </Label>
          </div>
          <div className="space-y-3">
            <Label htmlFor="edit-coverImg" className="text-base font-semibold text-foreground">
              Cover Image
            </Label>
            <Input
              id="edit-coverImg"
              type="file"
              onChange={(e) => setEditCoverImg(e.target.files?.[0] || null)}
              className="h-auto text-base border-2 focus:border-primary transition-colors"
            />
          </div>
        </div>
        <DialogFooter className="gap-4 pt-4">
          <Button variant="warning" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
