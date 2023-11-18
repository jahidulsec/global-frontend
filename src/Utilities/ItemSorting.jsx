import React, { useEffect, useState } from 'react'

const ItemSorting = ({sorting, setSorting}) => {

    const [defaultSorting, setDefaultSorting] = useState()

    useEffect(() => {
        setDefaultSorting(sorting)
    }, [])


  return (
    <div className="item-show flexitem">

        <div className="item-options">
            <div className="label">
                <span className="mobile-hide">{defaultSorting == sorting ? 'Sort by Latest' : sorting}</span>
                <div className="desktop-hide">{defaultSorting == sorting ? 'Latest' : sorting}</div>
                <i className="ri-arrow-down-s-line"></i>
            </div>
            <ul onClick={(e) => {
                setSorting([e.target])
            }}>
                <li id='-id'>Latest</li>
                <li id='id'>Old to Latest</li>
                <li id='price'>Price (low to high)</li>
                <li id='-price'>Price (high to low)</li>
            </ul>
        </div>
    </div>
  )
}

export default ItemSorting