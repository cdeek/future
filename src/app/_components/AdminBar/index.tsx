'use client'

import React, { useEffect } from 'react'

import { getMe } from '@/app/_api/getMe'
import { Gutter } from '../Gutter'
import {Button} from "../Button"


import './style.css'

export const AdminBar = ()=> {
  const [show, setShow] = React.useState(false)
  const { data: user, loading, error } = getMe()

  useEffect(() => {
    if (user) {
      setShow(true)
    }
  }, [user])

  const isAdmin = user?.roles?.includes('admin')

  if (!isAdmin) return null

  return (
    <div className={["adminBar", show && "show"].filter(Boolean).join(' ')}>
      <Gutter className="blockContainer">
        { loading ? "loading" : 
        <span>
          <h6>Dashboard</h6>
          <small>Admin: {user.name}</small>
          <span>
            <Button label="Go to Dashboard" appearance="outline" newTab={true} />
            <Button label="logout" el="button" appearance="destructive" />
          </span>
        </span>}
      </Gutter>
    </div>
  )
}
