import type {Metadata} from "next";
import {Inter, Roboto_Mono} from "next/font/google";
import "./globals.css";
import {SideBar} from "@lib/app/dashboard/components/sidebar/SideBar";
import React from "react";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" className={`${inter.variable} ${roboto_mono.variable} h-full`}>
     <body
         className={`${inter.variable} ${roboto_mono.variable} font-sans h-full bg-lightForegroundColor`}>
     {children}</body>
     </html>
  );
}
