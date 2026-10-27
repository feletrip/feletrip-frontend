"use client";

import { useState } from "react";
import {
  Wallet,
  User,
  CreditCard,
  Send,
  AlertCircle,
  Loader2,
  ChevronDown,
  Landmark,
} from "lucide-react";
import { Modal, ComboBox, Input, Label, ListBox } from "@heroui/react";
import { createWithdrawalRequest } from "@/Server/Vendor/vendorRequestWithdrawal.action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
};

const PAYMENT_METHODS = [
  { id: "bKash", name: "bKash" },
  { id: "Nagad", name: "Nagad" },
  { id: "Rocket", name: "Rocket" },
  { id: "Bank Transfer", name: "Bank Transfer" },
] as const;

export default function WithdrawalModal({
  isOpen,
  onOpenChange,
  availableBalance,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "bKash",
    accountNumber: "",
    accountName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setServerError(null);
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const amountNum = Number(formData.amount);

    if (!formData.amount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = "Enter a valid positive amount.";
    } else if (amountNum > availableBalance) {
      newErrors.amount = `Amount exceeds available balance (৳${availableBalance.toLocaleString()}).`;
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account/Phone number is required.";
    }

    if (!formData.accountName.trim()) {
      newErrors.accountName = "Account holder name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) return;

    setLoading(true);
    toast.loading(
      "Submitting request...",
      "Please wait while we process your withdrawal.",
    );

    try {
      const response = await createWithdrawalRequest({
        amount: Number(formData.amount),
        paymentMethod: formData.paymentMethod,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
      });

      setLoading(false);

      if (response?.success) {
        toast.success(
          "Request Submitted",
          "Your withdrawal request has been submitted successfully.",
        );
        setFormData({
          amount: "",
          paymentMethod: "bKash",
          accountNumber: "",
          accountName: "",
        });
        setErrors({});
        onOpenChange(false);
      } else {
        const msg = response?.message || "Failed to submit withdrawal request.";
        setServerError(msg);
        toast.error("Submission Failed", msg);
      }
    } catch {
      setLoading(false);
      const errMsg = "An unexpected error occurred. Please try again.";
      setServerError(errMsg);
      toast.error("Submission Error", errMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-lg rounded-3xl border border-border/60 bg-background/80 backdrop-blur-2xl p-6 shadow-2xl">
            <Modal.CloseTrigger />

            <form onSubmit={handleSubmit}>
              {/* Header */}
              <Modal.Header className="flex! items-center gap-3 border-b border-border/40 pb-4">
                <Modal.Icon className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Wallet className="w-6 h-6" />
                </Modal.Icon>
                <div className="flex flex-col">
                  <Modal.Heading className="text-lg font-bold text-foreground leading-snug">
                    Request Payout
                  </Modal.Heading>
                  <p className="text-xs text-muted-foreground font-normal">
                    Transfer earnings to your preferred account
                  </p>
                </div>
              </Modal.Header>

              {/* Form Body */}
              <Modal.Body className="space-y-4 py-4">
                {/* Withdrawable Balance Summary */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-primary/5 border border-primary/15">
                  <span className="text-base font-semibold text-muted-foreground">
                    Withdrawable Amount
                  </span>
                  <span className="text-lg font-black text-primary">
                    ৳{availableBalance.toLocaleString()}
                  </span>
                </div>

                {/* Amount Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Withdrawal Amount (BDT)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-muted-foreground font-bold text-sm pointer-events-none">
                      ৳
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) =>
                        handleInputChange("amount", e.target.value)
                      }
                      className={`w-full rounded-lg border bg-background px-3.5 py-2.5 pl-8 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        errors.amount
                          ? "border-destructive"
                          : "border-border/60"
                      }`}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-[11px] font-medium text-destructive">
                      {errors.amount}
                    </p>
                  )}
                </div>

                {/* Payment Method Combobox */}
                <div className="space-y-1.5">
                  <ComboBox
                    className="w-full"
                    selectedKey={formData.paymentMethod}
                    onSelectionChange={(key) =>
                      handleInputChange(
                        "paymentMethod",
                        (key as string) || "bKash",
                      )
                    }
                  >
                    <Label className="text-xs font-semibold text-foreground block">
                      Payment Method
                    </Label>
                    <div className="relative flex items-center w-full">
                      <Landmark className="absolute left-3.5 z-10 w-4 h-4 text-muted-foreground pointer-events-none shrink-0" />
                      <ComboBox.InputGroup className="w-full relative flex items-center">
                        <Input
                          placeholder="Select payment method"
                          className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-9 pr-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <ComboBox.Trigger className="absolute right-3.5 inset-y-0 flex items-center justify-center p-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none">
                          <ChevronDown className="w-4 h-4 shrink-0" />
                        </ComboBox.Trigger>
                      </ComboBox.InputGroup>
                    </div>
                    <ComboBox.Popover className="z-50 rounded-lg border border-border/60 bg-background/95 backdrop-blur-lg shadow-xl p-1">
                      <ListBox>
                        {PAYMENT_METHODS.map((method) => (
                          <ListBox.Item
                            key={method.id}
                            id={method.id}
                            textValue={method.name}
                            className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                          >
                            {method.name}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </ComboBox.Popover>
                  </ComboBox>
                </div>

                {/* Account Number Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Account / Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <CreditCard className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none shrink-0" />
                    <input
                      type="text"
                      placeholder="017XXXXXXXX"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleInputChange("accountNumber", e.target.value)
                      }
                      className={`w-full rounded-lg border bg-background px-3.5 py-2.5 pl-9 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.accountNumber
                          ? "border-destructive"
                          : "border-border/60"
                      }`}
                    />
                  </div>
                  {errors.accountNumber && (
                    <p className="text-[11px] font-medium text-destructive">
                      {errors.accountNumber}
                    </p>
                  )}
                </div>

                {/* Account Holder Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground block">
                    Account Holder Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.accountName}
                      onChange={(e) =>
                        handleInputChange("accountName", e.target.value)
                      }
                      className={`w-full rounded-lg border bg-background px-3.5 py-2.5 pl-9 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.accountName
                          ? "border-destructive"
                          : "border-border/60"
                      }`}
                    />
                  </div>
                  {errors.accountName && (
                    <p className="text-[11px] font-medium text-destructive">
                      {errors.accountName}
                    </p>
                  )}
                </div>
              </Modal.Body>

              {/* Footer Actions */}
              <Modal.Footer className="flex items-center justify-end gap-3 border-t border-border/40 pb-4 mt-4">
                <Button
                  type="button"
                  variant="warning"
                  disabled={loading}
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
