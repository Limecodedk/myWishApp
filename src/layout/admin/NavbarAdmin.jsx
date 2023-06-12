import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarAdmin = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/admin">ADMINHome</NavLink></li>
        <li><NavLink to="/admin/createwish">Tilføj et øsnke</NavLink></li>
        <li><NavLink to="/admin/adminwishlist">Ret ønske</NavLink></li>
        <li><NavLink to="/">Public</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavbarAdmin