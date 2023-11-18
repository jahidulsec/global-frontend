import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGeneralGet } from '../../hooks/useGeneralGet'


const SideNav = ({setShowMenu}) => {

    const [sideCat, handleSideCatGET] = useGeneralGet()
    const [active, setActive] = useState('')


    useEffect(() => {

        // show sub menu on mobile
            const submenu = document.querySelectorAll('.has-child .sub-menu-link')

            function toggle (e) {
            e.preventDefault()
            submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null)
            if (this.closest('.has-child').classList != 'expand') {
                this.closest('.has-child').classList.toggle('expand')
            }
            }
            
            
            submenu.forEach((menu) => menu.addEventListener('click', toggle))

            
        },[sideCat])

        useEffect(() => {
            handleSideCatGET(`side-menu`)
        }, [])
        
   

    

  return (
    
    // Mobile menu
    <aside className="side-off desktop-hide">
        <div className="off-canvus">
            <div className="canvus-head flexitem">
            <div className="logo">
                <Link to={`/`}>
                    <img src="/global_logo_big_bnw.png" alt="global_logo" loading='lazy'/>
                </Link>
            </div>
            <button 
                onClick={() => {setShowMenu(false)}}
                className="t-close flexcenter"
            >
                <span className="ri-close-line"></span>
            </button>
            </div>
            <div className="departments">
                <div className="dpt-head">
                    <div className="main-text">All departments</div>
                </div>
                <div className="dpt-menu">
                    <ul className="second-link">
                        {
                        sideCat &&
                        sideCat != undefined &&
                        sideCat.map((cat) => (
                            <li 
                                className={cat?.sub_side_menu.length > 1 ? `has-child` : ``}
                                key={cat.id}
                            >
                                <a className='sub-menu-link'>
                                    <div className="icon-large"><i className={`ri-${cat.logo}`}></i></div>
                                        {cat.title} 
                                    {
                                        cat.sub_side_menu.length > 1 &&
                                            <div className="icon-small">
                                                <i className="ri-arrow-right-s-line"></i>
                                            </div>
                                    }
                                </a>
                                <ul>
                                    {   
                                        cat?.sub_side_menu &&
                                        cat.sub_side_menu.map(list => (
                                            <li key={list.id} onClick={() => {setShowMenu(false)}}>
                                                <Link to={`/menu/${cat.slug}/${cat.query == 'brand' ? 'b' : 'c'}/${list.slug}/1`}>{list.name}</Link>
                                            </li> 
                                        )) 
                                    }
                                    
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </aside>
  )
}

export default SideNav