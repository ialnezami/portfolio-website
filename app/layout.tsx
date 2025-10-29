import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibrahim Alnezami - AI-First Full Stack Developer",
  description: "Next-generation engineer leveraging AI as a force multiplier. Delivering production-ready code 3x faster while maintaining architecture, quality, and scalability.",
  keywords: ["AI-First Developer", "Full Stack Developer", "Next.js", "TypeScript", "AI-Assisted Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}