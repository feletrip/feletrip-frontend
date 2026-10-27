"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createContactAction } from "@/Server/Home/Contact.action";
import { appToastQueue } from "@/lib/appToast";

const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export default function ContactSection() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    let loadingToast: any = null;
    try {
      loadingToast = appToastQueue.add({
        title: "Sending",
        description: "Sending your message...",
        variant: "default",
      });
    } catch (e) {
      console.error("Toast queue error:", e);
    }

    try {
      const payload = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };

      const res = await createContactAction(payload);

      if (loadingToast && typeof loadingToast.close === "function") {
        loadingToast.close();
      }

      if (res && res.success) {
        appToastQueue.add({
          title: "Success",
          description: res?.message || "Message sent successfully!",
          variant: "success",
        });

        form.reset();
      } else {
        appToastQueue.add({
          title: "Failed to Send",
          description: res?.message || "Could not send the message.",
          variant: "danger",
        });
      }
    } catch (error: any) {
      if (loadingToast && typeof loadingToast.close === "function") {
        loadingToast.close();
      }
      console.error("Contact submit error:", error);
      appToastQueue.add({
        title: "Network Broadcast Error",
        description:
          error?.message || "Something went wrong. Please try again.",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full bg-white/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 focus:border-primary dark:focus:border-primary outline-none px-4 py-3 rounded-xl text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 font-light transition-all duration-300 backdrop-blur-xs h-auto";
  const labelCls =
    "block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2";

  return (
    <section className="w-full bg-primary/10 dark:bg-neutral-900/40 py-12">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <div className="md:col-span-5 bg-primary/30 dark:bg-neutral-950/40 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-xs min-h-120">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
                  Get in touch
                </h2>
                <p className="text-neutral-700 dark:text-neutral-400 text-xs font-light">
                  We are here to help and answer any question you might have.
                </p>
              </div>

              {/* Visit Us */}
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 bg-white/10 border border-primary p-2 rounded-xl transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105 shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-0.5">
                    Visit us
                  </h4>
                  <p className="text-xs text-neutral-700 dark:text-neutral-400 font-light leading-relaxed">
                    House 514, Suite-A1, Road 07, Avenue-03,
                    <br />
                    Mirpur DOHS, Dhaka-1216
                  </p>
                </div>
              </div>

              {/* Chat To Us */}
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 bg-white/10 border border-primary p-2 rounded-xl transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105 shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-0.5">
                    Chat to us
                  </h4>
                  <p className="text-xs text-neutral-700 dark:text-neutral-400 font-light">
                    contact@ObeoRooms.com
                  </p>
                  <p className="text-xs text-neutral-700 dark:text-neutral-400 font-light">
                    reservations@ObeoRooms.com
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 bg-white/10 border border-primary p-2 rounded-xl transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105 shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-0.5">
                    Call us
                  </h4>
                  <p className="text-xs text-neutral-700 dark:text-neutral-400 font-light">
                    +880 1876-987622
                  </p>
                  <p className="text-xs text-neutral-700 dark:text-neutral-400 font-light">
                    +880 1876-987622
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Social Media */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 Social-Icons-Adjustment">
              <h4 className="text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3 font-medium Social-Media-Title-Adjustment">
                Social media
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary border border-primary/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/20 hover:text-white/50 hover:scale-110 shadow-xs"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary border border-primary/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/20 hover:text-white/50 hover:scale-110 shadow-xs"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary border border-primary/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/20 hover:text-white/50 hover:scale-110 shadow-xs"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary border border-primary/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:bg-primary/20 hover:text-white/50 hover:scale-110 shadow-xs"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-primary/5 dark:bg-neutral-950/40 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 rounded-3xl flex flex-col justify-center shadow-xs">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={labelCls}>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Your Name"
                            className={inputCls}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                {/* Email Address */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={labelCls}>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className={inputCls}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                {/* Your Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={labelCls}>Your Subject</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="I want to book a hotel room"
                            className={inputCls}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                {/* Message Textarea */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={labelCls}>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Tell us what we can help you with..."
                          className={inputCls}
                          style={{ resize: "none" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                {/* Privacy Policy Checkbox */}
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <div className="flex items-start gap-3 pt-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary cursor-pointer accent-primary"
                          />
                        </FormControl>
                        <FormLabel className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal cursor-pointer font-normal">
                          I&apos;d like to receive more information about
                          company, I understand and agree to the{" "}
                          <a
                            href="#"
                            className="text-primary hover:underline font-medium"
                          >
                            Privacy Policy
                          </a>
                          .
                        </FormLabel>
                      </div>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/50 text-primary-foreground py-3 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md shadow-primary/10 active:scale-[0.99] h-auto flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
