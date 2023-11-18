import React from 'react'
import { Link } from 'react-router-dom'
import Stars from '../../Utilities/Stars'
import Hoverable from '../../Utilities/Hoverable'
import StockStatus from '../../Utilities/StockStatus'
import { currenyFormat } from '../../Utilities/currencyFormat'

const FeaturedCard = ({
    product
}) => {


  return (
    <article className="item">                    
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

            { /* hoverable buttons */ }
            <Hoverable
                product={product}
            />
            
            {   
                product && product.is_stock &&
                product.discount !== 0 &&
                    <div className="discount circle flexcenter"><span>{product.discount}%</span></div>
            }
        </div>

        <div className="content">
            <div className="rating">
                <Stars NumStar={product?.average_stars} />
                <span className="mini-text">({product?.count_review})</span>
            </div>
            <h3 ><Link to={`/product/${product.slug}`}>{product.title}</Link></h3>

            {/* feature for mobile view */}
            <div className="medium-text desktop-hide">
                <ul>
                    {
                        product.key_features &&
                        product.key_features.slice(0,3).map(feature => (
                            <li className='flexspace feature-list' key={feature.field_name}>
                                <span>
                                    {feature.field_name}
                                </span>
                                <span>
                                    {feature.field_description}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="price">
                <span className={`current ${product.is_stock == false && `normal`}`}>{currenyFormat(product.price)}</span>
                {
                    product && product.prev_price && product.is_stock ?
                        <span className="normal mini-text">{currenyFormat(product.prev_price)}</span>
                            :
                        <StockStatus stock={product.is_stock} />
                }
            </div>
            
        

            <div className="footer">
                <div className="medium-text">
                    <ul>
                        {
                            product.key_features &&
                            product.key_features.slice(0,3).map(feature => (
                                <li className='flexspace feature-list' key={feature.field_name}>
                                    <span>
                                        {feature.field_name}
                                    </span>
                                    <span>
                                        {feature.field_description}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    </article>
  )
}

export default FeaturedCard