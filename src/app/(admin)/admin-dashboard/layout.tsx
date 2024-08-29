import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { MainNav } from "../_components/main-nav";
import { Search } from "../_components/search";
// import TeamSwitcher from "../_components/team-switcher";
import { UserNav } from "../_components/user-nav";

import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diksa",
  description: "Under development",
};

export default function AdminLayout({
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
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h4>DIKSA</h4>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <section>{children}</section>
      </body>
    </html>
  );
}
