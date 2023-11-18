import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { toTitleCase } from '../Utilities/toTitleCase'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Button from '../Utilities/Button'
import { useCartContext } from '../context/CartContext'
import { useGeneralGet } from '../hooks/useGeneralGet'
import { useGeneralPOST } from '../hooks/useGeneralPOST'
import ErrorStatus from '../Utilities/ErrorStatus'
import SuccessStatus from '../Utilities/SuccessStatus'
import { currentDate } from '../Utilities/currentDate'
import { useAuthContext } from '../context/AuthContext'
import { currenyFormat } from '../Utilities/currencyFormat'



const CheckoutPage = () => {

    const {auth, user} = useAuthContext()
    const [today, setToday] = useState()
    //  payment start
    
    // const [user, handleUserGET] = useGeneralGet()
    const [loading, error, success, handleOrderPOST, orderRes] = useGeneralPOST()

    const navigate = useNavigate()

    const {
        cartTotal, 
        cartOverallTotal, 
        discount, 
        shippingCharge, 
        cart, 
    } = useCartContext()


    let cartItem = cart.map(item => {
        return { product_id : item.productId, quantity: item.count, unit_price: `${item.unitPrice}`, price: `${item.price}` }
    })

     

    useEffect(() => {
        setToday(currentDate())
    }, [])



    const handleConfirm = () => {
        setTimeout(() => {
            formik.resetForm()
            navigate('/confirmation', {state: order})            
        }, 5000);
    }

    const address = JSON.parse(sessionStorage.getItem('address'))
    
    const handleCheckAddressData = () => {
        if (address === null) {
            return true
        }
        if (!address.district || !address.division || !address.streetAddress) {
            return true
        }
        if (cartItem.length < 1) {
            return true
        }
        return false
    }


    const formik = useFormik({
        initialValues: {
            total: cartTotal,
            date: today,
            street_address: address != null && address.streetAddress && address.streetAddress,
            district: address != null && address.district && address.district,
            division: address != null && address.division && address.division,
            phone: user?.phone_number,
            payment_method: 'cash on delivery',
            order_note: '',
            orders: cartItem,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            if (values.phone.length < 11) {
                values.phone = '+880'+values.phone
            }
            handleOrderPOST(`order`,values, auth)
            localStorage.removeItem('cart')
            handleConfirm()
            
        },
        validationSchema: Yup.object({
            total: Yup.string(),
            phone: Yup.string('enter only numbers!').min(10),
            order_note: Yup.string(),
            district: Yup.string(),
            division: Yup.string(),
            street_address: Yup.string(),
            payment_method: Yup.string(),
            orders: Yup.array(),
            date: Yup.date(),
        })
    })

    

  return (
    <>
    <Helmet>
        <title>Checkout | Global Computer (BD)</title>
        <meta property="'description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
        <meta property="'keywords" content="Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, CC camera, CCTV, Global Computer (BD), computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, hp, apple, asus, bangladesh, boya, brother, cable, GPU, graphics card" />
        <meta property="'og:title" content="Global Computer (BD)" />
        <meta property="og:image" content="/global_mini_logo.png" />
        <meta property="og:url" content="https://globalcomputer.com.bd/" />
        <meta property="og:description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
    </Helmet>
    <section className='checkout-page single-checkout'>
        <div className="container">
            <div className="wrapper">
                <div className="checkout flexwrap">
                    <div className="item left styled">
                        <h1>Contact Info</h1>
                        <form onSubmit={formik.handleSubmit }>
                            <p>
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    type="email"
                                    name='email'
                                    id='email'
                                    value={user?.email ? user?.email : 'Login First!'}
                                    disabled
                                />
                            </p>
                            
                            <p>
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    type="text"
                                    name='fullName'
                                    id='fullName'
                                    value={(user?.first_name && user?.last_name) ? `${user?.first_name} ${user?.last_name}` :  `Login First!` }
                                    disabled
                                />
                                
                            </p>
                            <p>
                                <label htmlFor="phone">Phone Number <span></span></label>
                                <input 
                                    type="phone" 
                                    name='phone'
                                    id='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    {...formik.getFieldHelpers('phone')}
                                />
                                <span className='phone-code'>+880</span>
                                {
                                    formik.errors.phone && formik.touched.phone &&
                                    <span className="required">{formik.errors.phone}</span>
                                }
                            </p>
                            <p>
                                <label htmlFor="order_note">Order Note (optional)</label>
                                <textarea 
                                    name="order_note" 
                                    id="order_note" 
                                    cols="30" 
                                    rows="4"
                                    value={formik.values.order_note}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldHelpers('order_note')}
                                ></textarea>
                            </p>
                            {/* <p className='checkset'>
                                <input type="checkbox" name="anaccount" id="anaccount" />
                                <label className='not-text' htmlFor="anaccount">Create an account?</label>
                            </p> */}
                            <div className="shipping-methods">
                                <h2>Shipping Methods</h2>
                                <p className="checkset">
                                    <input type="radio" name="payment_method" id="payment_method" checked/>
                                    <label className='not-text' htmlFor="payment_method">Cash on Delivery</label>
                                </p>
                                <div className="primary-checkout flexcenter">
                                    <Button 
                                        className={`primary-btn`}
                                        type={`submit`}
                                        disable={handleCheckAddressData()}
                                        loading={loading}
                                    >
                                        
                                        <span>Place Order </span>
                                        <span className="ri-shopping-cart-line"></span>
                                    </Button>

                                    <ErrorStatus error={error} />
                                    <SuccessStatus success={success} />
                                    {
                                        orderRes &&
                                        <div className={`success-msg ${success && 'success'}`}>
                                            Biller Id is {orderRes?.slug}       
                                        </div>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="item right">
                        
                        <div className="summary-order is_sticky">
                            {/* shipping address */}
                            <h2>Shipping Address</h2>
                            <div className="summary-address">
                                <ul>
                                    <li>
                                        <span>Division</span>
                                        {
                                            address != null && address.division ?
                                            <span>{toTitleCase(address.division)}</span> :
                                            <span className='required'>
                                                <Link to={`/cart`}>
                                                    <i class="ri-error-warning-line"></i> <span>Enter your division</span>
                                                </Link>
                                            </span>
                                        }
                                    </li>
                                    <li>
                                        <span>District</span>
                                        {
                                            address != null && address.district ?
                                            <span>{toTitleCase(address.district)}</span> :
                                            <span className='required'>
                                                <Link to={`/cart`}>
                                                    <i class="ri-error-warning-line"></i> <span>Enter your district</span>
                                                </Link>
                                            </span>
                                        }
                                    </li>
                                    <li>
                                        <span>Street Address</span>
                                        {
                                            address != null && address.streetAddress ?
                                            <span>{toTitleCase(address.streetAddress)}</span> :
                                            <span className='required'>
                                                <Link to={`/cart`}>
                                                    <i class="ri-error-warning-line"></i> <span>Enter your address</span>
                                                </Link>
                                            </span>
                                        }
                                    </li>
                                    <li>
                                        <span></span>
                                        <span className='medium-text'>
                                            <Link to={`/cart`}>
                                                Edit address <i className="ri-arrow-right-line"></i>
                                            </Link>
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* order summary */}
                            <h2>Order Summary</h2>
                            <div className="summary-totals">
                                <ul>
                                    <li>
                                        <span>Subtotal</span>
                                        <span>{currenyFormat(cartTotal)}</span>
                                    </li>
                                    {/* <li>
                                        <span>Discount</span>
                                        <span>{currenyFormat(0)}</span>
                                    </li>
                                    <li>
                                        <span>Shipping</span>
                                        <span>{currenyFormat(shippingCharge)}</span>
                                    </li> */}
                                    <li>
                                        <span>Total</span>
                                        <strong>{currenyFormat(cartOverallTotal)}</strong>
                                    </li>
                                </ul>
                            </div>
                            <ul className="products mini">
                                {
                                    cart &&
                                    cart.map(item => (
                                        <li key={item.id} className="item">
                                            <div className="thumbnail object-cover">
                                                <img 
                                                    src={item.imgUrl} 
                                                    alt={item.name} 
                                                />
                                            </div>
                                            <div className="item-content">
                                                <p>{item.name}</p>
                                                <span className="price">
                                                    <span>{currenyFormat(item.price)}</span>
                                                    <span>x {item.count}</span>
                                                </span>
                                            </div>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>

  )
}

export default CheckoutPage