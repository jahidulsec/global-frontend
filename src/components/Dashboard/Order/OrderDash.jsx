import { Link, Outlet, useLocation } from 'react-router-dom'


const OrderDash = () => {

    const {pathname} = useLocation()  


  return (
    <section className='order-dash'>
        <div className="dash-header flexitem">
            <h1>Order</h1>
            <div className='add'>
                {
                    pathname !== '/dashboard/order' && 
                    <Link to={'/dashboard/order'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to order menu</span>
                    </Link>
                }
            </div>
        </div>
        
        <Outlet />

    </section>
  )
}

export default OrderDash