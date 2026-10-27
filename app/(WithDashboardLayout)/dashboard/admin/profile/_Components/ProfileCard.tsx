import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Camera, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface ProfileCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string | null | undefined;
  name?: string | null | undefined;
  role?: string | null | undefined;
  isEditing?: boolean;
  onAvatarChange?: (file: File) => void;
}

export const ProfileCard = ({
  firstName,
  lastName,
  email,
  phone,
  location,
  avatar,
  name,
  role,
  isEditing = false,
  onAvatarChange,
}: ProfileCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <Card className="border-border/50 bg-card shadow-sm p-3">
      <CardHeader className="text-center">
        <div className="relative mx-auto mb-4">
          <Avatar className="h-32 w-32 ring-4 ring-primary/20">
            <AvatarImage src={(avatar ?? undefined) as string | undefined} alt={name ?? "User"} />
            <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                size="icon"
                onClick={handleCameraClick}
                className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <CardTitle className="text-xl">
          {firstName} {lastName}
        </CardTitle>
        <CardDescription className="text-primary font-medium">
          {role || "Admin"}
        </CardDescription>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{location}</span>
        </div>
      </CardContent>
    </Card>
  );
};
