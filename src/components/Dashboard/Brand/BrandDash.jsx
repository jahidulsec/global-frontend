import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const BrandDash = () => {

  const {pathname} = useLocation()  


  return (
    <section className='brand-dash'>
        <div className="dash-header flexitem">
            <h1>Brand</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/brand' &&
                    <Link to={'/dashboard/brand/add'} className='flexcenter'>
                        <span>Add Brand</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/brand' && 
                    <Link to={'/dashboard/brand'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to brand menu</span>
                    </Link>
                }
            </div>
        </div>
        
        <Outlet />

    </section>
  )
}

export default BrandDash