import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'


const SliderTable = () => {
    const {auth} = useAuthContext()

    const [response, handleSlider] = useGeneralGet()
    const [delStatus, handleDelSlider] = useGeneralDEL()

   
    useEffect(() => {
        
        handleSlider(`slider`)
        
    },[delStatus])


  return (
    <>
    <div className="dash-table__container">
        <table className="dash-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Slider Image</th>
                    <th>Mini Text</th>
                    <th>Middle Text</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    response && response.length !== 0 &&
                    response.map(item => (

                        <tr key={item.id} id={item.id}>
                            <td>
                                <Link to={`/dashboard/slider/edit/${item.id}`}>
                                    <span>{item.product.title}</span>
                                </Link>
                            </td>
                            <td data-label='Slider Image'>
                                <img className='thumbnail' src={item.image} alt={item.product} />
                            </td>
                            <td data-label='Mini Text'>
                                {item.mini_text}
                            </td>
                            <td data-label='Middle Text'>
                                {item.mid_text}
                            </td>
                            <td data-label='Delete'>
                                <ButtonClose onClick={() => {handleDelSlider(`slider`, item.id, auth)}} />
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table> 
    </div>
    
    { response && response.length == 0 && <NoItem />}
    
    </>
  )
}

export default SliderTable