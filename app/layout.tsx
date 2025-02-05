import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/context/theme-context";
import { ToastProvider } from "@/context/toast-context";
import { AuthProvider } from "@/context/AuthContext";
import { ShopProvider } from "@/context/ShopContext";

export const metadata: Metadata = {
  title: "Bag Bar | Affordable Luxury Armpit Bags in Kenya",
  description:
    "Discover premium quality armpit bags at accessible prices. Free nationwide delivery across Kenya, 30-day quality guarantee, and secure payments.",
  keywords: [
    "armpit bags Nairobi",
    "affordable luxury armpit bags",
    "Kenya fashion",
    "designer armpit bags Kenya",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Bag Bar | Affordable Luxury Armpit Bags in Kenya",
    description:
      "Discover premium quality armpit bags at accessible prices. Free nationwide delivery across Kenya, 30-day quality guarantee, and secure payments.",
    siteName: "Bag Bar",
    images: "/images/opengraph-image.webp",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bagbar_co",
    creator: "@bagbar_co",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hidden">
      <body className="scrollbar-hidden relative">
        <AuthProvider>
          <ShopProvider>
            <ThemeProvider>
              <ToastProvider>
                <Header />
                {children}
                <Footer />
              </ToastProvider>
            </ThemeProvider>
          </ShopProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
