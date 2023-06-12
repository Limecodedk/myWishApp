import React from 'react'
import { NavLink } from 'react-router-dom'
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Hjem</NavLink></li>
        <li><NavLink to="/wishlist">Ønskeliste</NavLink></li>
        <li><NavLink to="/admin">Min konto <CiUser /></NavLink></li>
      </ul>
    </nav >
  )
}

export default Navbar