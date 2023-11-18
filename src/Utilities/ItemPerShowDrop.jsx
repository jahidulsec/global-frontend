import React, { useEffect, useState } from 'react'

const ItemPerShowDrop = ({perPage, setPerPage}) => {

    const [defaultPerPage, setDefaultPerPage] = useState()

    useEffect(() => {
        setDefaultPerPage(perPage)
    }, [])


  return (
    <div className="item-show flexitem">
        <div className="item-perpage mobile-hide">
            <div className="label">Items {perPage} per page</div>
            <div className="desktop-hide">{perPage}</div>
        </div>

        <div className="item-options">
            <div className="label">
                <span className="mobile-hide">{defaultPerPage == perPage ? 'Set by Default' : perPage}</span>
                <div className="desktop-hide">{defaultPerPage == perPage ? 'Default' : perPage}</div>
                <i className="ri-arrow-down-s-line"></i>
            </div>
            <ul onClick={(e) => {
                setPerPage(e.target.value)
            }}>
                <li value={10}>10</li>
                <li value={20}>20</li>
                <li value={30}>30</li>
            </ul>
        </div>
    </div>
  )
}

export default ItemPerShowDrop