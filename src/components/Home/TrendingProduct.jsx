import React, { useEffect } from 'react'
import TrendingCardMini from './TrendingCardMini'
import BigTrendingCard from './BigTrendingCard'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const TrendingProduct = () => {

    const [offeredProduct, handleOfferedProductGET] = useGeneralGet()
    const [productBig, handleProductBigGET] = useGeneralGet()


    useEffect(() => {
        handleOfferedProductGET(`product`,``,``,``,``,``,``,``,`1`)
        handleProductBigGET(`product`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, `true`)
    }, [])


  return (
    <section className="trending">
        <div className="container">
            <div className="wrapper">
                <div className="sectop flexitem">
                    <h2>Trending Products</h2>
                </div>

                <div className="column">
                    <div className="flexwrap">
                        {
                            productBig &&
                            productBig[0] != undefined &&
                            <BigTrendingCard 
                                product={productBig[0]}
                            />
                        }

                        {/* mini card */}
                        <div className="row products mini">
                            <div className='products-mini-content'>

                                {   
                                    offeredProduct &&
                                    offeredProduct.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default TrendingProduct