import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import NavbarAdmin from './NavbarAdmin'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
    <>
      <HeaderAdmin />
      <NavbarAdmin />
      <main>
        <Outlet />
      </main>

    </>
  )
}

export default LayoutAdmin