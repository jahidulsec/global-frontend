import React, { useEffect, useState } from 'react'
import CardBox from './CardBox'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { ToDateFormat } from '../../Utilities/ToDateFormat'
import OrderStatus from '../../Utilities/OrderStatus'
import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import NoItem from '../../Utilities/NoItem'
import { currenyFormat } from '../../Utilities/currencyFormat'

const DashboardDash = () => {
    const {auth} = useAuthContext()

    const [order,handleOrderGET] = useGeneralGet()


    useEffect(() => {
        
        handleOrderGET(`order`,``,``,``,``,``,auth, `0`)
        console.log(order)
        window.scrollTo(0,0)

    },[auth])


  return (
    <section className="dashboard-section">
        <CardBox />
        <div className="dash-table-box box-shadow">
            <h1>Recent Order</h1>
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order && 
                        order.map(item => (

                        <tr key={item.id}>
                            <td>
                                <Link to={`/dashboard/order/${item.id}`}>
                                    <span>
                                        {item.user}
                                    </span>
                                </Link>
                            </td>
                            <td data-label='Date'>{ToDateFormat(item.date)}</td>
                            <td data-label='Status'>
                                <OrderStatus status={item.status} />
                            </td>
                            <td data-label='Subtotal'>{currenyFormat(item.total)}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            {
                order && order.length == 0 && <NoItem />
            }
        </div>
    </section>
  )
}

export default DashboardDash