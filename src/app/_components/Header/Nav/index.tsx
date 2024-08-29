'use client';

import React from 'react';
import Link from 'next/link';

import { useAuth } from "@/app/_providers/Auth";


export default function HeaderNav({ header }) {
  const navItems = header?.navItems || []
  const { token } = useAuth()

  return (
    <nav className="navLink">
      {navItems.map((link, i) => {
        return <Link key={i} href={link.url}>{link.label}</Link>
      })}
    </nav>
  )
}
