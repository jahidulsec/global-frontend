import React from 'react'
import { Link } from 'react-router-dom'
import Stars from '../Utilities/Stars'
import StockStatus from '../Utilities/StockStatus'
import { Helmet } from 'react-helmet'
import { useCartContext } from '../context/CartContext'
import NoItem from '../Utilities/NoItem'
import { currenyFormat } from '../Utilities/currencyFormat'

const WishlistPage = () => {

    const {wishlist, handleDelWishlist, handleAddCart} = useCartContext()

  return (
    <>
    <Helmet>
        <title>Wishlist | Global Computer (BD)</title>
    </Helmet>


    <section className="wishlist-page">
        <div className="container">
            <div className="wrapper">
            <div className="breadcrump">
                    <ul className="flexitem">
                        <li><Link to="/">Home</Link></li>
                        <li>Wishlist</li>
                    </ul>
                </div>
                <div className="page-title">
                    <h1>Wishlist</h1>
                </div>
                <div className="products one cart">
                    <div className="flexwrap">
                        <form className="form-wishlist">
                            <div className="item">
                                <table id="cart-table">
                                    <thead>
                                        <tr>
                                            <th>Product name</th>
                                            <th>Unit Price</th>
                                            <th>Rating</th>
                                            <th>Stock Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            wishlist &&
                                            wishlist.map(item => (

                                            <tr key={item.productId}>
                                                <td className='flexitem'>
                                                    <div className="thumbnail object-cover">
                                                        <Link to={`/product/${item.productId}`}>
                                                            <img src={item.imgUrl} alt={item.name} />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <Link to={`/product/${item.productId}`}>
                                                                {item.name}
                                                            </Link>
                                                        </strong>
                                                        {/* <p>Core: 10, Threats: 18</p> */}
                                                    </div>
                                                </td>
                                                <td data-label='Unit Price'>৳ {currenyFormat(item.unitPrice)}</td>
                                                <td data-label='Rating'>
                                                    <Stars NumStar={item.stars} />
                                                </td>
                                                <td data-label='Status'>
                                                    <StockStatus stock={item.stock} />
                                                </td>

                                                <td className='table-btn' data-label='Actions'>
                                                    <button 
                                                        className='primary-btn'
                                                        type='button'
                                                        onClick={() => {
                                                            handleAddCart(
                                                                item.productId,
                                                                item.name,
                                                                item.unitPrice,
                                                                item.unitPrice,
                                                                item.imgUrl,
                                                                item.count
                                                            )
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <button 
                                                        type='button'
                                                        onClick={() => {handleDelWishlist(item.productId)}}
                                                    >
                                                        <i className="ri-close-line"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>

                                {
                                    wishlist.length == 0 &&  <NoItem />
                                }
                            </div>
                        </form>

                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default WishlistPage