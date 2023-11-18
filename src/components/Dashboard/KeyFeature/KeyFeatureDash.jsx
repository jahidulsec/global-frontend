import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const KeyFeatureDash = () => {

  const {pathname} = useLocation()  


  return (
    <section className='key-feature-dash'>
        <div className="dash-header flexitem">
            <h1>Key Feature</h1>
            <div className='add'>
                
                {
                    pathname !== '/dashboard/key-feature' && 
                    <Link to={'/dashboard/key-feature'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to key feature</span>
                    </Link>
                }
            </div>
        </div>
        
        <Outlet />

    </section>
  )
}

export default KeyFeatureDash