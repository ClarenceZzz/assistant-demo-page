import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Writer",
  description: "AI Writing Assistant Home"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
