import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const SpecificaionDash = () => {

  const {pathname} = useLocation()  


  return (
    <section className='specification-dash'>
        <div className="dash-header flexitem">
            <h1>Specification</h1>
            <div className='add'>
                
                {
                    pathname !== '/dashboard/specification' && 
                    <Link to={'/dashboard/specification'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to specification</span>
                    </Link>
                }
            </div>
        </div>
        
        <Outlet />

    </section>
  )
}

export default SpecificaionDash