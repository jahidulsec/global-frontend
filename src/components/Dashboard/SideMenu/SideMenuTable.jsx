import React, { useEffect, useState } from 'react'
import { MdContentPasteOff } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'


const SideMenuTable = () => {

    const [response, handleSideMenu] = useGeneralGet()
    const [delStatus, handleDelSideMenu] = useGeneralDEL()

    const { auth } = useAuthContext()


    useEffect(() => {

        handleSideMenu(`side-menu`)
        
    },[delStatus])


  return (

    <>

    <DelStatus delStatus={delStatus} />
    <div className="dash-table__container">

        <table className="dash-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    response && response.length !== 0 &&
                    response.map(item => (

                        <tr key={item.id} id={item.id}>
                            <td>
                                <Link className='flexitem gap-1' to={`/dashboard/side-menu/edit/${item.slug}`}>
                                    <span className={`ri-${item?.logo}`}></span>
                                    <span>{item.title}</span>
                                </Link>
                            </td>
                            <td data-label='Delete'>
                                <ButtonClose onClick={() => {handleDelSideMenu(`side-menu`, item.id, auth)}} />
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table> 
    </div>
    {response && response.length == 0 && <NoItem />}

    </>

  )
}

export default SideMenuTable