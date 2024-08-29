"use client";
import { useEffect, useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from 'next/image';
import Link from 'next/link';

import './style.css';

export default function TopDeals() {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const array = [
    { image: "/logo-black.svg", href: '/', price: 109.05 },
    { image: "/logo-black.svg", href: '/', price: 1.05 },
    { image: "/logo-white.svg", href: '/', price: 7.05 },
    { image: "/logo-white.svg", href: '/', price: 19.05 },
  ];

  return (
    <section className="top-deals">
      {!display ? (
        <div className="welcome">
          <span className="text-blue-200">W</span>
          <span className="text-green-200">E</span>
          <span className="text-indigo-200">L</span>
          <span className="text-red-200">C</span>
          <span className="text-blue-800">O</span>
          <span className="text-indigo-600">M</span>
          <span className="text-green-600">E</span>
          <span className="">.</span>
          <span className="">.</span>
        </div>
      ) : (
        <ScrollArea className="flex mt-8">
          <div className="flex w-full">
            {['Electronics', 'Clothing', 'UsedItems', 'Accessories', 'Phones', 'Sneakers'].map(category => (
              <Link key={category} className="p-2 mx-2 rounded-lg border-gray-600 border-2" href="/">
                {category}
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
      <div className="con">
        <h1 className="p-2 text-2xl text-left">Top Deals</h1>
        <div className="card-con">
          {array.map((i, index) => (
            <Link key={index} href={i.href} className="card">
              <Image className="w-full h-[150px] md:h-[300px]" width={500} height={300} src={i.image} alt="img" />
              <p className="p-2 text-lg">
                <b>₦{i.price}</b>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
