import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useGeneralGet } from '../../hooks/useGeneralGet'
import NoItem from '../../Utilities/NoItem'
import { currenyFormat } from '../../Utilities/currencyFormat'


const HeaderNavMobile = ({
    setShowMenu,
    showCart,
    setShowCart,
}) => {

   const {pathname} = useLocation()
   const {
        cart, 
        wishlist, 
        cartTotal, 
        handleCartItemDelete, 
        handleDelWishlist
    } = useCartContext()

    const [sideCat, handleSideCatGET] = useGeneralGet()

    const cartRef = useRef()
    
    useEffect(() => {
        handleSideCatGET(`side-menu`)
    },[])

    

    useEffect(() => {

        const cartIcon = document.querySelector(`.cart-trigger`)

        const handleCartToggle = (e) => {
            if (cartRef.current == null) {
                return
            }
            if (!cartRef.current.contains(e.target) && !cartIcon.contains(e.target)) {
                setShowCart(false)
            } 
        }


        document.addEventListener("click", handleCartToggle)
    }, [])


  return (
    <header className='header-sticky mobile'>
        <div className="header-nav">
            <div className="container">
                <div className="wrapper flexspace">
                    <div className="left flexitem">
                        {   
                            pathname !== '/signup' && pathname !== '/login' &&
                            <button 
                                onClick={() => {setShowMenu(true)}}
                                className="trigger desktop-hide">
                                    <span className='ri-menu-2-line'></span>
                            </button>
                        }
                        <div className="logo">
                            <Link to="/">
                                <img className='small' src="/global_logo_big.png" alt="global_logo" loading='lazy'/>
                                {/* <img className='big' src="/global_logo_mini.png" alt="global_logo" loading='lazy'/> */}
                            </Link>
                        </div>
                        <nav className="mobile-hide">
                            <ul className="flexitem second-link">
                                <li>
                                    <Link to='/'>
                                        <span className="icon-small"><i className="ri-home-3-line"></i></span>
                                        Home
                                    </Link>
                                </li>
                                <li className='has-child'>
                                    <Link>
                                        <span className="icon-small"><i className="ri-device-line"></i></span>
                                        Products 
                                        <span className="icon-small"><i className="ri-arrow-down-s-line"></i></span>
                                    </Link>

                                    {/* mega menu when hover on ALL PRODUCTS */}
                                    <div className="mega">
                                        <div className="container">
                                            <div className="wrapper">
                                                
                                                {
                                                    sideCat && 
                                                    sideCat != undefined &&
                                                    sideCat.map((cat) => (
                                                            
                                                        <div 
                                                            className="flexcol"
                                                            key={cat.id}
                                                        >
                                                            <div className="row">
                                                                <h4>{cat.title}</h4>
                                                                {   
                                                                    cat.sub_side_menu.length > 0 &&
                                                                    cat.sub_side_menu.map(subCat => (
                                                                        <ul key={subCat.id}>
                                                                            <li>
                                                                                <Link to={`/menu/${cat.slug}/${cat.query == 'brand' ? 'b' : 'c'}/${subCat.slug}/1`}>
                                                                                    {subCat.name}
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                    
                                           
                                            </div>

                                        </div>
                                    </div>
                                </li>
                               
                            </ul>
                        </nav>
                        
                    </div>


                    {
                    
                    pathname !== '/login' && pathname !== '/signup' &&
                    
                    <div className="right">
                        <ul className="flexitem gap-1">
                            <li className='iswishlist mobile-hide'>
                                <a>
                                    <div className="icon-large"><i className="ri-heart-line"></i></div>
                                    <div className="fly-item"><span className="item-number">{wishlist.length}</span></div>
                                </a>
                                
                                {/* wishlist overlay */}
                                <div 
                                    className={`mini-wishlist`}
                                >
                                    <div className="content">
                                        <div className="wishlist-head">
                                            <span>{wishlist.length} item{wishlist.length > 1 ?`s`: ``} in wishlist</span>
                                            <button 
                                                className='icon-small'
                                                onClick={() => {setShowCart(false)}}    
                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </div>
                                        <div className="wishlist-body">
                                            <ul className="products mini">
                                                {
                                                    wishlist && wishlist.length != 0 &&
                                                    wishlist.map(item => (

                                                    <li key={item.productId} className="item">
                                                        <div className="thumbnail object-cover">
                                                            <Link to={`/product/${item.productId}`}>
                                                                <img src={`${item.imgUrl}`} alt={item.name} />
                                                            </Link>
                                                        </div>
                                                        <div className="item-content">
                                                            <p><Link to={`/product/${item.productId}`}>{item.name}</Link></p>
                                                            <span className="price">
                                                                <span>{currenyFormat(item.unitPrice)}</span>
                                                            </span>
                                                        </div>
                                                        <button 
                                                            className="item-remove" 
                                                            onClick={() => {handleDelWishlist(item.productId)}}
                                                        >
                                                            <i className="ri-close-line"></i>
                                                        </button>
                                                    </li>
                                                ))
                                                }

                                                {
                                                    wishlist.length == 0 &&  <NoItem />
                                                }
                                                
                                            </ul>
                                        </div>

                                        <div className="wishlist-footer">
                                            <div className="actions">
                                                <Link to="/wishlist" className="primary-btn">Wishlist</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>


                            <li className='iscart'>
                                <a className='cart-icon'>
                                    <div className="icon-large">
                                        <i className="ri-shopping-cart-line"></i>
                                        <div className="fly-item"><span className="item-number">{cart.length}</span></div>
                                    </div>
                                    <div className="icon-text">
                                        <div className="mini-text">Total</div>
                                        <div className="cart-total">{currenyFormat(cartTotal)}</div>
                                    </div>
                                </a>

                                

                                {/* cart overlay */}
                                <div 
                                    className={`mini-cart ${showCart ? 'show': ''}`}
                                    ref={cartRef}
                                >
                                    <div className="content">
                                        <div className="cart-head">
                                            <span>{cart.length} item{cart.length > 1 ? `s`: ``} in cart</span>
                                            <button 
                                                className='icon-small desktop-hide'
                                                onClick={() => {setShowCart(false)}}  

                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </div>
                                        <div className="cart-body">
                                            <ul className="products mini">
                                                {
                                                    cart && 
                                                    cart.map(item => (

                                                    <li key={item.id} className="item">
                                                        <div className="thumbnail object-cover">
                                                            <Link to={`/product/${item.productSlug}`}>
                                                                <img src={`${item.imgUrl}`} alt={item.name} />
                                                            </Link>
                                                        </div>
                                                        <div className="item-content">
                                                            <p><Link to={`/product/${item.productSlug}`}>{item.name}</Link></p>
                                                            <span className="price">
                                                                <span>{currenyFormat(item.price)}</span>
                                                                
                                                                    <span className='fly-item'>
                                                                        <span>{item.count}x</span>
                                                                    </span>
                                                                
                                                            </span>
                                                        </div>
                                                        {pathname !== '/checkout' &&
                                                            <button 
                                                                className="item-remove" 
                                                                onClick={() => {handleCartItemDelete(item.id)}}
                                                            >
                                                                <i className="ri-close-line"></i>
                                                            </button>
                                                        }
                                                    </li>
                                                ))
                                                }

                                                {
                                                    cart.length == 0 &&  <NoItem />
                                                }
                                                
                                            </ul>
                                        </div>

                                        <div className="cart-footer">
                                            <div className="subtotal">
                                                <p>Subtotal</p>
                                                <p><strong>{currenyFormat(cartTotal)}</strong></p>
                                            </div>
                                            <div className="actions">
                                                <Link to="/cart" className="secondary-btn">View Cart</Link>
                                                <Link to="/checkout" className="primary-btn">Checkout</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    </header>
  )
}

export default HeaderNavMobile