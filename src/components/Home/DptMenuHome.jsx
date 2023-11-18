import React, { useEffect } from 'react'
import { topMenu } from '../../data'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const DptMenuHome = () => {
    const [sideCat, handleSideCatGET] = useGeneralGet()


    useEffect(() => {
        handleSideCatGET(`side-menu`)
    },[])

  return (
    <div className='container'>
        <div className="dpt-menu-home mobile-hide">
            <ul className="second-link">
                {
                sideCat &&
                sideCat != undefined &&
                sideCat.map((cat) => (
                    <li 
                        className='menu'
                        key={cat.id}
                    >
                        <Link to={`/menu/${cat.slug}/1`}>
                            <div className="icon-large"><i className={`ri-${cat.logo}`}></i></div>
                                {cat.title} 
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default DptMenuHome