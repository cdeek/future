"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="my-4">The page you are looking for at <code>{pathname}</code> does not exist.</p>
      <Button href="/" label="Go Home" appearance="default" />
    </div>
  );
}

import { Button } from '@/components/Button'

