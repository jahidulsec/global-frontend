import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const SideMenuDash = () => {

  const {pathname} = useLocation()  


  return (
    <section className='product-dash'>
        <div className="dash-header flexitem">
            <h1>Side Menu</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/side-menu' &&
                    <Link to={'/dashboard/side-menu/add'} className='flexcenter'>
                        <span>Add Side menu</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/side-menu' && 
                    <Link to={'/dashboard/side-menu'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to Side menu</span>
                    </Link>
                }
            </div>
        </div>
        
        <Outlet />

    </section>
  )
}

export default SideMenuDash