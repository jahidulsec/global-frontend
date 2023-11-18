import React, { useEffect, useState } from 'react'
import { MdContentPasteOff } from 'react-icons/md'
import { Link, useSearchParams } from 'react-router-dom'
import StockStatus from '../../../Utilities/StockStatus'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import ItemPerShowDrop from '../../../Utilities/ItemPerShowDrop'
import PaginationProduct from '../../../Utilities/PaginationProduct'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'
import NoItem from '../../../Utilities/NoItem'
import { currenyFormat } from '../../../Utilities/currencyFormat'



const ProductTable = () => {
    const [searchQuery, setSearchQuery] = useSearchParams()

    const [size, setSize] = useState(3)
    const [page, setPage] = useState(parseInt(searchQuery.get('page')))

    const {auth} = useAuthContext()


    const [response, handleGet] = useGeneralGet()
    const [delStatus, handleDelProduct] = useGeneralDEL()


    useEffect(() => {
        const query = Object.fromEntries([...searchQuery])
        query.page = parseInt(page)
        setSearchQuery(query)
    }, [page])

    useEffect(() => {
        handleGet(`product`,``,`-id`, searchQuery.get(`page`), size)
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

            <table className="dash-table product">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Thumbnail</th>
                        <th>Category</th>
                        <th>Current Price</th>
                        <th>Stock Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                    response && response?.results.length !== 0 &&
                        response.results.map(item => (

                            <tr key={item.id} id={item.id}>
                                <td>
                                    <Link to={`/dashboard/product/edit/${item.slug}`}>
                                        <span>{item.title}</span>
                                    </Link>
                                </td>
                                <td data-label='Thumbnail'>
                                    <img className='thumbnail' src={item.images[0].image} alt={item.title} loading='lazy' />
                                </td>
                                <td data-label='Category'>{item.category.title}</td>
                                <td data-label='Current Price'>{currenyFormat(item.price)}</td>
                                <td data-label='Stock Status'>
                                    <StockStatus stock={item.is_stock}/> 
                                </td>
                                <td data-label='Delete'>
                                    <ButtonClose onClick={() => {handleDelProduct(`product`, item.slug, auth)}} />
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

export default ProductTable