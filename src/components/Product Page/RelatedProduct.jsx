import React, { useEffect } from 'react'
import FeaturedCard from '../Home/FeaturedCard'
import { offerProduct } from '../../data'
import { Link } from 'react-router-dom'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const RelatedProduct = ({ productCat }) => {

    const [productRelated, handleProductGET] = useGeneralGet()

    useEffect(() => {
        handleProductGET(`product`,``,``,``,``,productCat.slug)
    }, [])



  return (
    <section className="related">
        <div className="container">
            <div className="wrapper">
                <div className="column">
                    <div className="sectop flexitem">
                        <h2>Related Products</h2>
                        <div className="main-link view-all">
                            <Link to={`/category/${productCat.slug}/1`} className="flexitem">
                                <span>View all</span>
                                <span className="ri-arrow-right-line"></span>
                            </Link>
                        </div>
                    </div>

                    {/* main product card */}
                    
                    <div className="products main">
                        {
                            productRelated &&
                            productRelated.slice(0,4).map(product => (
                                <FeaturedCard
                                    id={product.id}
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

export default RelatedProduct