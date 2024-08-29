import React from 'react';

//import { Footer } from '@/backend/types';
import { useFetchFooter, useFetchGlobals } from '@/app/_api/fetchGlobals';
import FooterComponent from './footerComponent';


export default async function Footer() {
  let footer: any | null = null

  try {
    footer = await useFetchFooter()
  } catch (error) {
     console.error(error)
  }

  return <FooterComponent footer={footer?.data} />
}
