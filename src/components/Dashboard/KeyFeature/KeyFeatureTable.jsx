import React, { useEffect, useState } from 'react'
import { MdContentPasteOff } from 'react-icons/md'
import { Link, useSearchParams } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import ItemPerShowDrop from '../../../Utilities/ItemPerShowDrop'
import PaginationProduct from '../../../Utilities/PaginationProduct'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import DelStatus from '../../../Utilities/DelStatus'
import ButtonClose from '../../../Utilities/ButtonClose'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'


const KeyFeatureTable = () => {
    const {auth} = useAuthContext()

    const [searchQuery, setSearchQuery] = useSearchParams()

    const [size, setSize] = useState(3)
    const [page, setPage] = useState(parseInt(searchQuery.get('page')))

    const [response, handleKeyFeature] = useGeneralGet()
    const [delStatus, handleKeyFeatureDEL] = useGeneralDEL()

        
    
    useEffect(() => {
        const query = Object.fromEntries([...searchQuery])
        query.page = parseInt(page)
        setSearchQuery(query)
    }, [page])

    useEffect(() => {
        handleKeyFeature(`product`,``,`-id`, searchQuery.get(`page`), size)
        window.scrollTo(0,0)
    },[searchQuery, delStatus, page, size])




  return (
    <>
    <ItemPerShowDrop 
        perPage={size}
        setPerPage={setSize}
    />

    <DelStatus delStatus={delStatus} />

    <div className="dash-table__container">

        <table className="dash-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Thumbnail</th>
                    <th>#Key Features</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    response && response?.results.length !== 0 &&
                    response?.results.map(item => (

                        <tr key={item.id} id={item.id}>
                            <td >
                                <Link to={`/dashboard/key-feature/edit/${item.id}`}>
                                    <span>
                                        {item.title}
                                    </span>
                                </Link>
                            </td>
                            <td data-label='Thumbnail'>
                                <img className='thumbnail' src={item.images[0].image} alt={item.title} loading='lazy' />
                            </td>
                            <td data-label='#Key Features'>
                                <ul>
                                {
                                    item.key_features.length != 0 ?
                                    item?.key_features.map(feature => (
                                        <li 
                                            key={feature.field_name}
                                            className='medium-text'
                                        >
                                            {feature.field_name}
                                        </li>
                                    ))
                                    :
                                    <span className='medium-text'>No features been added</span>
                                }
                                </ul>

                            </td>
                            <td data-label='Delete'>
                                <ButtonClose onClick={() => {handleKeyFeatureDEL(`feature`, item.id, auth)}} />
                            </td>
                        </tr>
                    )) 
                }
                
            </tbody>
        </table> 
    </div>

    {response && response.results.length == 0 && <NoItem />}

    <PaginationProduct 
        response={response}
        page={page}
        setPage={setPage}
        size={size}
    />
    
    </>
    
  )
}

export default KeyFeatureTable