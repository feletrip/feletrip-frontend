"use client";

import { useState, useTransition, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SectionTitle from "../../Typography";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Container } from "../../Shared/Container";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { createContactAction } from "@/Server/Home/Contact.action";
import { toast } from "@/components/Reuseable/common/toast";

// Declared Contact Info Data
const contactInfo = {
  title: "Contact Information",
  description:
    "If you have any questions or need assistance, feel free to reach out to us.",
  phones: ["+8801876987622", "+8801876987622"],
  email: "support@ObeoRooms.com",
  address: "House 514, Suite-A1, Road 07, Avenue-03, Mirpur DOHS, Dhaka-1216",
};

// Declared Initial Form State Data
const formState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState(formState);

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    toast.loading(
      "Sending your message...",
      "We're delivering your request to our support team.",
    );

    startTransition(async () => {
      const res = await createContactAction(formData);

      if (res.success) {
        toast.success(
          "Message Received!",
          res.message ||
            "Thank you for reaching out. We can't wait to assist you!",
        );
        setFormData(formState);
      } else {
        if (res.errors && res.errors.length > 0) {
          res.errors.forEach((err) => {
            toast.error("Almost there!", err.message);
          });
        } else {
          toast.error(
            "Oops, couldn't send right now",
            res.message || "Please give it another try in a moment.",
          );
        }
      }
    });
  };

  return (
    <section className="relative w-full overflow-x-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-primary/20 -z-2 h-5/9" />
      <Container>
        {/* title */}
        <SectionTitle
          title="Contact Us"
          subtitle="Get In Touch With Us"
          className="text-center mb-12"
          divClassName="justify-center"
          subtitleClassName="max-w-3xl mx-auto"
        />
        {/* Content */}
        <Card className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-center items-center max-w-6xl mx-auto bg-background p-4! border-none mb-8">
          {/* contact info */}
          <aside className="relative h-full overflow-hidden bg-primary text-background p-6 rounded-lg">
            {/* background circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-linear-to-br from-white/50 to-transparent" />

            <Motion
              animationType="slideDown"
              duration={0.3}
              delay={0.2}
              once={false}
              className="text-xl font-bold"
            >
              {contactInfo.title}
            </Motion>
            <Motion
              animationType="slideDown"
              duration={0.3}
              delay={0.4}
              once={false}
              className="text-xs text-background/80 mt-2"
            >
              {contactInfo.description}
            </Motion>

            <div className="mt-8 space-y-4">
              <Motion
                animationType="fadeLeft"
                duration={0.3}
                delay={0.5}
                once={false}
                className="flex items-center gap-3 text-sm"
              >
                <Phone size={18} className="shrink-0" />
                <span>
                  {contactInfo.phones.map((phone, idx) => (
                    <span key={idx}>
                      {phone}
                      {idx < contactInfo.phones.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </Motion>

              <Motion
                animationType="fadeLeft"
                duration={0.3}
                delay={0.6}
                once={false}
                className="flex items-center gap-3"
              >
                <Mail size={18} className="shrink-0" />
                <span>{contactInfo.email}</span>
              </Motion>
              <Motion
                animationType="fadeLeft"
                duration={0.3}
                delay={0.7}
                once={false}
                className="flex items-center gap-3"
              >
                <MapPin size={18} className="shrink-0" />
                <span className="text-sm">{contactInfo.address}</span>
              </Motion>
            </div>
          </aside>

          {/* Form */}
          <div className="p-8 lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <Motion animationType="fadeLeft" delay={0.1} once={false}>
                  <div className="flex flex-col">
                    <label className="text-xs text-primary">Your Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="John Doe"
                      className="h-10 border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </Motion>

                {/* Email */}
                <Motion animationType="fadeRight" delay={0.15} once={false}>
                  <div className="flex flex-col">
                    <label className="text-xs text-primary">Your Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="example@gmail.com"
                      className="h-10 border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </Motion>
              </div>

              {/* Subject */}
              <Motion animationType="fadeLeft" delay={0.2} once={false}>
                <div className="flex flex-col">
                  <label className="text-xs text-primary">Your Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="I want to book a hotel room"
                    className="h-10 border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
              </Motion>

              {/* Message */}
              <Motion animationType="slideUp" delay={0.25} once={false}>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-primary">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Write your message here"
                    rows={6}
                    className="border-0 border-b border-foreground/20 rounded-none px-0 resize-none focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
              </Motion>

              {/* Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto"
              >
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </Card>
      </Container>
    </section>
  );
}
