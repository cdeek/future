'use client';

import { Fragment, useEffect, useState, useRef } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

//import { useCart } from '@/app/_providers/Cart';
import { getMe } from '@/app/_api/getMe';
import Search from './searchInput';
import HeaderNav from '../Nav';
import SideNav from '../Nav/sideNav';
import { noHeaderFooterUrls } from '@/app/_constants';
import { Gutter } from "../../Gutter";




import './style.css';


export default function HeaderComponent({ header }) {
 // const { cart } = useCart();
  const { data: user } = getMe();
  const [length, setLength] = useState<number>();

  // useEffect(() => {
  //   setLength(cart?.items?.length || 0)
  // }, [cart]);

  let welcomeText: string = user?.name;
  // useEffect(() => {

  // },[]);
  const pathname = usePathname();
  const sideNav = useRef<HTMLElement>(null);
  const menuBar = useRef<HTMLButtonElement>(null);

  const show = () => {
    if (menuBar.current && sideNav.current) {
      menuBar.current.style.display = "none";
      sideNav.current.style.width = "70%";
    }
  };

  const close = () => {
    if (sideNav.current && menuBar.current) {
      sideNav.current.style.width = "0";
      menuBar.current.style.display = "block";
    }
  };

  return(
      <header className={noHeaderFooterUrls.includes(pathname) ? "hidden" : "header"}>
        <div className="w-full flex justify-between p-1 items-center sm:mx-0 nav">
          <div className="inline-flex">
            <button ref={menuBar} className="sm:hidden" onClick={show}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <Link href="/"><Image src="/logo-white.svg" alt="logo" width={170} height={50} /></Link>
          </div>

          <Search className="hidden sm:inline" />
          {user ? 
            <Link href="/account">
              <span className="mr-1 h-6 w-6 inline my-2">{welcomeText}></span>
              <User className="h-6 w-6 inline" />
            </Link>
            :
            <Link href="/login">
              <span className="mr-1 h-6 w-6 inline my-2"><small>login</small> ></span>
              <User className="h-6 w-6 inline" />
            </Link>
          }

          <Link className="" href="/cart">
            <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 576 512" className="ml-2">
              <path fill="#e6e4e4" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
            <small className="quantity">({length})</small>
          </Link>
        </div>
        <Search className="sm:hidden" />
        <HeaderNav header={header} />
        <SideNav sideNav={sideNav} close={close} />
      </header>
    )
}