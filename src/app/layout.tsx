import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Sidenav from "@/components/sidenav";
import Header from "@/components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SnapStash",
  description: "Host and share photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="border-b ">
          <Header />
        </div>
        <div className="flex">
          <Sidenav />
          <div className="w-full pt-12 px-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
