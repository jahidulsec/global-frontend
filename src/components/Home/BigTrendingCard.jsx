import React, { useEffect } from 'react'
import Timer from '../../Utilities/Timer'
import { Link } from 'react-router-dom'
import Stars from '../../Utilities/Stars'
import StockBar from '../../Utilities/StockBar'
import Hoverable from '../../Utilities/Hoverable'
import { currenyFormat } from '../../Utilities/currencyFormat'


const BigTrendingCard = ({
    product
}) => {

  return (
    <div className="row products big">
        <div className="item">
        {
            product.offered_time &&
            (new Date(product.offered_time). getFullYear()) == (new Date().getFullYear()) &&
            (new Date(product.offered_time). getMonth()) == (new Date().getMonth()) &&
            (new Date(product.offered_time). getDate() + 1) > (new Date().getDate()) &&
            <Timer offerTime={product.offered_time} />
        }

            
            <div className="media">
                <div className="image">
                    <Link to={`/product/${product.slug}`}>
                        <img src={product?.images[0].image} alt={product.title} loading='lazy' />
                    </Link>
                </div>
                
                {/* hoverable buttons */}
                <Hoverable 
                    product={product}
                />

                {
                    product && product.is_stock &&
                        <div className="discount circle flexcenter"><span>{product.discount}%</span></div>
                }
            </div>
            <div className="content">
                <div className="rating">
                    <Stars NumStar={product?.average_stars} />
                    <span className="mini-text">({product?.count_review})</span>
                </div>
                <h3 className='main-link'>
                    <Link to={`/product/${product.slug}`}>{product.title}</Link>
                </h3>
                <div className="price">
                    <span className="current">{currenyFormat(product.price)}</span>
                    <span className="normal mini-text">{currenyFormat(product.prev_price)}</span>
                </div>
                {
                    product && product.is_stock &&
                    product.offered_time && 
                    // offer time over remain untill next day
                    (new Date(product.offered_time). getFullYear()) == (new Date().getFullYear()) &&
                    (new Date(product.offered_time). getMonth()) == (new Date().getMonth()) &&
                    (new Date(product.offered_time). getDate() + 1) > (new Date().getDate()) &&
                        <div className="stock mini-text">
                            <div className="qty">
                                <span>Sold: <strong className="qty-sold">{product.sold_stock}</strong></span>
                                <span>Stock: <strong className="qty-available">{product.total_stock - product.sold_stock}</strong></span>
                            </div>
                            
                            {/* stock available bar */}

                            <StockBar 
                                productSold={product.sold_stock}
                                totalStock={product.total_stock} 
                            />

                        </div>
                }
            </div>
        </div>
    </div>
  )
}

export default BigTrendingCard