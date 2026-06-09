import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_METADATA } from "@/constants";
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
  ...(SITE_METADATA.siteUrl ? { metadataBase: new URL(SITE_METADATA.siteUrl) } : {}),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.ownerName}`,
  },
  description: SITE_METADATA.description,
  authors: [{ name: SITE_METADATA.ownerName }],
  creator: SITE_METADATA.ownerName,
  openGraph: {
    type: "website",
    locale: "en_PH",
    ...(SITE_METADATA.siteUrl ? { url: SITE_METADATA.siteUrl } : {}),
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: SITE_METADATA.ownerName,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
