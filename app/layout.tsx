import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import DatadogInit from "@/components/datadog-init";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSS Project Overview",
  description: "An overview for OSS projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DatadogInit />
        <Header />
        {children}
      </body>
    </html>
  );
}
