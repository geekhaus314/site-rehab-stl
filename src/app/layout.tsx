import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Web Rehab STL — get found, get chosen, get booked",
    template: "%s | Web Rehab STL",
  },
  metadataBase: new URL("https://webrehabstl.pages.dev"),
  description: "Websites for St. Louis trades that get you found when people search, chosen over the other quotes, and booked while you work. From $1,200, days not months, no monthly fee.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Web Rehab STL",
    title: "Web Rehab STL — get found, get chosen, get booked in St. Louis",
    description: "Websites for St. Louis trades. From $1,200, days not months, no monthly fee.",
    url: "https://webrehabstl.pages.dev/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Web Rehab STL — websites that get St. Louis trades found, chosen and booked" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Rehab STL — get found, get chosen, get booked in St. Louis",
    description: "Websites for St. Louis trades. From $1,200, days not months, no monthly fee.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
