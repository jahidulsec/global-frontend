import React, { useEffect } from 'react'
import { topMenu } from '../../data'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const DptMenuHome = () => {
    const [sideCat, handleSideCatGET, loading] = useGeneralGet()


    useEffect(() => {
        handleSideCatGET(`side-menu`)
    },[])

  return (
    <div className='container'>
        <div className="dpt-menu-home mobile-hide">
            <ul className="second-link">
                {
                !loading &&
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
                {
                    loading && <span className='loading'></span>

                }
            </ul>
        </div>
    </div>
  )
}

export default DptMenuHome