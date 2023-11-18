import React, { useEffect, useState } from 'react'
import { AiOutlineDesktop, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const CardBox = () => {
    const {auth} = useAuthContext()

    const [product, handleProductGET] = useGeneralGet()
    const [order, handleOrderGET] = useGeneralGet()


    useEffect(() => {
        handleProductGET(`product`,``,``,1,1)
        handleOrderGET(`order`,``,``,1,1,``,auth,`0`)
        window.scrollTo(0,0)

    },[auth])


  return (
    <div className="card-box flexwrap">
        {/* total product */}
        <Link to={`/dashboard/product`} className="card">
            <div>
                <div className="numbers">{product?.count}</div>
                <div className="card-name">Products</div>
            </div>
            <AiOutlineDesktop />
        </Link>

        {/* total user */}
        {/* <div className="card">
            <div>
                <div className="numbers">10</div>
                <div className="card-name">Users</div>
            </div>
            <AiOutlineUser />
        </div> */}

        {/* recent order */}
        <Link to={`/dashboard/order`} className="card">
            <div>
                <div className="numbers">{order?.count ? order?.count : 0}</div>
                <div className="card-name">Pending Order</div>
            </div>
            <AiOutlineShoppingCart />
        </Link>
    </div>
  )
}

export default CardBox