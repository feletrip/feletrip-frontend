"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Edit2,
  Save,
  X,
  Lock,
  Mail,
  Phone,
  Shield,
  Camera,
  CheckCircle2,
  Building2,
  FileText,
  IdCard,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  getVendorProfileAction,
  updateVendorProfileAction,
} from "@/Server/Vendor/profile.action";
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
import { useAuth } from "@/providers/authProvider";
import { updateAdminProfileAction } from "@/Server/Admin/profile.action";

interface HostProfile {
  id?: string;
  userId?: string;
  businessName?: string;
  tradeLicenseNo?: string;
  nationalIdNo?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
    coverPhoto?: string | null;
    status: string;
  };
}

const HostSettingsPage = () => {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [apiData, setApiData] = useState<HostProfile | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    tradeLicenseNo: "",
    nationalIdNo: "",
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getVendorProfileAction();

      if (response?.success && response.data) {
        const profile: HostProfile = response.data;
        setApiData(profile);

        const userData = profile?.user;

        setFormData({
          name: userData?.name || user?.name || "Host User",
          email: userData?.email || user?.email || "",
          phone: userData?.phone || "",
          businessName: profile?.businessName || "",
          tradeLicenseNo: profile?.tradeLicenseNo || "Not provided",
          nationalIdNo: profile?.nationalIdNo || "Not provided",
        });

        setAvatarUrl(userData?.avatar || user?.avatar || null);
        setAvatarFile(null);
        setCoverPhotoUrl(userData?.coverPhoto || user?.coverPhoto || null);
        setCoverPhotoFile(null);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isEditing) setIsEditing(true);
      setCoverPhotoFile(file);
      const url = URL.createObjectURL(file);
      setCoverPhotoUrl(url);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const businessData = {
        businessName: formData.businessName.trim(),
      };

      const profileFormData = new FormData();
      profileFormData.append("name", formData.name.trim());
      profileFormData.append("phone", formData.phone.trim());

      if (avatarFile) {
        profileFormData.append("avatar", avatarFile);
      }

      if (coverPhotoFile) {
        profileFormData.append("coverPhoto", coverPhotoFile);
      }

      const [businessResponse, userResponse] = await Promise.all([
        updateVendorProfileAction(businessData),
        updateAdminProfileAction(profileFormData),
      ]);

      if (!businessResponse?.success) {
        throw new Error(
          businessResponse?.message || "Failed to update business name",
        );
      }

      if (!userResponse?.success) {
        throw new Error(
          userResponse?.message || "Failed to update profile details",
        );
      }

      if (setUser && user) {
        setUser({
          ...user,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          businessName: formData.businessName.trim(),
          avatar: avatarUrl ?? undefined,
          coverPhoto: coverPhotoUrl ?? undefined,
        });
      }

      setIsEditing(false);
      setAvatarFile(null);
      setCoverPhotoFile(null);

      await Swal.fire({
        title: "Success!",
        text: "All changes saved successfully",
        icon: "success",
        confirmButtonColor: "#06b1f7",
      });

      await getProfile();
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (apiData) {
      const userData = apiData?.user;
      setFormData({
        name: userData?.name || user?.name || "Host User",
        email: userData?.email || user?.email || "",
        phone: userData?.phone || "",
        businessName: apiData?.businessName || "",
        tradeLicenseNo: apiData?.tradeLicenseNo || "Not provided",
        nationalIdNo: apiData?.nationalIdNo || "Not provided",
      });
      setAvatarUrl(userData?.avatar || user?.avatar || null);
      setAvatarFile(null);
      setCoverPhotoUrl(userData?.coverPhoto || user?.coverPhoto || null);
      setCoverPhotoFile(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
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
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="border-border/50 p-4 bg-card/80 backdrop-blur-sm shadow-xl h-full flex flex-col">
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-secondary/50 rounded animate-pulse" />
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
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Vendor Profile Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your business details and verification documents
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
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
                    size="default"
                    className="bg-primary text-primary-foreground hover:bg-primary rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105"
                  >
                    <Save className="h-4 w-4 mr-2" />{" "}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    disabled={isSaving}
                    size="default"
                    variant="outline"
                    className="rounded-xl hover:bg-secondary"
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  size="default"
                  className="bg-primary text-primary-foreground hover:bg-primary rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105"
                >
                  <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 pt-0 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="relative w-full aspect-7/4 overflow-hidden bg-secondary/10 group/banner">
                <Image
                  src={
                    coverPhotoUrl ||
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt="Profile Banner"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover/banner:scale-105"
                  unoptimized={!!coverPhotoUrl?.startsWith("blob:")}
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-black/20 to-transparent" />

                {/* Cover Photo Upload Button */}
                <label
                  htmlFor="cover-photo-upload"
                  className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold cursor-pointer backdrop-blur-md border border-white/20 shadow-lg transition-all hover:scale-105 z-10 ${
                    isEditing
                      ? "opacity-100"
                      : "opacity-0 group-hover/banner:opacity-100"
                  }`}
                  title="Change Cover Photo"
                >
                  <Camera className="h-3.5 w-3.5 text-primary" />
                  <span>{coverPhotoUrl ? "Change Cover" : "Upload Cover"}</span>
                  <input
                    id="cover-photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverPhotoChange}
                  />
                </label>
              </div>
              <CardContent className="relative -mt-20 pb-6">
                <div className="relative mx-auto w-fit">
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-full bg-secondary transition-opacity duration-300" />
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
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4 space-y-3">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {formData.name}
                  </h2>
                  {formData.businessName && (
                    <p className="text-sm font-medium text-primary flex items-center justify-center gap-1">
                      <Building2 className="h-4 w-4" /> {formData.businessName}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-xl"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {apiData?.user?.status || "Vendor"}
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
                      <p className="font-medium truncate">
                        {formData.phone || "No phone added"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Form Fields */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 p-4 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Business & Verification Information
                    </CardTitle>
                    <CardDescription>
                      View corporate details and update editable profile
                      identifiers.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 flex-1">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Full Name
                  </label>
                  <FormField
                    id="name"
                    label=""
                    value={formData.name}
                    onChange={(value) =>
                      setFormData({ ...formData, name: value })
                    }
                    disabled={!isEditing}
                    className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 transition-all"
                  />
                </div>

                {/* Business Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Business Name
                  </label>
                  <div className="relative">
                    <FormField
                      id="businessName"
                      label=""
                      value={formData.businessName}
                      onChange={(value) =>
                        setFormData({ ...formData, businessName: value })
                      }
                      disabled={!isEditing}
                      className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 pr-10 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {!isEditing && <Lock className="h-4 w-4 opacity-50" />}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FormField
                        id="email"
                        label=""
                        type="email"
                        value={formData.email}
                        onChange={() => {}}
                        disabled={true}
                        className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 pr-10 transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock className="h-4 w-4 opacity-50" />
                      </div>
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Phone Number
                    </label>
                    <FormField
                      id="phone"
                      label=""
                      value={formData.phone}
                      onChange={(value) =>
                        setFormData({ ...formData, phone: value })
                      }
                      disabled={!isEditing}
                      className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Trade License */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> Trade
                      License No
                    </label>
                    <div className="relative">
                      <FormField
                        id="tradeLicenseNo"
                        label=""
                        value={formData.tradeLicenseNo}
                        onChange={() => {}}
                        disabled={true}
                        className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 pr-10 transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock className="h-4 w-4 opacity-50" />
                      </div>
                    </div>
                  </div>

                  {/* National ID */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <IdCard className="h-4 w-4 text-primary" /> National ID No
                    </label>
                    <div className="relative">
                      <FormField
                        id="nationalIdNo"
                        label=""
                        value={formData.nationalIdNo}
                        onChange={() => {}}
                        disabled={true}
                        className="w-full bg-background border-border text-foreground h-11 px-4 rounded-xl disabled:opacity-100 disabled:text-muted-foreground/80 disabled:bg-secondary/30 pr-10 transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock className="h-4 w-4 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostSettingsPage;
