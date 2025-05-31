import React from 'react'
import { Link } from 'react-router-dom'

const HeaderAdminPage = () => {
  return (
    <div>
      <header>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/product">Product</Link>
          </li>
          <li>
            <Link to="/admin/category">Category</Link>
          </li>
          <li>
            <Link to="/admin/order">Order</Link>
          </li>
          <li>
            <Link to="/admin/user">User</Link>
          </li>
          <li>
            <Link to="/admin/setting">Setting</Link>
          </li>
          
        </ul>
      </header>
    </div>
  )
}

export default HeaderAdminPage