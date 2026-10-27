import type { Metadata } from "next";
import { IBM_Plex_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import GlobalBackground from "@/components/PublicLayout/Shared/GlobalBackground";
// import SmoothScrollProvider from "@/components/Reuseable/common/SmoothScroll";
import { getUser } from "@/lib/getUser";
import { AuthProvider } from "@/providers/authProvider";
import { AppToastProvider } from "@/lib/appToast";
import SocketProvider from "@/providers/socketProvider";
import ChatWidget from "@/components/Chat/chatWidget";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.FeleTrip.com"),

  title: {
    default: "FeleTrip - Find & Book Hotels at the Best Prices",
    template: "%s | FeleTrip",
  },

  description:
    "FeleTrip is a trusted hotel booking platform that connects travelers with hotels. Compare prices, explore destinations, and book comfortable stays with ease.",

  keywords: [
    "hotel booking",
    "book hotels online",
    "hotel reservation",
    "travel booking",
    "best hotel deals",
    "cheap hotels",
    "luxury hotels",
    "travel platform",
    "vacation booking",
    "FeleTrip",
  ],

  authors: [
    {
      name: "FeleTrip",
    },
  ],

  creator: "FeleTrip",
  publisher: "FeleTrip",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.FeleTrip.com",
    siteName: "FeleTrip",
    title: "FeleTrip - Find & Book Hotels at the Best Prices",
    description:
      "Discover amazing hotels, compare prices, and book your perfect stay with FeleTrip.",
    images: [
      {
        url: "https://i.ibb.co.com/mVX6bHzt/image.png",
        width: 1200,
        height: 630,
        alt: "FeleTrip Hotel Booking Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FeleTrip - Find & Book Hotels at the Best Prices",
    description:
      "Compare hotels, find great deals, and book your next stay with FeleTrip.",
    images: ["https://i.ibb.co.com/mVX6bHzt/image.png"],
  },

  category: "travel",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("unhandledrejection", function(e) {
                if (
                  e.reason instanceof DOMException &&
                  e.reason.name === "InvalidStateError" &&
                  /transition/i.test(e.reason.message)
                ) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body className={`${ibmPlexSans.className} ${playfair.variable}`}>
        <GlobalBackground />

        {/* <SmoothScrollProvider> */}
        <Providers>
          <AuthProvider initialUser={user}>
            <SocketProvider>
              {children}
              <ChatWidget />
            </SocketProvider>
          </AuthProvider>
        </Providers>
        {/* </SmoothScrollProvider> */}
        <AppToastProvider />
      </body>
    </html>
  );
}
