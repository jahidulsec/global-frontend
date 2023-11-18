import { useEffect, useState } from 'react'
import FilterBlock from '../components/CatPage/FilterBlock'
import FeaturedCard from '../components/Home/FeaturedCard'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { filter } from '../data'
import { toTitleCase } from '../Utilities/toTitleCase'
import { Helmet } from 'react-helmet'
import PaginationProduct from '../Utilities/PaginationProduct'
import { useSearchQuery } from '../hooks/useSearchQuery'
import NoItem from '../Utilities/NoItem'
import DoubleRangeInput from '../Utilities/DoubleRangeInput'

const CatPage = () => {
    const [filterShow, setFilterShow] = useState(false)
    const [cat, setCat] = useState([])
    const {pathname} = useLocation()
    const {page} = useParams()
    const navigation = useNavigate()

    const [size, setSize] = useState(9)
    const [pageNumber, setPageNumber] = useState(1)
    const [order, setOrder] = useState(``)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)

    const [searchProduct, handleSearchProductGET] = useSearchQuery()
    const [minProduct, handleMinProductGET] = useSearchQuery()
    const [maxProduct, handleMaxProductGET] = useSearchQuery()


    useEffect(() => {
        let path = pathname.split(`/`)

        setCat(pathname.split(`/`))

        if (parseInt(page) !== pageNumber && path.length == 3) {
            navigation(`/${path[1]}/${pageNumber}`)
        }

        if (parseInt(page) !== pageNumber && path.length == 4) {
            navigation(`/${path[1]}/${path[2]}/${pageNumber}`)
        }

        if (parseInt(page) !== pageNumber && path.length == 5) {
            navigation(`/${path[1]}/${path[2]}/${path[3]}/${pageNumber}`)
        }

    }, [pageNumber, pathname])


    


    useEffect(() => {
        handleMaxProductGET(`product`, pathname, 1, 1, ``, `-price`)    // api_url_name, arr_path, size, page
        handleMinProductGET(`product`, pathname, 1, 1, ``, `price`)     // api_url_name, arr_path, size, page
        handleSearchProductGET(`product`, pathname, size, page, ``, order, minPrice, maxPrice)     // api_url_name, arr_path, size, page
        window.scrollTo(0,0)
    },[pathname, size, order, minPrice, maxPrice])


  return (
    <>
    {
        cat &&
        cat.length != 0 &&
        <Helmet>
            <title>{cat[1] == 'search'? `Search` : cat.length == 3 ? toTitleCase(cat[1]) : toTitleCase(cat[2])} | Global Computer (BD)</title>
            <meta property="'description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
            <meta property="'keywords" content="Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, CC camera, CCTV, Global Computer (BD), computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, hp, apple, asus, bangladesh, boya, brother, cable, GPU, graphics card" />
            <meta property="'og:title" content="Global Computer (BD)" />
            <meta property="og:image" content="/global_mini_logo.png" />
            <meta property="og:url" content="https://globalcomputer.com.bd/" />
            <meta property="og:description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
        </Helmet>
    }
    <section className='cat-page'>
        <div className={`single-category ${filterShow && `show-filter`}`}>
            <div className="container">
                <div className="wrapper">
                    <div className="column">
                        <div className="holder">
                            <div className="row sidebar">
                                <div 
                                    className={`filter ${filterShow ? 'show':''}`}
                                >

                                    <div className="filter-block pricing">
                                        <h4>Price Range</h4>
                                        {
                                            minProduct && maxProduct &&
                                            minProduct.results.length !=0 && maxProduct.results.length !=0 && 
                                            <div className="price-slider">
                                                <p>{minProduct.results.price}</p>
                                                {/* <MultiRangeSlider
                                                    min={parseInt(minProduct.results[0].price)}
                                                    max={parseInt(maxProduct.results[0].price)}
                                                    // onChange={({min, max}) => console.log(min, max)}
                                                    onChange={({ min, max }) => {
                                                        setMinPrice(min)
                                                        setMaxPrice(max)
                                                        }
                                                    }
                                                /> */}
                                                <DoubleRangeInput 
                                                    min_value={parseInt(minProduct.results[0].price)}
                                                    max_value={parseInt(maxProduct.results[0].price)}
                                                    onMinPrice={setMinPrice}
                                                    onMaxPrice={setMaxPrice}
                                                    minPrice={minPrice}
                                                    maxPrice={maxPrice}
                                                />
                                            </div>
                                        }
                                    </div>

                                    {
                                        filter.slice(0,2).map(cat => (
                                            <FilterBlock key={cat.id} catList={cat.filter}/>
                                        ))
                                    }

                                </div>
                            </div>
                            <section className='section'>
                                <div className="row">
                                    <div className="cat-head">
                                        <div className="breadcrump">
                                            <ul className="flexitem">
                                                <li><Link to="/">Home</Link></li>
                                                {
                                                    cat[1] == 'search'? 
                                                    <li>Search</li>
                                                        : 
                                                        cat.length == 3 ?
                                                            <li>{toTitleCase(cat[1])}</li> 
                                                                :
                                                            <li>{toTitleCase(cat[2])}</li> 
                                                }
                                            </ul>
                                        </div>
                                        <div className="page-title">
                                            <h1>{toTitleCase(cat[1] == 'search'? `Search Result` : cat.length == 4 ? cat[2] : cat[4] || cat[1])}</h1>
                                        </div>
                                        <div className="cat-navigation flexitem">
                                            <div className="item-filter desktop-hide">
                                                <button
                                                    className="filter-trigger label"
                                                    onClick={() => {setFilterShow(!filterShow)}}
                                                >
                                                    <i className="ri-menu-2-line ri-2x"></i>
                                                    <span>Filter</span>
                                                </button>
                                            </div>

                                            <div className="item-sorting">
                                                <select 
                                                    defaultValue={``}
                                                    name="price-sorting" 
                                                    id="price-sorting"
                                                    title='Price Sorting'
                                                    onChange={(e) => {setOrder(prev => {
                                                        if (e.target.value == 1) {
                                                            return `price`
                                                        } 
                                                        if (e.target.value == 2) {
                                                            return `-price`
                                                        }
                                                    })}}
                                                >
                                                    <option value="">Default</option>
                                                    <option value="1">Price (Low {`>`} High)</option>
                                                    <option value="2">Price (High {`>`} Low)</option>
                                                </select>
                                            </div>

                                            <div className="item-perpage mobile-hide">
                                                <div className="label">Items {size} per page</div>
                                                <div className="desktop-hide">10</div>
                                            </div>

                                            <div className="item-sorting">
                                                <select 
                                                    defaultValue={`12`}
                                                    name="size-sorting" 
                                                    id="size-sorting"
                                                    title='Page Size'
                                                    onChange={(e) => {
                                                        setSize(e.target.value)
                                                    }}
                                                >
                                                    <option value="12">Default</option>
                                                    <option value="24">24</option>
                                                    <option value="36">36</option>
                                                </select>
                                            </div>


                                        </div>
                                    </div>
                                </div>


                                {/* featured products */}
                                <div className="products main flexwrap">
                                    {
                                        searchProduct &&
                                        searchProduct != undefined &&
                                        searchProduct.results != undefined &&
                                        searchProduct.results.map(product => (
                                            <FeaturedCard 
                                                key={product.id}
                                                product={product}
                                            />
                                        ))
                                    } 
                                </div>

                                {
                                    searchProduct && 
                                    (searchProduct.results == undefined ||
                                    searchProduct.results.length == 0) &&
                                    <NoItem />
                                }


                                <PaginationProduct 
                                    response={searchProduct}
                                    page={pageNumber}
                                    setPage={setPageNumber}
                                    size={size}
                                />

                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay desktop-hide" onClick={() => {setFilterShow(false)}}></div>
        </div>
    </section>
    </>
  )
}

export default CatPage