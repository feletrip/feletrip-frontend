"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
import { uploadToImgbb } from "@/lib/imageUpload";
import { updateProfile } from "@/lib/api";
import { useSession } from "next-auth/react";

type Props = {
  user: User;
  setUser: (user: User) => void;
  onCancel: () => void;
  onSuccess: () => void;
};
type FormValues = {
  name: string;
  phone: string;
  nidFront?: string;
  nidBack?: string;
  tradeLicense?: string;
};
export default function ProfileEditForm({
  user,
  setUser,
  onCancel,
  onSuccess,
}: Props) {
  const { data: session } = useSession();
  const userInfo = session?.user;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [nidFrontFile, setNidFrontFile] = useState<File | null>(null);
  const [nidBackFile, setNidBackFile] = useState<File | null>(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      setLoading(true);

      let avatar = userInfo?.avatar || "";
      let nidFront = user?.nidFront || "";
      let nidBack = user?.nidBack || "";
      let tradeLicense = user?.tradeLicense || "";

      const uploads = await Promise.all([
        imageFile ? uploadToImgbb(imageFile) : avatar,
        nidFrontFile ? uploadToImgbb(nidFrontFile) : nidFront,
        nidBackFile ? uploadToImgbb(nidBackFile) : nidBack,
        tradeLicenseFile ? uploadToImgbb(tradeLicenseFile) : tradeLicense,
      ]);

      avatar = uploads[0];
      nidFront = uploads[1];
      nidBack = uploads[2];
      tradeLicense = uploads[3];

      const res = await updateProfile(user._id, {
        name: formData.name,
        phone: formData.phone,
        avatar,
        nidFront,
        nidBack,
        tradeLicense,
      });
      setUser(res.data);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: res.message,
        confirmButtonColor: "#8c7656",
      });
      onSuccess();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        confirmButtonColor: "#8c7656",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-card border rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        Edit Your <span className="text-primary">Profile</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label>Avatar</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="space-y-2">
          <Label>Name</Label>

          <Input type="text" {...register("name", { required: true })} />
        </div>

        <div className="space-y-2">
          <Label>Phone</Label>

          <Input type="number" {...register("phone", { required: true })} />
        </div>

        <div className="space-y-2">
          <Label>NID Front</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setNidFrontFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="space-y-2">
          <Label>NID Back</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setNidBackFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="space-y-2">
          <Label>Trade License</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setTradeLicenseFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>

          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
