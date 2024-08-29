import React from 'react';
import Link from 'next/link';

//import { Header } from '@/backend/types';
import { useFetchHeader } from '@/app/_api/fetchGlobals';
import HeaderComponent from './HeaderComponent';

export default async function Header() {
  let header: any | null = null

  try {
    header = await useFetchHeader()
  } catch (error) {
   console.error(error)
  }

  return <HeaderComponent header={header?.data} />
}
