"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditDealModalProps {
  deal: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updatedData: any) => void;
}

export default function EditDealModal({
  deal,
  isOpen,
  onClose,
  onUpdate,
}: EditDealModalProps) {
  const [formData, setFormData] = useState({
    title: deal?.title ?? "",
    description: deal?.description ?? "",
    promoCode: deal?.promoCode ?? "",
    dealType: deal?.dealType ?? "PERCENTAGE",
    discountValue:
      deal?.discountValue !== undefined && deal?.discountValue !== null
        ? String(deal.discountValue)
        : "",
    maxDiscount:
      deal?.maxDiscount !== undefined && deal?.maxDiscount !== null
        ? String(deal.maxDiscount)
        : "",
    startDate: deal?.startDate ? deal.startDate.split("T")[0] : "",
    endDate: deal?.endDate ? deal.endDate.split("T")[0] : "",
    usageLimit:
      deal?.usageLimit !== undefined && deal?.usageLimit !== null
        ? String(deal.usageLimit)
        : "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [imagePreview, setImagePreview] = useState<string | null>(
    deal?.image || null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  if (!isOpen || !deal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("promoCode", formData.promoCode);
    payload.append("dealType", formData.dealType);
    payload.append("discountValue", formData.discountValue);

    if (formData.maxDiscount)
      payload.append("maxDiscount", formData.maxDiscount);
    if (formData.startDate) payload.append("startDate", formData.startDate);
    if (formData.endDate) payload.append("endDate", formData.endDate);
    if (formData.usageLimit) payload.append("usageLimit", formData.usageLimit);

    if (selectedFile) {
      payload.append("image", selectedFile);
    }

    onUpdate(deal.id, payload);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-background border-border text-foreground shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Edit Deal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Campaign Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs text-muted-foreground">
              Campaign Title
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-muted/40 border-border text-foreground focus-visible:ring-primary"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="description"
              className="text-xs text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-muted/40 border-border text-foreground focus-visible:ring-primary"
            />
          </div>

          {/* Image Upload & Small Preview */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Campaign Image
            </Label>

            <div className="flex items-center gap-3">
              {/* Image Preview Box */}
              {imagePreview ? (
                <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0 group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 p-0.5 bg-black/60 text-white rounded-full hover:bg-rose-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="h-16 w-16 rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center text-muted-foreground shrink-0">
                  <Upload size={18} />
                </div>
              )}

              {/* File Input */}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-muted/40 border-border text-foreground focus-visible:ring-primary file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 file:py-1 file:text-xs hover:file:bg-secondary hover:file:text-secondary-foreground transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Promo Code */}
          <div className="space-y-1.5">
            <Label
              htmlFor="promoCode"
              className="text-xs text-muted-foreground"
            >
              Promo Code
            </Label>
            <Input
              id="promoCode"
              type="text"
              value={formData.promoCode}
              onChange={(e) =>
                setFormData({ ...formData, promoCode: e.target.value })
              }
              className="bg-muted/40 border-border font-mono text-foreground uppercase focus-visible:ring-primary"
              required
            />
          </div>

          {/* Deal Type & Discount Value */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Deal Type</Label>
              <Select
                value={formData.dealType}
                onValueChange={(value) =>
                  setFormData({ ...formData, dealType: value })
                }
              >
                <SelectTrigger className="bg-muted/40 border-border text-foreground focus:ring-primary">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground">
                  <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                  <SelectItem value="FLAT">Fixed Amount (BDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="discountValue"
                className="text-xs text-muted-foreground"
              >
                Discount Value
              </Label>
              <Input
                id="discountValue"
                type="number"
                value={formData.discountValue}
                onChange={(e) =>
                  setFormData({ ...formData, discountValue: e.target.value })
                }
                className="bg-muted/40 border-border text-foreground focus-visible:ring-primary"
                required
              />
            </div>
          </div>

          {/* Max Discount & Usage Limit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="maxDiscount"
                className="text-xs text-muted-foreground"
              >
                Max Discount (BDT)
              </Label>
              <Input
                id="maxDiscount"
                type="number"
                value={formData.maxDiscount}
                onChange={(e) =>
                  setFormData({ ...formData, maxDiscount: e.target.value })
                }
                placeholder="e.g. 500"
                className="bg-muted/40 border-border text-foreground focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="usageLimit"
                className="text-xs text-muted-foreground"
              >
                Usage Limit
              </Label>
              <Input
                id="usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) =>
                  setFormData({ ...formData, usageLimit: e.target.value })
                }
                placeholder="e.g. 50"
                className="bg-muted/40 border-border text-foreground focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="startDate"
                className="text-xs text-muted-foreground"
              >
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="bg-muted/40 border-border text-foreground focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="endDate"
                className="text-xs text-muted-foreground"
              >
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="bg-muted/40 border-border text-foreground focus-visible:ring-primary"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-border flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors font-semibold"
            >
              Update Deal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
