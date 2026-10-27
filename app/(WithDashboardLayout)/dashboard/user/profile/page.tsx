"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Edit2,
  Save,
  X,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/Reuseable/FormField";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  getAdminProfileAction,
  updateAdminProfileAction,
} from "@/Server/Admin/profile.action";
import { useAuth } from "@/providers/authProvider";
import { toast } from "@/components/Reuseable/common/toast";

interface UserProfile {
  address: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

const UserProfilePage = () => {
  const { data: session } = useSession();
  const userData = session?.user;
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [apiData, setApiData] = useState<UserProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const response = await getAdminProfileAction();

        if (response?.success && response.data) {
          const profile = response.data;
          setApiData(profile);

          setFormData({
            name: profile?.name || userData?.name || "Admin User",
            email: profile?.email || userData?.email || "",
            phone: profile?.phone || "No phone number added",
            address: profile?.address || "",
          });
          setAvatarUrl(profile?.avatar || userData?.avatar || null);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [userData]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSave = async () => {
    // Fire loading toast right when the action begins
    toast.loading(
      "Updating profile...",
      "Please wait while we save your changes.",
    );

    try {
      setIsSaving(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address.trim());

      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      const response = await updateAdminProfileAction(formDataToSend);

      if (response?.success) {
        setIsEditing(false);
        setAvatarFile(null);

        if (response.data) {
          setApiData(response.data);

          setAvatarUrl(response.data.avatar || null);
          setFormData((prev) => ({
            ...prev,
            name: response.data.name ?? prev.name,
            phone: response.data.phone ?? prev.phone,
            address: response.data.address ?? prev.address,
          }));
        }

        if (setUser && user) {
          setUser({
            ...user,
            name: formData.name.trim(),
            phone: formData.phone,
            avatar: response.data?.avatar ?? undefined,
          });
        }

        // Success toast (automatically closes the active loading toast)
        toast.success("Succeeded!", "User profile updated successfully.");
      } else {
        // Error toast (automatically closes the active loading toast)
        toast.error(
          "Failed!",
          response?.message || "Profile could not be updated.",
        );
      }
    } catch (error) {
      console.error("Save error:", error);
      // Error toast for unexpected exceptions
      toast.error(
        "There was a mistake!",
        "There was a problem, please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
    if (apiData) {
      setFormData({
        name: apiData?.name || userData?.name || "Admin User",
        email: apiData?.email || userData?.email || "",
        phone: apiData?.phone || "No phone added",
        address: apiData?.address || "",
      });
      setAvatarUrl(apiData?.avatar || userData?.avatar || null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Header Skeleton */}
          <div className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 md:p-8">
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-secondary/50 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-8 w-48 bg-secondary/50 rounded animate-pulse" />
                    <div className="h-4 w-64 bg-secondary/50 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="h-10 w-32 bg-secondary/50 rounded-xl animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Profile Card Skeleton */}
            <div className="lg:col-span-1">
              <div className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-40 bg-secondary/50 animate-pulse" />
                <div className="relative -mt-20 pb-6 p-6">
                  <div className="relative mx-auto w-fit">
                    <div className="h-32 w-32 rounded-full bg-secondary/50 animate-pulse" />
                  </div>
                  <div className="text-center mt-4 space-y-3">
                    <div className="h-8 w-48 mx-auto bg-secondary/50 rounded animate-pulse" />
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-6 w-20 bg-secondary/50 rounded-full animate-pulse" />
                      <div className="h-6 w-20 bg-secondary/50 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="my-6 h-px bg-secondary/50" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-secondary/50 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 bg-secondary/50 rounded animate-pulse" />
                        <div className="h-4 w-48 bg-secondary/50 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-secondary/50 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 bg-secondary/50 rounded animate-pulse" />
                        <div className="h-4 w-40 bg-secondary/50 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information Card Skeleton */}
            <div className="lg:col-span-2">
              <div className="border-border/50 p-4 bg-card/80 backdrop-blur-sm shadow-xl h-full flex flex-col">
                <div className="pb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-secondary/50 animate-pulse" />
                        <div className="h-6 w-48 bg-secondary/50 rounded animate-pulse" />
                      </div>
                      <div className="h-4 w-64 bg-secondary/50 rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-20 bg-secondary/50 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-secondary/50 rounded animate-pulse" />
                    <div className="h-11 w-full bg-secondary/50 rounded-xl animate-pulse" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="h-4 w-28 bg-secondary/50 rounded animate-pulse" />
                      <div className="h-11 w-full bg-secondary/50 rounded-xl animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-28 bg-secondary/50 rounded animate-pulse" />
                      <div className="h-11 w-full bg-secondary/50 rounded-xl animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-secondary/50 rounded animate-pulse" />
                    <div className="h-11 w-full bg-secondary/50 rounded-xl animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 md:p-8">
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Profile Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your account information and preferences
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">
                  Profile Complete
                </span>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    disabled={isSaving}
                    size="default"
                    variant="warning"
                  >
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden h-full flex flex-col">
              <div className="relative h-60 w-full overflow-hidden bg-secondary/10">
                <Image
                  src="https://i.ibb.co.com/YBVJZhsh/image.png"
                  alt="Profile Banner"
                  fill
                  priority
                  className="object-contain"
                />

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20" />

                <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent" />
              </div>

              <CardContent className="relative -mt-20 pb-6">
                <div className="relative mx-auto w-fit">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
                    <Image
                      src={
                        avatarUrl || `https://i.ibb.co.com/j9P7WfQG/image.png`
                      }
                      alt="Avatar"
                      width={128}
                      height={128}
                      className="relative h-32 w-32 rounded-full object-cover border-4 border-card shadow-2xl"
                      unoptimized={!!avatarUrl?.startsWith("blob:")}
                    />
                    {isEditing && (
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-2 right-2 h-11 w-11 bg-primary rounded-full flex items-center justify-center cursor-pointer border-4 border-card text-primary-foreground hover:bg-primary transition-all shadow-lg hover:scale-110"
                      >
                        <Camera className="h-5 w-5" />
                        <input
                          id="avatar-upload"
                          type="file"
                          className="hidden"
                          onChange={handleAvatarChange}
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {formData.name}
                    </h2>
                    <span
                      className="relative flex size-2.5"
                      title="Active"
                      aria-label="Active status"
                    >
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-green-400" />
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-xl"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {userData?.role || "Owner"}
                    </Badge>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1 rounded-xl">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="group flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-default">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Email Address
                      </p>
                      <p className="font-medium truncate">{formData.email}</p>
                    </div>
                  </div>
                  <div className="group flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-default">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Phone Number
                      </p>
                      <p className="font-medium truncate">{formData.phone}</p>
                    </div>
                  </div>
                  <div className="group flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-default">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium truncate">
                        {formData.address || "No address added"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 p-4 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Badge
                      variant="outline"
                      className="bg-green-500/5 text-green-500 border-green-500/20 rounded-xl"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                {/* Full Name Input Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Full Name
                    {!isEditing && (
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    )}
                  </label>
                  <FormField
                    id="name"
                    label=""
                    value={formData.name}
                    onChange={(value) =>
                      setFormData({ ...formData, name: value })
                    }
                    disabled={!isEditing}
                    className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Email Address
                      <Lock className="h-3 w-3 text-muted-foreground opacity-70" />
                    </label>
                    <div className="relative">
                      <FormField
                        id="email"
                        label=""
                        type="email"
                        value={formData.email}
                        onChange={() => {}}
                        disabled={true}
                        className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl focus-visible:ring-0 disabled:opacity-70 disabled:text-muted-foreground/80 disabled:bg-secondary/20 pr-10 cursor-not-allowed transition-all"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock className="h-4 w-4 opacity-50" />
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Phone Number
                      {!isEditing && (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      )}
                    </label>
                    <FormField
                      id="phone"
                      label=""
                      value={formData.phone}
                      onChange={(value) =>
                        setFormData({ ...formData, phone: value })
                      }
                      disabled={!isEditing}
                      className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Address
                    {!isEditing && formData.address && (
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    )}
                  </label>
                  <FormField
                    id="address"
                    label=""
                    value={formData.address}
                    onChange={(value) =>
                      setFormData({ ...formData, address: value })
                    }
                    disabled={!isEditing}
                    placeholder="No address added"
                    className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 transition-all"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
