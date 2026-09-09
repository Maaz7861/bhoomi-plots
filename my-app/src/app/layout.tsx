import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhoomi Plots | Premium Real Estate & Land Investment in India",
  description: "Discover premium residential and commercial plots with Bhoomi Plots. Your trusted partner for real estate investment and land buying in India. Explore our projects now.",
  keywords: [
    "bhoomi plots", "bhoomi group", "buy plots in india", "residential plots", 
    "commercial plots", "real estate india", "land for sale", "premium plots", 
    "property investment", "NA plots", "buy land", "real estate developers"
  ],
  authors: [{ name: "Bhoomi Group" }],
  openGraph: {
    title: "Bhoomi Plots | Premium Real Estate & Land Investment in India",
    description: "Discover premium residential and commercial plots with Bhoomi Plots. Your trusted partner for real estate investment and land buying in India.",
    url: "https://www.bhoomiplots.com",
    siteName: "Bhoomi Plots",
    images: [
      {
        url: "/assets/images/bhoomi-logo-white-1-1536x526.png",
        width: 1536,
        height: 526,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/assets/images/bhoomi-logo-white-1-1536x526.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}