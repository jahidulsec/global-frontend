import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

const Topbar = ({toggle, setToggle}) => {
  return (
    <div className="topbar flexcenter">
        <div 
            className="toggle" 
            onClick={() => {
                setToggle(!toggle)
            }}
        >
            <AiOutlineMenu />
        </div>
        <div className="search-box">
            <form className='search'>
                <span className='icon-large'><i className="ri-search-line"></i></span>
                <input type="search" placeholder='Search for products' />
                <button type='submit'>Search</button>
            </form>
        </div>
    </div>
  )
}

export default Topbar