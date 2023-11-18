import React from 'react'
import { Link } from 'react-router-dom'
import Stars from '../../Utilities/Stars'
import Hoverable from '../../Utilities/Hoverable'
import { currenyFormat } from '../../Utilities/currencyFormat'


const TrendingCardMini = ({
    product,
}) => {



  return (
    <div className="item">
        <div className="media">
            <div className="thumbnail object-cover">
                <Link to={`/product/${product.slug}`}>
                    <img
                        src={product.images[0].image} 
                        alt={product.title} 
                        loading='lazy'
                    />
                </Link>
            </div>


            {/* hoverable buttons */}
            <Hoverable
                product={product}
            />


            {
                product.discount &&
                    <div className="discount circle flexcenter"><span>{product.discount}%</span></div>
            }
        </div>
        <div className="content">
            
            <h3 className='main-link'>
                <Link to={`/product/${product.slug}`}>{product.title}</Link>
            </h3>
            <div className="rating">
                <Stars NumStar={product?.average_stars} />
                <span className="mini-text">({product?.count_review})</span>
            </div>
            <div className="price">
                <span className="current">{currenyFormat(product.price)}</span>
                <span className="normal mini-text">{currenyFormat(product.prev_price)}</span>
            </div>
        
            <div className="mini-text">
                <p>{product?.sold_stock} Sold</p>
            </div>
            
        </div>
    </div>
  )
}

export default TrendingCardMini