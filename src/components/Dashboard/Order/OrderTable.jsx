import React, { useEffect, useState } from 'react'
import { MdContentPasteOff } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import { ToDateFormat } from '../../../Utilities/ToDateFormat'
import OrderStatus from '../../../Utilities/OrderStatus'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'
import { currenyFormat } from '../../../Utilities/currencyFormat'


const OrderTable = () => {
    const {auth} = useAuthContext()

    const [response, handleOrder] = useGeneralGet()
    const [delStatus, handleDelOrder] = useGeneralDEL()

    useEffect(() => {

        handleOrder(`order`,``,``,``,``,``,auth)
        window.scrollTo(0,0)
        
    },[delStatus, auth])


  return (

    <>
    
    <DelStatus delStatus={delStatus} />

    <div className="dash-table__container">

        <table className="dash-table">
            <thead>
                <tr>
                    <th>Invoice Id</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    response && response.length !== 0 &&
                    response.map(item => (

                        <tr key={item.id} id={item.id}>
                            <td>
                                <Link to={`/dashboard/order/${item.id}`}>
                                    <span>
                                        {item.slug}
                                    </span>
                                </Link>
                            </td>
                            <td data-label='User'>{item.user}</td>
                            <td data-label='Date'>{ToDateFormat(item.date)}</td>
                            <td data-label='Status'>
                                <OrderStatus status={item.status} />    
                            </td>
                            <td data-label='Total'>{currenyFormat(item.total)}</td>
                            <td data-label='Delete'>
                                <ButtonClose onClick={() => {handleDelOrder(`order`, item.id, auth)}} />
                            </td>
                        </tr>
                    ))                 
                }
                
            </tbody>
        </table> 
    </div>

    {
        response && response.length == 0 &&
        <NoItem />
    }


    </>

  )
}

export default OrderTable