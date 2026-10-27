"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  CalendarDays,
  Lock,
  Pencil,
  Plus,
  User,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SiMastercard } from "react-icons/si";

const paymentFormSchema = z
  .object({
    paymentMethod: z.enum(["card", "paypal", "stripe"]),
    selectedSavedCard: z.string().optional(),
    cardHolderName: z.string().min(1, "Cardholder name is required").optional(),
    cardNumber: z.string().min(1, "Card number is required").optional(),
    expiry: z.string().min(1, "Expiry date is required").optional(),
    cvv: z
      .string()
      .min(3, "CVV is too short")
      .max(4, "CVV is too long")
      .optional(),
    paypalEmail: z.string().email("Invalid email").optional(),
    paypalPassword: z.string().min(6, "Password too short").optional(),
    stripeEmail: z.string().email("Invalid email").optional(),
    stripePassword: z.string().min(6, "Password too short").optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "paypal") {
        return !!data.paypalEmail && !!data.paypalPassword;
      }
      if (data.paymentMethod === "stripe") {
        return !!data.stripeEmail && !!data.stripePassword;
      }
      if (data.paymentMethod === "card") {
        return true;
      }
      return true;
    },
    {
      message: "Required fields missing for selected payment method",
      path: [],
    },
  );

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export function PaymentDetailsSection() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "card",
      selectedSavedCard: "new",
    },
    mode: "onChange",
  });

  const watchPaymentMethod = form.watch("paymentMethod");
  const watchSelectedCard = form.watch("selectedSavedCard");

  const onSubmit = (data: PaymentFormValues) => {
  };

  const totalToPay = 9569;

  return (
    <Card className="rounded-md rounded-t-none border-0">
      <CardContent className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Payment Method Selection */}
            <div className="space-y-2">
              <h3 className="text-base font-medium text-gray-700">
                Payment Method
              </h3>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div
                          className={cn(
                            "flex items-center space-x-3 rounded-lg p-4 cursor-pointer transition-all",
                            // field.value === "card" &&
                            //   "border-red-600 bg-red-50/40 ring-1 ring-red-600/20",
                          )}
                          onClick={() => field.onChange("card")}
                        >
                          <RadioGroupItem
                            value="card"
                            id="card"
                            // className={cn(
                            //   field.value === "card" && "text-red-600",
                            // )}
                          />
                          <Label
                            htmlFor="card"
                            className="cursor-pointer font-medium"
                          >
                            Credit / Debit Card
                          </Label>
                        </div>

                        <div
                          className={cn(
                            "flex items-center space-x-3 p-4 cursor-pointer transition-all opacity-60",
                          )}
                        >
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label
                            htmlFor="paypal"
                            className="cursor-pointer font-medium"
                          >
                            PayPal
                          </Label>
                        </div>

                        <div
                          className={cn(
                            "flex items-center space-x-3 p-4 cursor-pointer transition-all opacity-60",
                          )}
                        >
                          <RadioGroupItem value="stripe" id="stripe" />
                          <Label
                            htmlFor="stripe"
                            className="cursor-pointer font-medium"
                          >
                            Stripe
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Credit Card Section */}
            {watchPaymentMethod === "card" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Payment With Credit Card
                </h3>

                {/* Saved Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Visa Card */}
                  <div
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all hover:border-red-400",
                      watchSelectedCard === "visa-2547" &&
                        "border-red-600 ring-1 ring-red-600/30 bg-red-50/20",
                    )}
                    onClick={() =>
                      form.setValue("selectedSavedCard", "visa-2547")
                    }
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xl font-bold text-blue-700">
                        VISA
                      </div>
                      <Pencil className="h-4 w-4 text-gray-500 hover:text-red-600" />
                    </div>
                    <div className="font-mono text-lg tracking-widest text-gray-700 mb-1">
                      **** **** **** 2547
                    </div>
                    <div className="text-sm text-gray-500">
                      Expiry: May 2026
                    </div>
                  </div>

                  {/* Mastercard */}
                  <div
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all hover:border-red-400",
                      watchSelectedCard === "master-2547" &&
                        "border-red-600 ring-1 ring-red-600/30 bg-red-50/20",
                    )}
                    onClick={() =>
                      form.setValue("selectedSavedCard", "master-2547")
                    }
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1">
                        <div className="text-xl font-bold text-orange-600">
                          <SiMastercard className="h-10 w-10" />
                        </div>
                      </div>
                      <Pencil className="h-4 w-4 text-gray-500 hover:text-red-600" />
                    </div>
                    <div className="font-mono text-lg tracking-widest text-gray-700 mb-1">
                      **** **** **** 2547
                    </div>
                    <div className="text-sm text-gray-500">
                      Expiry: May 2026
                    </div>
                  </div>

                  {/* Add New Card */}
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500 transition-colors min-h-35"
                    onClick={() => form.setValue("selectedSavedCard", "new")}
                  >
                    <Plus className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      Add New Card
                    </span>
                  </div>
                </div>

                {/* New Card Form - shown when adding new or no saved card selected */}
                {(watchSelectedCard === "new" || !watchSelectedCard) && (
                  <div className="space-y-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="cardHolderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Holder Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="John Doe"
                                  className="pl-8! h-11"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="4242 4242 4242 4242"
                                  className="pl-8! h-11"
                                  maxLength={19}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="expiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expire Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="MM / YY"
                                  className="pl-8! h-11"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="123"
                                  className="pl-8! h-11"
                                  type="password"
                                  maxLength={4}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PayPal Section */}
            {watchPaymentMethod === "paypal" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Payment With PayPal
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="paypalEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="your.email@example.com"
                              className="pl-8! h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paypalPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-8! h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Optional: small note */}
                <p className="text-sm text-gray-500">
                  You will be redirected to PayPal to complete the payment
                  securely.
                </p>
              </div>
            )}

            {/* Stripe Section - similar to PayPal for your reference */}
            {watchPaymentMethod === "stripe" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Payment With Stripe
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="stripeEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="your.email@example.com"
                              className="pl-8! h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stripePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-8! h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Secure payment processed by Stripe.
                </p>
              </div>
            )}

            {/* Confirm Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="h-14 bg-brand-primary text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer ml-auto block hover:text-black"
              >
                Confirm & Pay ${totalToPay}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
