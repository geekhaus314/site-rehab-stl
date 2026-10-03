import type { Metadata } from "next";

import { MotionEffects } from "@/components/motion-effects";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Web Rehab STL — get found, get chosen, get booked",
    template: "%s | Web Rehab STL",
  },
  metadataBase: new URL("https://webrehabstl.pages.dev"),
  description: "Web design and website repair for locally owned St. Louis businesses. Work directly with the person building your site, get a clear project price, and keep your domain and accounts in your name.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Web Rehab STL",
    title: "Web Rehab STL — web design for local St. Louis businesses",
    description: "Work directly with a local web developer. Clear project pricing, no agency handoffs, and a website your business owns.",
    url: "https://webrehabstl.pages.dev/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Web Rehab STL — websites that get St. Louis trades found, chosen and booked" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Rehab STL — web design for local St. Louis businesses",
    description: "Work directly with a local web developer. Clear project pricing, no agency handoffs, and a website your business owns.",
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
      <body>
        {children}
        <MotionEffects />
      </body>
    </html>
  );
}
