import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { useSearchQuery } from '../../hooks/useSearchQuery'
import { currenyFormat } from '../../Utilities/currencyFormat'
import NoItem from '../../Utilities/NoItem'

const HeaderMain = ({showDpt, setShowDpt}) => {
    const [ query, setQuery ] = useState(``)
    const [ showList, setShowList ] = useState(false)

    const [sideCat, handleSideCatGET] = useGeneralGet()
    const [product, handleProductGET] = useGeneralGet()
    const [searchProduct, handleSearchProductGET] = useSearchQuery()

    const searchListRef = useRef(undefined)
    const dptCatRef = useRef(undefined)

    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setShowList(false)
    }, [pathname])



    useEffect(() => {
        const handleShow = (e) => {
            const searchList = searchListRef.current
            if (searchList != undefined && !searchList.contains(e.target)) {
                setShowList(false)
            }
        }
        document.addEventListener('click', handleShow)

        return () => {
            document.removeEventListener('click', handleShow)
        }
    }, [showList])

    useEffect(() => {
        const handleShowDpt = (e) => {
            const dptCat = dptCatRef.current
            if (dptCat != undefined && !dptCat.contains(e.target)) {
                setShowDpt(false)
            }
        }
        document.addEventListener('click', handleShowDpt)

        return () => {
            document.removeEventListener('click', handleShowDpt)
        }
    },[showDpt])

    useEffect(() => {
        handleSideCatGET(`side-menu`)
        handleProductGET('product',``,``,``,1)
    },[])

    const handleSearch = (e) => {
        setQuery(e.target.value)
        setShowList(true)
    }

    useEffect(() => {
        console.log([``,`search`, query])
        handleSearchProductGET(`product`, `/search/${query}`, 3, 1)
    }, [query])


    const handleSubmit = (e) => {
        e.preventDefault()
        let url_Str = query.replace(` `, `+`)
        query && query.length != 0 && navigate(`/search/${url_Str}/1`)
    }



  return (
    <header className='header-sticky'>
        <div className="header-main mobile-hide">
            <div className="container">
                <div className="wrapper flexitem">
                    <div className="left">
                        <div className="dpt-cat" ref={dptCatRef}>
                            <div className="dpt-head">
                                <div className="main-text">All departments</div>
                                <div className="mini-text mobile-hide">Total {product && product.count} products</div>
                                {
                                    pathname !== '/' &&
                                    <a 
                                        className="dpt-trigger mobile-hide"
                                        onClick={() => {setShowDpt(!showDpt)}}
                                    >
                                        <i className="ri-menu-3-line ri-xl"></i>
                                        
                                        <i className="ri-close-line ri-xl"></i>
                                    </a>
                                }
                            </div>
                            <div className="dpt-menu">
                                <ul className="second-link">
                                    {
                                    sideCat &&
                                    sideCat != undefined &&
                                    sideCat.map((cat) => (
                                        <li 
                                            className={cat.sub_side_menu != 0 ? `has-child` : ``}
                                            key={cat.id}
                                        >
                                            <Link to={`/menu/${cat.slug}/1`}>
                                                <div className="icon-large"><i className={`ri-${cat.logo}`}></i></div>
                                                    {cat.title} 
                                                {
                                                    cat.sub_side_menu.length >= 1 &&
                                                        <div className="icon-small">
                                                            <i className="ri-arrow-right-s-line"></i>
                                                        </div>
                                                }
                                            </Link>
                                            <ul>
                                                {   
                                                    cat?.sub_side_menu &&
                                                    cat.sub_side_menu.map(list => (
                                                        <li key={list.id}>
                                                            <Link to={`/menu/${cat.slug}/${cat.query == 'brand' ? 'b' : 'c'}/${list.slug}/1`}>{list.name}</Link>
                                                        </li> 
                                                    )) 
                                                }
                                                
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="search-box">
                            <form className='search' onSubmit={handleSubmit}>
                                <span className='icon-large'><i className="ri-search-line"></i></span>
                                <input 
                                    type="search" 
                                    placeholder='Search for products'
                                    onChange={handleSearch}
                                />
                                <button type='submit'>Search</button>
                            </form>
                            {
                                showList && 
                                    <ul className='search-list flexcol' ref={searchListRef}>
                                        {   
                                            searchProduct &&
                                            searchProduct!= undefined &&
                                            searchProduct.results != undefined &&
                                            searchProduct.results.length > 0 &&
                                            searchProduct.results
                                            .map(item => (
                                                <li key={item.id} className='flexitem'>
                                                    <img
                                                        className='thumbnail'
                                                        src={item.images[0].image} 
                                                        alt={item.title} 
                                                    />
                                                    <div>
                                                        <span className='main-link'>
                                                            <Link to={`/product/${item.slug}`}>
                                                                {item.title}
                                                            </Link>
                                                        </span>
                                                        <span className='price'>{currenyFormat(item.price)}</span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        {
                                            searchProduct &&
                                            searchProduct.count > 3 &&
                                            <li className='view-all flexitem'>
                                                <Link to={`/search/${query.replace(` `,`+`)}/1`}>
                                                    <span>See more</span>
                                                    <span className="ri-arrow-right-line"></span>
                                                </Link>
                                            </li>
                                        }
                                        {
                                            searchProduct && 
                                            (searchProduct.results == undefined ||
                                            searchProduct.results.length == 0) &&
                                                <NoItem />
                                        }
                                    </ul>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

  )
}

export default HeaderMain