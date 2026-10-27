import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const galleryImages = [
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=700&q=80",
];

const usefulLinks = [
  { label: "About Hotel Mania", href: "/about" },
  { label: "Rooms & Suites", href: "/hotels" },
  { label: "Reservations", href: "/booking" },
  { label: "Special Deals", href: "/deal" },
  { label: "Travel Journal", href: "/blog" },
  { label: "Contact Concierge", href: "/contact" },
];

const policies = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cancellation Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative -mt-10 dark:mt-10 overflow-hidden dark:border-primary bg-background">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
       

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <Card className="border-border bg-card lg:col-span-4">
            <CardContent className="space-y-6 p-6">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="https://i.ibb.co.com/PvV4PY1g/Logo.png"
                  alt="Hotel Mania logo"
                  width={44}
                  height={44}
                  className="rounded-full border border-border bg-muted p-1"
                />
                <div>
                  <p className="font-serif text-2xl text-foreground">Hotel Mania</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Luxury Hospitality</p>
                </div>
              </Link>

              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 text-primary" />
                  <span>+880 1234 567 220</span>
                </p>
                <p className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 text-primary" />
                  <span>hello@hotelmania.com</span>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-primary" />
                  <span>102/B New Elephant Road, Dhaka - 1212</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full border-border bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card lg:col-span-3">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground">Useful Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {usefulLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 text-sm font-semibold text-foreground">Policies</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {policies.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-flex text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-card lg:col-span-5">
            <CardContent className="p-6">
              <div className="flex items-end justify-between">
                <h3 className="text-lg font-semibold text-foreground">Manias Room Gallery</h3>
                <Link href="/hotels/search" className="text-sm text-primary transition-opacity hover:opacity-80">
                  View all rooms
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src={image}
                      alt={`Hotel Mania five-star suite ${index + 1}`}
                      width={280}
                      height={200}
                      className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/35 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Hotel Mania. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="transition-colors hover:text-primary">
              Accessibility
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Sitemap
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
