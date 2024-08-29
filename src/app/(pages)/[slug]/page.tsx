import React from 'react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Page } from '@/backend/types';
import useFetchDoc from "@/app/_api/fetchDoc";
import useFetchDocs from '@/app/_api/fetchDocs';
// import { Blocks } from '@/components/Blocks';
// import { Hero } from '@/app/components/Hero';
// import { generateMeta } from '@/app/_utilities/generateMeta';
 import StaticHome from './staticHome';

// export const dynamic = 'force-dynamic';

 export default async function PageComponent({ params: { slug = 'home' } }) {
//   const { isEnabled: isDraftMode } = draftMode();

   let page: Page | null = null;

   try {
     const { data, error, loading } = await useFetchDoc<Page>({
       collection: 'pages',
       slug,
     });
     if (error) throw new Error(error.message);
     if (loading) return <div>Loading...</div>;
     if (data) page = data;
   } catch (err) {
      console.error(err);
     // Swallow the error here and render fallback data if necessary
   }

   if (!page && slug === 'home') {
     return <StaticHome />;
   } else {
     return notFound();
   }

//   const { hero, layout } = page;

   return (
       <h1>{slug}</h1>
//     <React.Fragment>
//       <Hero {...hero} />
//       <Blocks
//         blocks={layout}
//         disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
//       />
//     </React.Fragment>
   );
 }

// export async function generateStaticParams() {
//   try {
//     const pages = await fetchDocs<Page>('pages');
//     return pages?.map(({ slug }) => ({ params: { slug } }));
//   } catch (error) {
//     return [];
//   }
// }

// export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
//   const { isEnabled: isDraftMode } = draftMode();

//   let page: Page | null = null;

//   try {
//     page = await fetchDoc<Page>({
//       collection: 'pages',
//       slug,
//       draft: isDraftMode,
//     });
//   } catch (error) {
//     // Handle error gracefully
//   }

//   if (!page && slug === 'home') {
//     page = staticHome;
//   }

//   return generateMeta({ doc: page });
// }
