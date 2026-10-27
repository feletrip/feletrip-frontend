import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  email: string;
  phone: string;
  password: string;
  roleId: string;
  hotelId: string;
  setUserName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setPassword: (value: string) => void;
  setRoleId: (value: string) => void;
  setHotelId: (value: string) => void;
  onSubmit: () => void;
  roles: any[];
  hotels: any[];
  loading?: boolean;
}

export function AddUserDialog({
  isOpen,
  onOpenChange,
  userName,
  email,
  phone,
  password,
  roleId,
  hotelId,
  setUserName,
  setEmail,
  setPhone,
  setPassword,
  setRoleId,
  setHotelId,
  onSubmit,
  roles,
  hotels,
  loading = false,
}: AddUserDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-2 border-border/50 shadow-2xl max-h-[90vh] overflow-y-auto bg-linear-to-br from-card to-card/50 backdrop-blur-sm">
        <DialogHeader className="space-y-3 pb-6">
          <DialogTitle className="text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Add New User
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Create a new user account with role assignment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="user-name" className="text-base font-semibold text-foreground">
              Name
            </Label>
            <Input
              id="user-name"
              placeholder="e.g., Mike Johnson"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="h-11 text-base border-2 border-border/50 focus:border-primary transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-email" className="text-base font-semibold text-foreground">
              Email
            </Label>
            <Input
              id="user-email"
              type="email"
              placeholder="e.g., mike@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 text-base border-2 border-border/50 focus:border-primary transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-phone" className="text-base font-semibold text-foreground">
              Phone
            </Label>
            <Input
              id="user-phone"
              placeholder="e.g., 01912345678"
              value={phone}
              maxLength={11}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setPhone(value);
              }}
              className="h-11 text-base border-2 border-border/50 focus:border-primary transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-password" className="text-base font-semibold text-foreground">
              Password
            </Label>
            <Input
              id="user-password"
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 text-base border-2 border-border/50 focus:border-primary transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-role" className="text-base font-semibold text-foreground">
              Role
            </Label>
            <Select value={roleId} onValueChange={setRoleId}>
              <SelectTrigger id="user-role" className="h-11 text-base border-2 border-border/50 focus:border-primary transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.length > 0 ? (
                  roles.map((role: any) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__no_roles__" disabled>
                    No roles available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-hotel" className="text-base font-semibold text-foreground flex items-center justify-between">
              <span>Hotel Assignment</span>
              <span className="text-xs font-normal text-muted-foreground">Optional</span>
            </Label>
            <Select value={hotelId || "ALL_HOTELS"} onValueChange={setHotelId}>
              <SelectTrigger id="user-hotel" className="h-11 text-base border-2 border-border/50 focus:border-primary transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select a hotel or All Hotels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL_HOTELS" className="font-medium text-primary">
                  🏢 All Hotels (সব হোটেল)
                </SelectItem>
                {hotels.map((hotel: any) => (
                  <SelectItem key={hotel.id} value={hotel.id}>
                    🏨 {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select &quot;All Hotels&quot; to give access to all properties, or pick a specific hotel.
            </p>
          </div>
        </div>
        <DialogFooter className="gap-4 pt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onOpenChange(false)}
            className="px-8 py-6 text-base border-2 hover:bg-accent transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={onSubmit}
            disabled={loading}
            className="px-8 py-6 text-base bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            {loading ? "Creating..." : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
