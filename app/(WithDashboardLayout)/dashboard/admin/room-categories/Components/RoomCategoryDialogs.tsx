import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddRoomCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newCategoryName: string;
  newCategoryDescription: string;
  setNewCategoryName: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  onSubmit: () => void;
}

interface EditRoomCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory: any | null;
  setEditingCategory: (category: any | null) => void;
  onSubmit: () => void;
}

export function AddRoomCategoryDialog({
  isOpen,
  onOpenChange,
  newCategoryName,
  newCategoryDescription,
  setNewCategoryName,
  setNewCategoryDescription,
  onSubmit,
}: AddRoomCategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-linear-to-r from-primary to-primary/80 text-background hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 transition-all duration-300 px-8 py-6 text-base font-semibold"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-2 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-bold">Create New Room Category</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Define a new room category for your hotel properties
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Label htmlFor="category-name" className="text-base font-semibold text-foreground">
              Category Name
            </Label>
            <Input
              id="category-name"
              placeholder="e.g., Deluxe Suite"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="category-description" className="text-base font-semibold text-foreground">
              Description
            </Label>
            <Input
              id="category-description"
              placeholder="e.g., Luxurious rooms with premium amenities"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              className="h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
        </div>
        <DialogFooter className="gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={() => onOpenChange(false)} className="px-6 py-6 text-base">
            Cancel
          </Button>
          <Button size="lg" onClick={onSubmit} className="px-6 py-6 text-base bg-linear-to-r from-primary to-primary/80">
            Create Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditRoomCategoryDialog({
  isOpen,
  onOpenChange,
  editingCategory,
  setEditingCategory,
  onSubmit,
}: EditRoomCategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-2 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-bold">Edit Room Category</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Update room category information
          </DialogDescription>
        </DialogHeader>
        {editingCategory && (
          <div className="space-y-6 py-6">
            <div className="space-y-3">
              <Label htmlFor="edit-category-name" className="text-base font-semibold text-foreground">
                Category Name
              </Label>
              <Input
                id="edit-category-name"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="h-12 text-base border-2 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="edit-category-description" className="text-base font-semibold text-foreground">
                Description
              </Label>
              <Input
                id="edit-category-description"
                value={editingCategory.description || ""}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                className="h-12 text-base border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>
        )}
        <DialogFooter className="gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={() => onOpenChange(false)} className="px-6 py-6 text-base">
            Cancel
          </Button>
          <Button size="lg" onClick={onSubmit} className="px-6 py-6 text-base bg-linear-to-r from-primary to-primary/80">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
