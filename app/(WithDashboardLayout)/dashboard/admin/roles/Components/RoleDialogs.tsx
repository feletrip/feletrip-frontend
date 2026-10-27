import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import type { Role } from "../types/rolesData";

interface AddRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newRoleName: string;
  newRoleDescription: string;
  newRolePermissionIds: string[];
  setNewRoleName: (value: string) => void;
  setNewRoleDescription: (value: string) => void;
  setNewRolePermissionIds: (value: string[]) => void;
  onSubmit: () => void;
  allPermissions: any[];
}

interface EditRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingRole: Role | null;
  setEditingRole: (role: Role | null) => void;
  onSubmit: () => void;
  allPermissions: any[];
}

export function AddRoleDialog({
  isOpen,
  onOpenChange,
  newRoleName,
  newRoleDescription,
  newRolePermissionIds,
  setNewRoleName,
  setNewRoleDescription,
  setNewRolePermissionIds,
  onSubmit,
  allPermissions,
}: AddRoleDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const sortedPermissions = useMemo(() => {
    return [...allPermissions].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [allPermissions]);

  const filteredPermissions = useMemo(() => {
    if (!searchTerm.trim()) return sortedPermissions;
    const term = searchTerm.toLowerCase().trim();
    return sortedPermissions.filter((p) =>
      p.name?.toLowerCase().includes(term)
    );
  }, [sortedPermissions, searchTerm]);

  const handlePermissionToggle = (permissionId: string) => {
    const updatedPermissions = newRolePermissionIds.includes(permissionId)
      ? newRolePermissionIds.filter((id) => id !== permissionId)
      : [...newRolePermissionIds, permissionId];
    setNewRolePermissionIds(updatedPermissions);
  };

  const isAllSelected =
    allPermissions.length > 0 &&
    newRolePermissionIds.length === allPermissions.length;

  const handleToggleAll = () => {
    if (isAllSelected) {
      setNewRolePermissionIds([]);
    } else {
      setNewRolePermissionIds(allPermissions.map((p) => p.id));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-linear-to-r from-primary to-primary/80 text-background hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 transition-all duration-300 px-8 py-6 text-base font-semibold"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-2 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-bold">Create New Role</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Define a new role with specific permissions and access levels
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Label htmlFor="role-name" className="text-base font-semibold text-foreground">
              Role Name
            </Label>
            <Input
              id="role-name"
              placeholder="e.g., Marketing Manager"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="role-description" className="text-base font-semibold text-foreground">
              Description
            </Label>
            <Input
              id="role-description"
              placeholder="e.g., This role is for marketing team"
              value={newRoleDescription}
              onChange={(e) => setNewRoleDescription(e.target.value)}
              className="h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-foreground">
                Permissions ({newRolePermissionIds.length} of {allPermissions.length} selected)
              </Label>
              {allPermissions.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleAll}
                  className="h-7 text-xs text-primary hover:text-primary/80 font-medium px-2"
                >
                  {isAllSelected ? "Deselect All" : "Select All"}
                </Button>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 text-sm border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto border rounded-lg p-3">
              {filteredPermissions.length > 0 ? (
                filteredPermissions.map((permission: any) => (
                  <div key={permission.id} className="flex items-center space-x-2 py-0.5">
                    <Checkbox
                      id={`add-permission-${permission.id}`}
                      checked={newRolePermissionIds.includes(permission.id)}
                      onCheckedChange={() => handlePermissionToggle(permission.id)}
                    />
                    <Label
                      htmlFor={`add-permission-${permission.id}`}
                      className="text-sm cursor-pointer font-mono text-xs md:text-sm"
                    >
                      {permission.name}
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {searchTerm ? "No matching permissions found" : "No permissions available"}
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={() => onOpenChange(false)} className="px-6 py-6 text-base">
            Cancel
          </Button>
          <Button size="lg" onClick={onSubmit} className="px-6 py-6 text-base bg-linear-to-r from-primary to-primary/80">
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditRoleDialog({
  isOpen,
  onOpenChange,
  editingRole,
  setEditingRole,
  onSubmit,
  allPermissions,
}: EditRoleDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const sortedPermissions = useMemo(() => {
    return [...allPermissions].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [allPermissions]);

  const filteredPermissions = useMemo(() => {
    if (!searchTerm.trim()) return sortedPermissions;
    const term = searchTerm.toLowerCase().trim();
    return sortedPermissions.filter((p) =>
      p.name?.toLowerCase().includes(term)
    );
  }, [sortedPermissions, searchTerm]);

  const handlePermissionToggle = (permissionId: string) => {
    if (!editingRole) return;
    const currentPermissions = editingRole.permissionIds || [];
    const updatedPermissions = currentPermissions.includes(permissionId)
      ? currentPermissions.filter((id) => id !== permissionId)
      : [...currentPermissions, permissionId];
    setEditingRole({ ...editingRole, permissionIds: updatedPermissions });
  };

  const isAllSelected =
    editingRole &&
    allPermissions.length > 0 &&
    (editingRole.permissionIds || []).length === allPermissions.length;

  const handleToggleAll = () => {
    if (!editingRole) return;
    if (isAllSelected) {
      setEditingRole({ ...editingRole, permissionIds: [] });
    } else {
      setEditingRole({
        ...editingRole,
        permissionIds: allPermissions.map((p) => p.id),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-2 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-bold">Edit Role</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Update role information and permissions
          </DialogDescription>
        </DialogHeader>
        {editingRole && (
          <div className="space-y-6 py-6">
            <div className="space-y-3">
              <Label htmlFor="edit-role-name" className="text-base font-semibold text-foreground">
                Role Name
              </Label>
              <Input
                id="edit-role-name"
                value={editingRole.name}
                onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                className="h-12 text-base border-2 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="edit-role-description" className="text-base font-semibold text-foreground">
                Description
              </Label>
              <Input
                id="edit-role-description"
                value={editingRole.description || ""}
                onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                className="h-12 text-base border-2 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="edit-role-panel" className="text-base font-semibold text-foreground">
                Panel
              </Label>
              <Select 
                value={editingRole.panel || ""} 
                onValueChange={(value) => setEditingRole({ ...editingRole, panel: value })}
              >
                <SelectTrigger id="edit-role-panel" className="h-12 text-base border-2 focus:border-primary transition-colors">
                  <SelectValue placeholder="Select a panel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="HOST">HOST</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-foreground">
                  Permissions ({(editingRole.permissionIds || []).length} of {allPermissions.length} selected)
                </Label>
                {allPermissions.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleAll}
                    className="h-7 text-xs text-primary hover:text-primary/80 font-medium px-2"
                  >
                    {isAllSelected ? "Deselect All" : "Select All"}
                  </Button>
                )}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-10 text-sm border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto border rounded-lg p-3">
                {filteredPermissions.length > 0 ? (
                  filteredPermissions.map((permission: any) => (
                    <div key={permission.id} className="flex items-center space-x-2 py-0.5">
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={editingRole.permissionIds?.includes(permission.id) || false}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                      />
                      <Label
                        htmlFor={`permission-${permission.id}`}
                        className="text-sm cursor-pointer font-mono text-xs md:text-sm"
                      >
                        {permission.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {searchTerm ? "No matching permissions found" : "No permissions available"}
                  </p>
                )}
              </div>
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
