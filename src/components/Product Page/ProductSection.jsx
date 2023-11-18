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
import ErrorStatus from '../../Utilities/ErrorStatus';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Button from '../../Utilities/Button';
import { useGeneralPOST } from '../../hooks/useGeneralPOST';
import SuccessStatus from '../../Utilities/SuccessStatus';
import { currentDate } from '../../Utilities/currentDate';
import { ToReviewDate } from '../../Utilities/ToReviewDate';
import { useAuthContext } from '../../context/AuthContext';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { currenyFormat } from '../../Utilities/currencyFormat';



const ProductSection = ({
    product
}) => {

    const [thumb, setThumb] = useState()
    const [count, setCount] = useState(1)
    const [star, setStar] = useState(1)
    const [cartClick, setCartClick] = useState(false)
    const [active, setActive] = useState(false)
    const [showReview, setShowReview] = useState(2)
    const [showTable, setShowTable] = useState('feature')
    const {pathname} = useLocation()
    const [copy, setCopy] = useState(false)

    const {auth} = useAuthContext()


    const [loading, error, success, handleReviewPOST] = useGeneralPOST()

    const {
        wishlist,
        handleWishlist, 
        handleAddCart,
    } = useCartContext()


    let stock;
    if (product.total_stock && product.sold_stock) {
        stock = parseInt(product.total_stock)-parseInt(product.sold_stock)
    }
    

    useEffect(() => {
        setCount(1)
        setShowTable(`feature`)
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
        if(wishlist.filter(item => item.productId === product.id).length == 1) {
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


    


    const formik = useFormik({
        initialValues: {
            product_id: product && product.id, 
            comment: '',
            stars: 1,
            date: '', 
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const date = currentDate();
            let data = new Object()
            let new_data = Object.assign(data, values)

            new_data['stars'] = star
            new_data['date'] = date

            handleReviewPOST(`review`, new_data, auth)

        },
        validationSchema: Yup.object({
            productId: Yup.string(),
            comment: Yup.string().required('Enter your opinion!'),
            stars: Yup.number().integer().min(1).required('Give some stars!'),
            date: Yup.date(),
        }) 
    })


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
                                product.images.map(product => (
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
                                    product.images.map(product => (
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
                        <h1>{product.title}</h1>
                        <div className="content">
                            <div className="rating">
                                {
                                    product &&
                                    product.reviews[0] &&
                                        <Stars NumStar={product.reviews[0].average_stars} />
                                }
                                <a href="#review-form" className="mini-text">
                                    {
                                        product.reviews[0] ?
                                        product.reviews[0].count_review :
                                        `0`
                                    } reviews
                                </a>
                                <a href="#review-form" className="add-review mini-text" onClick={() => {setShowTable(`reviews`)}}>Add Your Review</a>
                            </div>
                            <div className="stock-model flexitem gap-1">
                                <StockStatus stock={product.is_stock} />
                                <span className="model mini-text">Model: {product.model_name}</span>
                                {
                                    product.is_stock &&
                                    <span className={`emi mini-text`}>EMI Price: {currenyFormat(product.emi_price)}</span>
                                }
                            </div>
                            
                                <div className="price">
                                    <span className={`current ${product?.is_stock == false && 'normal'}`}>
                                        {currenyFormat(product.price) }
                                    </span>
                                    {
                                        product &&
                                        product.is_stock &&
                                        product.prev_price &&
                                        product.prev_price != 0 &&
                                            <div className="normal flexcol">
                                                <span className='normal'>
                                                    {currenyFormat(product.prev_price) }
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
                                product.offered_time &&
                                (new Date(product.offered_time). getFullYear()) == (new Date().getFullYear()) &&
                                (new Date(product.offered_time). getMonth()) == (new Date().getMonth()) &&
                                (new Date(product.offered_time). getDate() + 1) > (new Date().getDate()) &&
                                <Timer offerTime={product.offered_time} />
                            }
                            


                            {/* cart section */}
                            <div className="actions">
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

                            {/* description */}
                            <div className="description collapse">
                                <ul>
                                    <li 
                                        className={`has-child ${showTable === 'feature' && 'expand'}`}
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
                                    <li 
                                        className={`has-child ${showTable === 'description' && 'expand'}`}
                                        onClick={() => {setShowTable(`description`)}}
                                    >
                                        <a className="icon-small">Description</a>
                                        <div className='content description'>
                                            <p>{product?.description}</p>
                                        </div>
                                    </li>
                                    <li 
                                        className={`has-child ${showTable === 'specification' && 'expand'}`}
                                        onClick={() => {setShowTable(`specification`)}}
                                    >
                                        <a className='icon-small'>Specifications</a>
                                        <div className="content">
                                            {
                                                product &&
                                                product.specification && 
                                                product.specification.map(spec => (

                                                <table key={spec.id}>
                                                    <thead>
                                                        <tr>
                                                            <th>{spec.table_name}</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        spec.spec_table &&
                                                        spec.spec_table.map(field => (

                                                            <tbody key={field.field_name}>
                                                                <tr>
                                                                    <td>{field.field_name}</td>
                                                                    <td>{field.field_description}</td>
                                                                </tr>
                                                            </tbody>
                                                        ))
                                                    }
                                                </table>
                                                ))

                                            }

                                        </div>
                                    </li>

                                    <li 
                                        className={`has-child ${showTable === 'reviews' && 'expand'}`}
                                        onClick={() => {setShowTable(`reviews`)}}
                                    >
                                        <a className="icon-small">Reviews <span className="mini-text">{product?.count_review}</span></a>
                                        <div className="content">
                                            <div className="reviews">
                                                <h4>Customers Reivew</h4>
                                                <div className="review-block">
                                                    <div className="review-block-head">
                                                        <div className="flexitem">
                                                                {
                                                                    product.reviews &&
                                                                    product.reviews.slice(0,1).map(review => (
                                                                        <span key={review.id} className="rate-sum">
                                                                            {review?.average_stars.toFixed(1)}
                                                                        </span>
                                                                    ))
                                                                }
                                                            <span>
                                                                {`${product?.count_review} review${product.count_review && product.count_review > 1 ? `s`: ``}`}
                                                            </span>
                                                        </div>
                                                         
                                                        
                                                        <a href="#review-form" className="secondary-btn">
                                                            Write Review
                                                        </a>
                                                    </div>

                                                    {/* reviews */}
                                                    <div className="review-block-body">
                                                        <ul>
                                                            {
                                                                product.reviews &&
                                                                product.reviews.slice(0,showReview).map(review => (

                                                                
                                                                    <li key={review.id} className="item">
                                                                        <div className="review-form">
                                                                            <p className='person'>{review?.user}</p>
                                                                            <p className="mini-text">On {ToReviewDate(review?.date)}</p>
                                                                        </div>
                                                                        <div className="review-rating rating">
                                                                           <Stars NumStar={review.stars} />
                                                                        </div>
                                                                        <div className="review-text">
                                                                            <span className="ri-double-quotes-l quotation"></span>
                                                                            <p>{review?.comment}</p>
                                                                        </div>
                                                                        
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>


                                                   {
                                                        product.reviews &&
                                                        product.reviews.length > showReview &&
                                                            <div className="review-footer main-link view-all">
                                                                <a
                                                                    className='flexitem'
                                                                    onClick={() => {
                                                                        setShowReview(prev => {
                                                                            return prev += 3
                                                                        })
                                                                    }}
                                                                >   
                                                                    <span>View more</span> <span className="ri-arrow-right-line"></span>
                                                                </a>
                                                            </div>
                                                   }

                                                    {
                                                        product.reviews &&
                                                        (showReview > 2 ) && 
                                                            <div className="review-footer main-link view-all">
                                                                <a
                                                                    className='flexitem'
                                                                    onClick={() => {
                                                                        setShowReview(prev => {
                                                                            return 2
                                                                        })
                                                                    }}
                                                                >   
                                                                    <span className="ri-arrow-left-line"></span> <span>See less</span> 
                                                                </a>
                                                            </div>
                                                   }

                                                    <div id="review-form" className="review-form">
                                                        <h4>Write a review</h4>
                                                        <form onSubmit={formik.handleSubmit}>
                                                            <div className="rating">
                                                                <p>Are you satisfied enough?</p>
                                                                <div className="rate-this">
                                                                    <input type="radio" name='rating' id='star5' />
                                                                    <label htmlFor="star5" onClick={() => {setStar(5)}}><i className="ri-star-fill"></i></label>

                                                                    <input type="radio" name='rating' id='star4' />
                                                                    <label htmlFor="star4" onClick={() => {setStar(4)}}><i className="ri-star-fill"></i></label>
                                                                    
                                                                    <input type="radio" name='rating' id='star3' />
                                                                    <label htmlFor="star3" onClick={() => {setStar(3)}}><i className="ri-star-fill"></i></label>

                                                                    <input type="radio" name='rating' id='star2' />
                                                                    <label htmlFor="star2" onClick={() => {setStar(2)}}><i className="ri-star-fill"></i></label>

                                                                    <input type="radio" name='rating' id='star1' />
                                                                    <label htmlFor="star1" onClick={() => {setStar(1)}}><i className="ri-star-fill"></i></label>
                                                                </div>
                                                            </div>
                                                            <p>
                                                                <label htmlFor="comment">Review</label>
                                                                <textarea 
                                                                    name="comment" 
                                                                    id="comment" 
                                                                    value={formik.values.comment}
                                                                    onChange={formik.handleChange} 
                                                                    cols="30" rows="3"></textarea>
                                                                {
                                                                    formik.errors.comment && formik.touched.comment &&
                                                                    <span className="required">{formik.errors.comment}</span>
                                                                }
                                                            </p>
                                                            <p>
                                                                <Button 
                                                                    type={"submit"}
                                                                    className={'primary-btn'}
                                                                    loading={loading}
                                                                >
                                                                    Submit Review
                                                                </Button>
                                                            </p>
                                                            <SuccessStatus success={success} />

                                                            <ErrorStatus error={error} />
                                                            
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default ProductSection