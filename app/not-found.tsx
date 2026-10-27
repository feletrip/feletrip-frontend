import Link from "next/link";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ObeoRoomsLogo from "@/components/shared/ObeoRoomLogo";
import { Container } from "@/components/PublicLayout/Shared/Container";

export default function NotFound() {
  return (
    <Container>
      <main className="min-h-screen w-full flex flex-col justify-between px-6 py-12 lg:px-24">
        {/* Top Branding / Header */}
        <div className="flex items-center justify-between">
          <ObeoRoomsLogo titleClassname="hidden sm:block" />
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
            Error Code: 404
          </span>
        </div>

        {/* Main Split Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center my-auto py-12">
          {/* Left Column: Huge 404 & Clear Text */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-destructive">
                Page Not Found
              </span>
              <h1 className="text-7xl sm:text-9xl font-black tracking-tighter text-destructive leading-none">
                404
              </h1>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              The destination you are looking for doesn&apos;t exist.
            </h2>

            <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
              You might have followed an outdated link, or the page has been
              shifted to a new route. Check the URL or head back to safety.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" /> Back to Homepage
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link
                  href="javascript:history.back()"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Go Previous Page
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Columnd */}
          <div className="md:col-span-5">
            <div className="p-6 border-l border-primary/30 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">
                  Looking for something?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Here are a few helpful pathways you can explore instead:
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/hotels"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-background/50 hover:bg-accent/50 transition-all text-sm font-medium text-foreground group"
                >
                  <span className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-primary" /> Browse Hotels &
                    Resorts
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-background/50 hover:bg-accent/50 transition-all text-sm font-medium text-foreground group"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-primary" /> Customer
                    Support Center
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ObeoRooms. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </main>
    </Container>
  );
}
