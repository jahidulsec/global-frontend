import React, { useEffect, useState } from 'react'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { useGeneralDEL } from '../../hooks/useGeneralDEL'
import { Link } from 'react-router-dom'
import { ToDateFormat } from '../../Utilities/ToDateFormat'
import OrderStatus from '../../Utilities/OrderStatus'
import ButtonClose from '../../Utilities/ButtonClose'
import { useAuthContext } from '../../context/AuthContext'
import NoItem from '../../Utilities/NoItem'
import { currenyFormat } from '../../Utilities/currencyFormat'

const ProfileOrder = () => {
  
    const [orderRes, handleOrderGET] = useGeneralGet()
    const [delStatus, handleOrderItemDEL] = useGeneralDEL() 

    const {auth} = useAuthContext()

    useEffect(() => {
    
        handleOrderGET(`order`,``,``,``,``,``, auth)

    }, [delStatus, auth])


  return (
    <section className='profile-order box-shadow'>
        <h3>Personal Order</h3>   
        <table>
            <thead>
                <tr>
                    <th>Invoice Id</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderRes && orderRes.length !== 0 &&
                    orderRes.map(item => (

                        <tr key={item.id} id={item.id}>
                            <td data-label='Invoice ID'>
                                {/* <Link to={`/dashboard/order/${item.id}`}> */}
                                    <span>
                                        {item.slug}
                                    </span>
                                {/* </Link> */}
                            </td>
                            <td data-label='Date'>{ToDateFormat(item.date)}</td>
                            <td data-label='Status'>
                                <OrderStatus status={item.status} />    
                            </td>
                            <td data-label='Total'>{currenyFormat(item.total)}</td>
                            <td data-label='Delete'>
                                <ButtonClose onClick={() => {handleOrderItemDEL(`order`, item.id, auth)}} />
                            </td>
                        </tr>
                    )) 
                    
                }
                
            </tbody>
        </table> 

        {
            orderRes && orderRes.length == 0 &&
            <NoItem />
        }
    </section>
  )
}

export default ProfileOrder