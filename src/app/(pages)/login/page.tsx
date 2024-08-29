import React from 'react'
import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"



//import { RenderParams } from '../../_components/RenderParams'
//import { getMeUser } from '../../_utilities/getMeUser'
//import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LoginForm from './loginForm'

import './style.css';

export default async function Login() {
  // await getMeUser({
  //   validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  // })

  return (
    <section className="login">
      <div className="heroImg">
        <Link href="/">
          <Image 
            src="/logo.svg"
            alt="logo"
            width={250}
            height={23}
            className="logo"
          />
        </Link>
      </div>

      <div className="formWrapper">
        {/* <RenderParams className="params" /> */}
        <LoginForm />
      </div>
    </section>
  )
}

// export const metadata: Metadata = {
//   title: 'Login',
//   description: 'Login or create an account to get started.',
//   openGraph: mergeOpenGraph({
//     title: 'Login',
//     url: '/login',
//   }),
// }
