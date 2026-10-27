import { ThemeProvider } from "@/components/modules/theme/theme-provider";
import Footer from "@/components/PublicLayout/Shared/Footer";
import { Navbar } from "@/components/PublicLayout/Shared/Navbar";

export default function CommonLayout({
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
      {/* <Navbar/> */}
      <header>
        <Navbar></Navbar>
      </header>

      {/* main */}
      <main className="min-h-[50vh]">{children}</main>

      {/* <Footer /> */}
      <footer>
        <Footer></Footer>
      </footer>
    </ThemeProvider>
  );
}
