import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const ProductDash = () => {

  const {pathname} = useLocation()  


  return (
    <section className='product-dash'>
        <div className="dash-header flexitem">
            <h1>Product</h1>
            <div className='add'>
                
                {
                    pathname.length <=  18 &&
                    <Link to={'/dashboard/product/add'} className='flexcenter'>
                        <span>Add Product</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname.length != 18 && 
                    <Link to={'/dashboard/product?page=1'} className='flexcenter'>
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

export default ProductDash