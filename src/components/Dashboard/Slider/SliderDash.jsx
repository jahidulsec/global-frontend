import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const SliderDash = () => {

  const {pathname} = useLocation()  


  return (
    <section className='slider-dash'>
        <div className="dash-header flexitem">
            <h1>Slider</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/slider' &&
                    <Link to={'/dashboard/slider/add'} className='flexcenter'>
                        <span>Add slider</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/slider' && 
                    <Link to={'/dashboard/slider'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to slider menu</span>
                    </Link>
                }
            </div>
        </div>
        
        <Outlet />

    </section>
  )
}

export default SliderDash