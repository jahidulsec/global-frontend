import React, { useEffect } from 'react'
import FeaturedCard from './FeaturedCard'
import { offerProduct } from '../../data'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const FeaturedProduct = () => {

   const [featuredRes, handleFeaturedGET] = useGeneralGet() 


    useEffect(() => {
        handleFeaturedGET(`product`,``,``,``,``,``,``,``,``,`1`)
    },[])

  return (
    <section className="featured">
        <div className="container">
            <div className="wrapper">
                <div>
                    <div className="sectop flexitem">
                        <h2>
                            Featured Products
                        </h2>
                        <div className="main-link view-all">
                            <Link to={`/featured/1`} className='flexitem'>
                                <span>View all</span>
                                <span className="ri-arrow-right-line"></span>
                            </Link>
                        </div>
                    </div>

                    {/* main product card */}
                    <div className="products main">
                        {
                            featuredRes &&
                            featuredRes.map(product => (
                                <FeaturedCard 
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default FeaturedProduct