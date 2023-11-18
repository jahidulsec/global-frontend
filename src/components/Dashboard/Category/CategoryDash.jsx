import { Link, Outlet, useLocation } from 'react-router-dom'


const CategoryDash = () => {

    const {pathname} = useLocation()  


  return (
    <section className='category-dash'>
        <div className="dash-header flexitem">
            <h1>Category</h1>
            <div className='add'>
                {
                    pathname === '/dashboard/category' &&
                    <Link to={'/dashboard/category/add'} className='flexcenter'>
                        <span>Add Category</span>
                        <span className={`ri-arrow-right-line`}></span>
                    </Link>
                }
                {
                    pathname !== '/dashboard/category' && 
                    <Link to={'/dashboard/category'} className='flexcenter'>
                        <span className={`ri-arrow-left-line`}></span>
                        <span>Go to category menu</span>
                    </Link>
                }
            </div>
        </div>
        
        <Outlet />

    </section>
  )
}

export default CategoryDash