import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Site Rehab STL",
    template: "%s | Site Rehab STL"
  },
  description:
    "Professional websites and digital systems for local businesses that need to look better, work better, and bring in more customers.",
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
