import React, { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
import Stars from '../../Utilities/Stars';
import IncDrecButtonProduct from '../../Utilities/InvDrecBButtonProduct';
import StockStatus from '../../Utilities/StockStatus';
import StockBar from '../../Utilities/StockBar';
import Timer from '../../Utilities/Timer';
import { useLocation } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { currenyFormat } from '../../Utilities/currencyFormat';
import { useGeneralGet } from '../../hooks/useGeneralGet';



const ModalProduct = ({
    productSlug
}) => {

    const [thumb, setThumb] = useState()
    const [count, setCount] = useState(1)
    const [cartClick, setCartClick] = useState(false)
    const [active, setActive] = useState(false)
    const {pathname} = useLocation()
    const [copy, setCopy] = useState(false)


    const {
        wishlist,
        handleWishlist, 
        handleAddCart,
    } = useCartContext()

    const [product, handleProductGet] = useGeneralGet()

    
    useEffect(() => {
        handleProductGet(`product`,productSlug)
        console.log(product)
    }, [productSlug])


    let stock;
    if (product?.total_stock && product?.sold_stock) {
        stock = parseInt(product?.total_stock)-parseInt(product?.sold_stock)
    }
    

    useEffect(() => {
        setCount(1)
    },[pathname])

    useEffect(() => {
        const handleCopyTextHide = () => {
            setTimeout(() => {
                setCopy(false)
            }, 2000);
        }

        if (copy) {
            handleCopyTextHide()
        }
    }, [copy])


    useEffect(() => {
        if(wishlist.filter(item => item.productId === product?.id).length == 1) {
            setActive(true)
        } else {
            setActive(false)
        }
    },[wishlist])


    const handleCartClick = () => {
        setCartClick(item => {
            return true
        })

        const timeoutCartClick = () => {
            setTimeout(() => {
                setCartClick(false)
            }, 700);
        }

        timeoutCartClick()
    }


    

  return (
    <div className="column">
        <div className="products one">
            <div className="flexwrap">

                {/* left side */}
                <div className="row">
                    <div className="item is_sticky">
                        <div className="price">
                            {
                                product &&
                                product.is_stock &&
                                product.discount == 0 &&
                                    <span className="discount">{product.discount}% <br /> OFF</span>
                            }
                        </div>
                        <Swiper 
                            loop={true}
                            navigation={true}
                            thumbs={{swiper: thumb}}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="big-image mySwiper"
                        >   
                            {
                                product?.images.map(product => (
                                    <SwiperSlide className="big-image-wrapper">
                                        <div 
                                            key={product.id}
                                            className="image-show"
                                            onClick={() => {setToggler(!toggler)}}>
                                            <img src={product.image} alt={product.title} />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                            
                        </Swiper>

                        <div  className="small-image">
                            <Swiper
                                onSwiper={setThumb}
                                spaceBetween={10}
                                slidesPerView={3}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="small-image-wrapper flexitem"
                            >
                                {
                                    product?.images.map(product => (
                                        <SwiperSlide key={product.id} className='thumbnail-show'>
                                            <img src={product.image} alt={product.title} loading='lazy' />
                                        </SwiperSlide>

                                    ))
                                }
                                
                            </Swiper>

                        </div>
                    </div>
                </div>



                {/* right side */}
                <div className="row">
                    <div className="item">
                        <h1>{product?.title}</h1>
                        <div className="content">
                            <div className="rating">
                                {
                                    product &&
                                    product?.reviews[0] &&
                                        <Stars NumStar={product.reviews[0].average_stars} />
                                }
                                <a href="#review-form" className="mini-text">
                                    {
                                        product?.reviews[0] ?
                                        product?.reviews[0].count_review :
                                        `0`
                                    } reviews
                                </a>
                            </div>
                            <div className="stock-model flexitem gap-1">
                                <StockStatus stock={product?.is_stock} />
                                <span className="model mini-text">Model: {product?.model_name}</span>
                                {
                                    product?.is_stock &&
                                    <span className={`emi mini-text`}>EMI Price: {currenyFormat(product?.emi_price)}</span>
                                }
                            </div>
                            
                                <div className="price">
                                    <span className={`current ${product?.is_stock == false && 'normal'}`}>
                                        {currenyFormat(product?.price) }
                                    </span>
                                    {
                                        product &&
                                        product.is_stock &&
                                        product.prev_price &&
                                        product.prev_price != 0 &&
                                            <div className="normal flexcol">
                                                <span className='normal'>
                                                    {currenyFormat(product?.prev_price) }
                                                </span>
                                            </div>
                                    }
                                </div>
                            


                            {/* offer section */}
                            
                            {
                                product && product.is_stock &&
                                product.offered_time && 
                                // offer time over remain untill next day
                                (new Date(product.offered_time). getFullYear()) == (new Date().getFullYear()) &&
                                (new Date(product.offered_time). getMonth()) == (new Date().getMonth()) &&
                                (new Date(product.offered_time). getDate() + 1) > (new Date().getDate()) &&
                                    <>
                                        <div className="stock medium-text">
                                            <div className="qty">
                                                <span>Sold: <strong className='qty-sold'>{product.sold_stock}</strong></span>
                                                <span>Stock: <strong className='qty-available'>{product.total_stock && stock}</strong></span>
                                            </div>
                                            <StockBar 
                                                productSold={product.sold_stock}
                                                totalStock={product.total_stock}
                                            />
                                        </div>
                                    
                                    </>

                            }

                            {
                                product?.offered_time &&
                                (new Date(product?.offered_time). getFullYear()) == (new Date().getFullYear()) &&
                                (new Date(product?.offered_time). getMonth()) == (new Date().getMonth()) &&
                                (new Date(product?.offered_time). getDate() + 1) > (new Date().getDate()) &&
                                <Timer offerTime={product?.offered_time} />
                            }
                            


                            {/* cart section */}
                            <div className='actions'>
                                <div className="qty-control flexitem">
                                    <IncDrecButtonProduct count={count} setCount={setCount} />
                                </div>
                                <div className="button-cart">
                                    <button 
                                        className='primary-btn flexitem gap-1'
                                        onClick={() => {
                                            handleAddCart(
                                                product.id, 
                                                product.slug,
                                                product.title, 
                                                product.price, 
                                                product.price, 
                                                product.images[0].image, 
                                                count)
                                            handleCartClick()
                                            
                                        }} 
                                    >
                                        <span className='ri-add-line'></span>
                                        <span>Add to cart</span>
                                    </button>
                                    <div className={`add flexitem gap-1 ${cartClick && `active`}`}>
                                        <span className='ri-check-line'></span>
                                        <span>Item added</span>
                                    </div>
                                </div>
                            </div>

                            <div className="actions">
                                <div className="wish-share">
                                    <ul className="flexitem second-link">
                                        <li onClick={() => {handleWishlist(
                                            product.id,
                                            product.slug,
                                            product.title,
                                            product.images[0].image,
                                            product.price,
                                            product?.average_stars,
                                            product.is_stock,
                                        )}}>
                                            <button type='button' className={`${active && `active`}`}>
                                                <span className="icon-large">
                                                    <i className={`ri-heart-${active ? `fill` : `line`}`}></i>
                                                </span>
                                                <span>Wishlist</span>
                                            </button>
                                        </li>
                                        <li style={{position: 'relative'}}>
                                            <CopyToClipboard text={window.location.href}>
                                                <button type='button' onClick={() => {setCopy(true)}}>
                                                    <span className="icon-large">
                                                        <i className="ri-share-line"></i>
                                                    </span>
                                                    <span>Share</span>
                                                </button>
                                            </CopyToClipboard>
                                            <p className={`copy-text ${copy ? 'show' : ''}`}>Copied!</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="description collapse">
                                <ul>
                                    <li 
                                        className={`has-child expand`}
                                        onClick={() => {setShowTable(`feature`)}}
                                    >
                                        <a className="icon-small">Key Features</a>
                                      
                                        <table className='featured-table content'>
                                            <tbody>
                                                {
                                                    product &&
                                                    product.key_features &&
                                                    product.key_features.map(item => (
                                                        <tr key={item.id}>
                                                            <td>{item.field_name}</td>
                                                            <td>{item.field_description}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ModalProduct