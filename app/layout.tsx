import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NovaShop — Premium Online Store",
    template: "%s | NovaShop",
  },
  description:
    "Discover premium electronics, clothing, home goods, and sports gear at NovaShop. Fast shipping, easy returns, and unbeatable prices.",
  keywords: ["ecommerce", "online store", "electronics", "clothing", "shopping"],
  openGraph: {
    title: "NovaShop — Premium Online Store",
    description: "Discover premium products at NovaShop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
