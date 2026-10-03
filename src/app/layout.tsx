import type { Metadata } from "next";

import { MotionEffects } from "@/components/motion-effects";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Web Rehab STL — get found, get chosen, get booked",
    template: "%s | Web Rehab STL",
  },
  metadataBase: new URL("https://webrehabstl.pages.dev"),
  description: "Web design and website repair for owner-run St. Louis businesses. Get a capable website without another job on your list: one direct contact, clear scope and project pricing, and a process built around your schedule.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Web Rehab STL",
    title: "Web Rehab STL — websites handled for busy local businesses",
    description: "A local web partner for busy St. Louis small businesses. Direct contact, clear project pricing, and a simple process built around your schedule.",
    url: "https://webrehabstl.pages.dev/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Web Rehab STL — a local web partner for busy St. Louis business owners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Rehab STL — websites handled for busy local businesses",
    description: "A local web partner for busy St. Louis small businesses. Direct contact, clear project pricing, and a simple process built around your schedule.",
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
