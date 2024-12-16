import { Suspense } from 'react';
// import LoadingSmall from "@/app/_components/loading";
import Image from 'next/image';
import SlideShow from './slideShow';
import TopDeals from './topDeals';
import Categories from './exploreSomeCategories';
// import Recommends from './recommends';
import QuoteMachine from '@/app/_components/QuoteGenerator';


export default function StaticHome() {
  return (
    <main>
      <SlideShow  />
      <TopDeals />
      <Categories />
      {/*
      <Recommends  />
      <Suspense fallback={<LoadingSmall />}>
        <Products />
      </Suspense>
      <Suspense fallback={<LoadingSmall />}>
        <ProductsGrid />
      </Suspense>
       */}
      <QuoteMachine />
    </main>
  )
}
