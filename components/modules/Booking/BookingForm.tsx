"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormValues } from "./bookingSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Hotel } from "@/types/singleHotel";
import { ChevronRight } from "lucide-react";

interface BookingFormProps {
  hotel: Hotel;
}

const additionalRequests = [
  "Airport Transfer",
  "Extra Bed",
  "Room On a Higher Floor",
  "Decorations in Room",
];

export default function BookingForm({ hotel }: BookingFormProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: [
        { firstName: "", lastName: "" },
        { firstName: "", lastName: "" },
      ],
      requests: [],
    },
  });

  const onSubmit = (data: BookingFormValues) => {
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-4 rounded-xl"
      >
        {/* Guests Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">{hotel?.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center">
              <span>{hotel?.location}</span>
              <span className="mt-1">
                <ChevronRight size={16} />
              </span>
              <span>{hotel?.propertyType}</span>
            </p>
          </div>

          {form.watch("guests").map((_, index) => (
            <div key={index} className="space-y-4 border rounded-md p-4">
              <h3 className="font-medium">
                Guest {index + 1} {index === 0 && "(Adult)"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`guests.${index}.firstName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Given Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Given Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`guests.${index}.lastName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Surname" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Primary Contact */}
        <div className="space-y-6 border rounded-md p-4">
          <div>
            <h2 className="text-lg font-semibold">Primary Contact</h2>
            <p className="text-sm text-muted-foreground">
              Please enter the contact details of the person who would like to
              receive the confirmation and be contacted if required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="primaryContactIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Primary Contact</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Primary Contact" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Guest 1</SelectItem>
                      <SelectItem value="1">Guest 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+880 1XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Requests */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Additional Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalRequests.map((item) => (
              <FormField
                key={item}
                control={form.control}
                name="requests"
                render={({ field }) => {
                  const currentValues = field.value ?? [];
                  const isChecked = currentValues.includes(item);
                  return (
                    <FormItem>
                      <FormControl>
                        <label
                          className={`
              flex items-center space-x-3
              border rounded-md p-4 cursor-pointer
              transition
              ${isChecked ? "border-primary bg-primary/5" : "hover:border-primary"}
            `}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...currentValues, item]);
                              } else {
                                field.onChange(
                                  currentValues.filter((v) => v !== item),
                                );
                              }
                            }}
                          />
                          <span>{item}</span>
                        </label>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>

        {/* Bed Type */}
        <FormField
          control={form.control}
          name="bedType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block font-semibold">
                Bed Type
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  {/* Large Bed */}
                  <div className="flex-1 cursor-pointer rounded-md border border-gray-300 p-4 hover:border-primary hover:bg-primary/5 transition">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Large Bed" id="large-bed" />
                      <FormLabel
                        htmlFor="large-bed"
                        className="cursor-pointer font-medium"
                      >
                        Large Bed
                      </FormLabel>
                    </div>
                    {/* <p className="mt-1 text-xs text-muted-foreground">
                      Spacious comfort for couples
                    </p> */}
                  </div>

                  {/* Twin Beds */}
                  <div className="flex-1 cursor-pointer rounded-md border border-gray-300 p-4 hover:border-primary hover:bg-primary/5 transition">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Twin Beds" id="twin-beds" />
                      <FormLabel
                        htmlFor="twin-beds"
                        className="cursor-pointer font-medium"
                      >
                        Twin Beds
                      </FormLabel>
                    </div>
                    {/* <p className="mt-1 text-xs text-muted-foreground">
                      Perfect for friends or family
                    </p> */}
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Note */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave a Note For The Property</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I am arriving by Flight No..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-primary/90 hover:bg-primary text-background cursor-pointer"
        >
          Confirm Booking
        </Button>
      </form>
    </Form>
  );
}
