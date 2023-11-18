import React, { useEffect, useState } from 'react'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import DelStatus from '../../../Utilities/DelStatus'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import { MdContentPasteOff } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import ButtonClose from '../../../Utilities/ButtonClose'
import { useAuthContext } from '../../../context/AuthContext'
import { currenyFormat } from '../../../Utilities/currencyFormat'

const OrderSingleUserDash = () => {
    const {auth} = useAuthContext()
  
    const [orderRes, handleOrderGET] = useGeneralGet()
    const [delStatus, handleOrderItemDEL] = useGeneralDEL() 

    const {id} = useParams()

    useEffect(() => {
       
        handleOrderGET(`order`,id, ``,``,``,``, auth)
        window.scrollTo(0,0)

    }, [delStatus, auth])
  
    return (
        <section>
            <DelStatus delStatus={delStatus} />
        
            <div className="order-header">
                <h1>Contact Info</h1>
                <h2>{orderRes && orderRes?.user}</h2>
                <p>Order date: <span>{`${(orderRes?.date)}`}</span></p>
                <p>Address: <span>{`${orderRes?.street_address}, ${orderRes?.district}, ${orderRes?.division}`}</span></p>
                <p>Payment method: <span>{orderRes?.payment_method}</span></p>
                <p>Contact: <span>{orderRes?.phone}</span></p>
            </div>

            <table className='dash-table'>
                <thead>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Price</th>
                    <th>Delete</th>
                </thead>
                <tbody>
                    {
                        orderRes && orderRes.orders ?
                        orderRes.orders.map(item => (
                            <tr key={item.id}>
                                <td >{item.product}</td>
                                <td data-label={'Quantity'} >{item.quantity}</td>
                                <td data-label={'Unit Price'} >{currenyFormat(item.unit_price)}</td>
                                <td data-label={'Price'} >{currenyFormat(item.price)}</td>
                                <td data-label='Delete' >
                                    <ButtonClose onClick={() => {handleOrderItemDEL(`single-order`, item.id, auth)}} />
                                </td>
                            </tr>
                        )) :
                        <tr>
                            <td className='no-item flexcenter' >
                                <MdContentPasteOff />
                                <p>No item to show!</p>
                            </td>
                        </tr> 
                    }
                </tbody>
            </table>
        </section>
    )
}

export default OrderSingleUserDash