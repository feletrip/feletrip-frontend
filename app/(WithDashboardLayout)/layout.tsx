import DashboardNavbar from "@/components/modules/dashboard/dashboard-navbar";
import { AppSidebar } from "@/components/modules/dashboard/dashboard-sidebar";
import { ThemeProvider } from "@/components/modules/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppToastProvider } from "@/lib/appToast";
import { IBM_Plex_Sans } from "next/font/google";


const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "14rem",
            "--sidebar-width-mobile": "18rem",
          } as React.CSSProperties
        }
      >
        <aside className={`${ibmPlexSans.className}`}>
          <AppSidebar />
        </aside>

        <main
          className={`relative flex-1 min-w-0 flex flex-col ${ibmPlexSans.className}`}
        >
          {/* Navbar Wrapper */}
          <div className="bg-sidebar px-2 pt-2 shrink-0 w-full sticky top-0 z-20">
            <nav className="rounded-md px-3 py-2 sm:p-4 top-0 z-10">
              <DashboardNavbar />
            </nav>
          </div>

          <div className="flex-1 min-h-0 px-3 lg:px-8 py-2 bg-background">
            <section className="py-4">
              {children}
            </section>
          </div>
        </main>
      </SidebarProvider>

      <AppToastProvider />
    </ThemeProvider> 
  );
}
