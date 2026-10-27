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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Users, MapPin, Info, Send } from "lucide-react";
import { CouponSection } from "./Coupon";

const bookingFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is too short"),
  firstNameTraveler: z.string().min(1, "First name is required"),
  lastNameTraveler: z.string().min(1, "Last name is required"),
  age: z.number().min(0, "Age must be positive").max(120),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  additionInfo: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingInfoForm() {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      firstNameTraveler: "",
      lastNameTraveler: "",
      age: 0,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      additionInfo: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: BookingFormValues) => {
  };

  return (
    <div className="bg-linear-to-b from-slate-50 to-white rounded-b-md shadow-sm">
      <div className="">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* ────────────── Primary Contact ────────────── */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-indigo-100 p-3">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Primary Contact
                  </h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            className="h-11 transition-all focus:ring-2 focus:ring-indigo-400/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="h-11 transition-all focus:ring-2 focus:ring-indigo-400/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            className="h-11 transition-all focus:ring-2 focus:ring-indigo-400/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+880 123 456 789"
                            className="h-11 transition-all focus:ring-2 focus:ring-indigo-400/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator className="my-8 bg-gray-200" />

              {/* ────────────── Traveler Info ────────────── */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-3">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Traveler Information
                  </h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="firstNameTraveler"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Traveler First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Traveler first name"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastNameTraveler"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Traveler Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Traveler last name"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="25"
                            className="h-11"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.valueAsNumber || undefined,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Popular Destinations</SelectLabel>
                              <SelectItem value="srilanka">
                                Sri Lanka
                              </SelectItem>
                              <SelectItem value="india">India</SelectItem>
                              <SelectItem value="bangladesh">
                                Bangladesh
                              </SelectItem>
                              <SelectItem value="nepal">Nepal</SelectItem>
                              <SelectItem value="bhutan">Bhutan</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 mt-6">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="House 12, Road 5"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apartment / Floor"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Chattogram"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State / Division</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Chittagong Division"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="4000"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        Additional Information
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Special requests, dietary needs, notes..."
                          className="min-h-27 resize-y mb-6"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Submit Booking
                </Button>
              </div> */}
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
}
