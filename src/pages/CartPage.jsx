import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IncDrecButton from '../Utilities/IncDrecButton'
import { Helmet } from 'react-helmet'
import { useCartContext } from '../context/CartContext'
import NoItem from '../Utilities/NoItem'
import { currenyFormat } from '../Utilities/currencyFormat'

const CartPage = () => {

    const [shippingAddress, setShippingAddress] = useState({
        division:'',
        district: '',
        streetAddress: '',
    })

    const [showShipping, setShowShipping] = useState(true)

    const {
        cartTotal, 
        cartOverallTotal, 
        discount, 
        shippingCharge, 
        cart, 
        handleCartItemQuantity, 
        handleCartItemDelete
    } = useCartContext()


    const handleAddress = () => {
        sessionStorage.setItem('address', JSON.stringify(shippingAddress))
    }

    const localAddressData = sessionStorage.getItem('address')

    useEffect(() => {
        if (localAddressData !== null) {
            setShippingAddress(JSON.parse(localAddressData))
        }
    },[])

    

  return (
    <>
    <Helmet>
        <title>Cart | Global Computer (BD)</title>
        <meta property="'description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
        <meta property="'keywords" content="Laptop shop in Bangladesh, Laptop shop in bd, computer shop in Bangladesh, PC shop in Bangladesh, computer shop in BD, Gaming PC shop in Bangladesh, PC accessories shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer parts shop in bd, Laptop in Bangladesh, Notebook, Laptop, Desktop, Brand PC, computer, computer store Bangladesh, laptop store Bangladesh, gaming, desktop, monitor, CC camera, CCTV, Global Computer (BD), computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, hp, apple, asus, bangladesh, boya, brother, cable, GPU, graphics card" />
        <meta property="'og:title" content="Global Computer (BD)" />
        <meta property="og:image" content="/global_mini_logo.png" />
        <meta property="og:url" content="https://globalcomputer.com.bd/" />
        <meta property="og:description" content="Reliable Computer Laptop, Desktop & Component Retail Shop in Bangladesh" />
    </Helmet>
    <section className='cart-page single-cart'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                    <ul className="flexitem">
                        <li><Link to="/">Home</Link></li>
                        <li>Cart</li>
                    </ul>
                </div>
                <div className="page-title">
                    <h1>Shopping Cart</h1>
                </div>
                <div className="products one cart">
                    <div className="flexwrap">
                        <form className="form-cart">
                            <div className="item">
                                <table id="cart-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart &&
                                            cart.map(item => (

                                            <tr key={item.id}>
                                                <td className='flexitem'>
                                                    <div className="thumbnail object-cover">
                                                        <Link to={`/product/${item.productSlug}`}>
                                                            <img src={item.imgUrl} alt={item.name} />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <Link to={`/product/${item.productSlug}`}>
                                                                <span>{item.name}</span>
                                                            </Link>
                                                        </strong>
                                                        {/* <p>Core: 10, Threats: 18</p> */}
                                                    </div>
                                                </td>
                                                <td data-label='Price'>{currenyFormat(item.unitPrice)}</td>
                                                <td data-label='Quantity'>
                                                    <div className="qty-control flexitem">
                                                        <IncDrecButton 
                                                            countValue={item.count} 
                                                            onQty={handleCartItemQuantity}
                                                            productId={item.productId}
                                                            unitPrice={item.unitPrice}
                                                        />
                                                    </div>
                                                </td>
                                                <td data-label='Subtotal'>{currenyFormat(item.price)}</td>
                                                <td data-label="Delete">
                                                    <button type='button' onClick={() => {handleCartItemDelete(item.id)}}><i className="ri-close-line"></i></button>
                                                </td>
                                            </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                {
                                    cart.length == 0 &&  <NoItem />
                                }
                            </div>
                        </form>

                        {/* cart summary */}
                        <div className="cart-summary styled">
                            <div className="item">
                                <div className="coupon">
                                    <input 
                                        type="text" 
                                        name="coupon" 
                                        id="coupon"
                                        placeholder='Enter Coupon' 
                                    />
                                    <button type='button'>Apply</button>
                                </div>
                                <div className="shipping-rate collapse">
                                    <div className={`has-child ${showShipping && `expand`}`}>
                                        <a 
                                            className="icon-small"
                                            onClick={() => {setShowShipping(!showShipping)}}
                                        >
                                            Shipping Address
                                        </a>
                                        <div className="content">
                                            <form className='product-form' >
                                                <p className="division">
                                                    <label htmlFor="division">Division <span></span></label>
                                                    <input
                                                        type='text' 
                                                        name="division" 
                                                        id="division" 
                                                        required
                                                        value={shippingAddress.division}
                                                        onChange={e => {
                                                            setShippingAddress(data => ({
                                                                ...data,
                                                                division: e.target.value
                                                            }))
                                                        }}
                                                    />
                                                </p>
                                                <p className="district">
                                                    <label htmlFor="district">District <span></span></label>
                                                    <input 
                                                        type='text'
                                                        name="district" 
                                                        id="district" 
                                                        required
                                                        onChange={e => {
                                                            setShippingAddress(data => ({
                                                                ...data,
                                                                district: e.target.value
                                                            }))
                                                        }}
                                                        value={shippingAddress.district}
                                                    />
                                                </p>
                                                <p className="postal-code">
                                                    <label htmlFor="address">Street Address <span></span></label>
                                                    <input 
                                                        type="text" 
                                                        name="address" 
                                                        id="address"
                                                        value={shippingAddress.streetAddress} 
                                                        onChange={e => {
                                                            setShippingAddress(data => ({
                                                                ...data,
                                                                streetAddress: e.target.value
                                                            }))
                                                        }}
                                                    />
                                                </p>                  
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-total">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>{currenyFormat(cartTotal)}</td>
                                            </tr>
                                            <tr className='grand-total'>
                                                <th>Total</th>
                                                <td><strong>{currenyFormat(cartOverallTotal)}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link 
                                        role='button' 
                                        to="/checkout" 
                                        className="secondary-btn"
                                        onClick={handleAddress()}
                                    >
                                        Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>

  )
}

export default CartPage