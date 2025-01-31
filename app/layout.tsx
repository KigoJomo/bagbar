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
  title: "Bag Bar",
  description: "Quality bags for you.",
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
