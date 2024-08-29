"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { noHeaderFooterUrls, inclusions } from '@/app/_constants';
import { Gutter } from '@/components/Gutter';
import ChangeTheme from '@/components/ChangeTheme';

import './style.css';

const showYear = new Date().getFullYear();

export default function FooterComponent({ footer }) {
  const navItems = footer?.navItems || []
  const pathname = usePathname();
  const style = noHeaderFooterUrls.includes(pathname) ? "hidden" : "mt-auto";

  return (
      <footer className={style}>
        <Gutter>
          <ul className="inclusions">
            {inclusions.map((inclusion, index) => (
              <li key={index}>
                <Image 
                  src={inclusion.icon}
                  alt={inclusion.title}
                  width={36}
                  height={36}
                  className="icon"
                />
                <h5>{inclusion.title}</h5>
                <p>{inclusion.description}</p>
              </li>
            ))}
          </ul>
        </Gutter>
        <div className="footer">
          <Gutter>
            <div className="wrap">
              {navItems.map((navItem, index) => (
                <Link key={index} href={navItem.url}>{navItem.label}</Link>
              ))}
            </div>
            <h4>Connect</h4>
            <div className="socialLinks">
              <Link href="/">
                <span>Facebook</span>
              </Link>
              <Link href="/">
                <span>Instagram</span>
              </Link>
              <Link href="/">
                <span>Youtube</span>
              </Link>
            </div>
            <Image src="/logo-white" alt="logo" width={170} height={50} />
          </Gutter>
          <ChangeTheme />
        </div>
        <div className="text-center text-white bg-gray-900">
          <p>&copy; 2024-{showYear} Diksa lnc. All rights reserved.</p>
        </div>
      </footer>
    )
}