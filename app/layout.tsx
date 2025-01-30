import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
