import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import { useAuthContext } from '../../context/AuthContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../Utilities/Button'
import { useGeneralPOST } from '../../hooks/useGeneralPOST'
import SuccessStatus from '../../Utilities/SuccessStatus'

const Footer = ({
    setShowSearch, 
    setShowCart, 
    setShowMenu
}) => {

    const {auth} = useAuthContext()
    const {cart} = useCartContext()
    
    const [sideCat, handleSideCatGET] = useGeneralGet()
    const [loading, error, success, handleNewsletterPOST] = useGeneralPOST()

    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [footerMenuShow, setFooterMenuShow] = useState(``)

    const [ query, setQuery ] = useState(``)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async(values) => {
            handleNewsletterPOST(`newsletter`,values)
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Please enter a valid email!').required("enter your email!"),
        })
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        query && navigate(`/search/${query.replace(` `,`+`)}/1`)
        setShowSearch(false)
    }


    useEffect(() => {
        handleSideCatGET(`side-menu`)
    }, [])

    useEffect(() => {
        console.log(footerMenuShow)
    },[footerMenuShow])
  
return (
    <footer>

        {/* newsletter section */}
        {
           pathname === '/' && 
        <section className="newsletter">
            <div className="container">
                <div className="wrapper">
                    <div className="box">
                        <div className="content">
                            <h3>Join Our Newsletter</h3>
                            <p>Get email updates about our latest products and <strong>special offer</strong></p>
                        </div>
                        <form className='search' onSubmit={formik.handleSubmit} >
                            <span className="icon-large"><i className="ri-mail-line"></i></span>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder='Your email address'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.errors.email && formik.touched.email &&
                                <span className="required">{formik.errors.email}</span>
                            }
                            {
                                error?.email &&
                                <span className="required">{error.email}</span>
                            }
                            <Button 
                                type={'submit'}
                                className={'secondary-btn'}
                                loading={loading}
                            >
                                Sign Up
                            </Button>

                            <SuccessStatus success={success} />

                        </form>
                    </div>
                </div>
            </div>
        </section>
        }

    


        {/* widgets section */}
        <section className="widgets">
            <div className="container">
                <div className="wrapper">
                    <div className="flexwrap gap-5">

                            <div className="item mini-link flexcol gap-1 mobile-hide">
                                <h4>Global Computer (BD)</h4>
                                <p>
                                    Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh. 
                                    <br />
                                    Get quality IT products and services delivered right to your location.
                                </p>

                                {
                                    (auth == undefined || !auth) &&
                                    <Link to={`/signup`}>
                                        <button 
                                            type="button"
                                        >
                                                Sign up
                                        </button>
                                    </Link>
                                }
                            </div>

                            <div className="item mini-link footer__hide" >
                                <h4 onClick={() => {setFooterMenuShow(`contact`)}}>
                                    <span>Help and Contact</span> <span className={`ri-arrow-${footerMenuShow == 'contact' ? 'up': 'down'}-s-line`}></span>
                                </h4>
                                <ul className={`flexcol ${footerMenuShow == `contact` ? `show` : ``}`}>
                                    <li>
                                        <Link
                                            to={(auth && auth != undefined) ? `/profile/info` : `/login`} 
                                        >
                                            Your Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to={(auth && auth != undefined) ? `/profile/order` : `/login`} 
                                        >
                                            Your Order
                                        </Link>
                                    </li>
                                    <li><a href="">Contact us</a></li>
                                </ul>
                            </div>

                            <div className="item mini-link footer__hide">
                                <h4 onClick={() => {setFooterMenuShow(`category`)}}>
                                    <span>Categories</span> <span className={`ri-arrow-${footerMenuShow == 'category' ? 'up': 'down'}-s-line`}></span>
                                </h4>
                                <ul className={`flexcol ${footerMenuShow == `category` ? `show` : ``}`}>
                                    {
                                        sideCat &&
                                        sideCat.map(menu => (
                                            <li key={menu.id}>
                                                <Link to={`/category?sm=${menu.slug}&page=1`}>
                                                    {menu.title}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>


                            <div className="item mini-link footer__hide">
                                <h4 onClick={() => {setFooterMenuShow(`about`)}}>
                                    <span>About us</span> <span className={`ri-arrow-${footerMenuShow == 'about' ? 'up': 'down'}-s-line`}></span>
                                </h4>
                                <ul className={`flexcol ${footerMenuShow == `about` ? `show` : ``}`}>
                                    <li><a href="">Company Info</a></li>
                                    <li><a href="">Careers</a></li>
                                    <li><a href="">Policies</a></li>
                                </ul>
                            </div>

                    </div>
                </div>
            </div>
        </section>


        {/* info section */}
        <section className="footer-info">
            <div className="contaier">
                <div className="wrapper">
                    <div className="flexcol">
                        <div className="logo">
                            <Link to="/">
                                <img src="/global_logo_big.png" alt="global_logo" loading='lazy'/>
                            </Link>
                        </div>
                        <div className="socials">
                            <ul className="flexitem">
                                <li><a href="" className='facebook'><i className="ri-facebook-line"></i></a></li>
                                {/* <li><a href=""><i className="ri-youtube-line"></i></a></li> */}
                                <li><a href="" className='linkedin'><i className="ri-linkedin-line"></i></a></li>
                                {/* <li><a href=""><i className="ri-twitter-line"></i></a></li> */}
                                {/* <li><a href=""><i className="ri-instagram-line"></i></a></li> */}
                            </ul>
                        </div>
                        <p className="mini-text">Copyright 2023 © Global Computer (BD). All right reserved. </p>
                    </div>
                </div>
            </div>
        </section>


        {/* mobile view bottom nav */}
        <section className="menu-bottom desktop-hide">
            <div className="container">
                <div className="wrapper">
                    <nav>
                        <ul className="flexitem">
                            <li>
                                <NavLink 
                                    to="/"
                                    onClick={() => {
                                        setShowCart(false)
                                        setShowSearch(false)
                                    }}
                                >
                                    <i className={`ri-home-3-${pathname === '/' ? `fill`: `line`}`}></i>
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={(auth && auth != undefined) ? `/profile/info` : `/login`} 
                                    onClick={() => {
                                        setShowCart(false)
                                        setShowSearch(false)
                                }}
                                >
                                    <i className={`ri-user-4-${pathname === '/profile/info' || pathname === '/login' ? `fill`: `line`}`}></i>
                                    <span>Account</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={`/wishlist`}
                                    onClick={() => {
                                        setShowCart(false)
                                        setShowSearch(false)
                                    }}
                                >
                                    <i className={`ri-heart-${pathname === '/wishlist' ? `fill`: `line`}`}></i>
                                    <span>Wishlist</span>
                                </NavLink>
                            </li>
                            <li>
                                <a 
                                    className='t-search' 
                                    onClick={() => {
                                        setShowSearch(true)
                                        setShowCart(false)
                                    }}
                                >
                                    <i className="ri-search-line"></i>
                                    <span>Search</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className='cart-trigger' 
                                    onClick={() => {
                                        setShowCart(true)
                                        setShowSearch(false)
                                    }}
                                >
                                    <i className="ri-shopping-cart-line"></i>
                                    <span>Cart</span>
                                    <div className="fly-item">
                                        <span className="item-number">{cart.length}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>




        {/* bottom menu search */}
        <section className="search-bottom desktop-hide">
            <div className="container">
                <div className="wrapper">
                    <form className='search' onSubmit={handleSubmit}>
                        <a
                            className="t-close search flexcenter"
                            onClick={() => {setShowSearch(false)}}
                        >
                            <i className="ri-close-line"></i>
                        </a>
                        <span className="icon-large"><i className="ri-search-line"></i></span>
                        <input 
                            type="search" 
                            name="search" 
                            id="search" 
                            placeholder='Search' 
                            onChange={(e) => {setQuery(item => {return e.target.value})}}
                            required
                        />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </section>


        {/* overlay */}
        <div className="overlay desktop-hide" onClick={() => {setShowMenu(false)}}></div>
    </footer>
  )
}

export default Footer