import React, { useEffect } from 'react'
import FeaturedCard from './FeaturedCard'
import { offerProduct } from '../../data'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const FeaturedProduct = () => {

   const [featuredRes1, handleFeaturedGET1] = useGeneralGet() 
   const [featuredRes2, handleFeaturedGET2] = useGeneralGet() 
   const [featuredRes3, handleFeaturedGET3] = useGeneralGet() 
   const [featuredRes4, handleFeaturedGET4] = useGeneralGet() 
   const [featuredRes5, handleFeaturedGET5] = useGeneralGet() 
   const [featuredRes6, handleFeaturedGET6] = useGeneralGet() 


    useEffect(() => {
        handleFeaturedGET1(`product`,``,``,1,1,``,``,``,``,1)
        handleFeaturedGET2(`product`,``,``,2,1,``,``,``,``,1)
        handleFeaturedGET3(`product`,``,``,3,1,``,``,``,``,1)
        handleFeaturedGET4(`product`,``,``,4,1,``,``,``,``,1)
        handleFeaturedGET5(`product`,``,``,5,1,``,``,``,``,1)
        handleFeaturedGET6(`product`,``,``,6,1,``,``,``,``,1)
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
                            featuredRes1 &&
                            featuredRes1.results != undefined &&
                            featuredRes1.results.map(product => (
                                <FeaturedCard 
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                        {
                            featuredRes2 &&
                            featuredRes2.results != undefined &&
                            featuredRes2.results.map(product => (
                                <FeaturedCard 
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                        {
                            featuredRes3 &&
                            featuredRes3.results != undefined &&
                            featuredRes3.results.map(product => (
                                <FeaturedCard 
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                        {
                            featuredRes4 &&
                            featuredRes4.results != undefined &&
                            featuredRes4.results.map(product => (
                                <FeaturedCard 
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                        {
                            featuredRes5 &&
                            featuredRes5.results != undefined &&
                            featuredRes5.results.map(product => (
                                <FeaturedCard 
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                        {
                            featuredRes6 &&
                            featuredRes6.results != undefined &&
                            featuredRes6.results.map(product => (
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