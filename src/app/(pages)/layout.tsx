import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from '../_providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';



import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diksa",
  description: "Under development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>
           {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
