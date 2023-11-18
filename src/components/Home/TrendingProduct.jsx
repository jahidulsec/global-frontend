import React, { useEffect } from 'react'
import TrendingCardMini from './TrendingCardMini'
import BigTrendingCard from './BigTrendingCard'
import { useGeneralGet } from '../../hooks/useGeneralGet'

const TrendingProduct = () => {

    const [offeredProduct1, handleOfferedProductGET1] = useGeneralGet()
    const [offeredProduct2, handleOfferedProductGET2] = useGeneralGet()
    const [offeredProduct3, handleOfferedProductGET3] = useGeneralGet()
    const [offeredProduct4, handleOfferedProductGET4] = useGeneralGet()
    const [offeredProduct5, handleOfferedProductGET5] = useGeneralGet()
    const [offeredProduct6, handleOfferedProductGET6] = useGeneralGet()
    const [productBig, handleProductBigGET] = useGeneralGet()


    useEffect(() => {
        handleOfferedProductGET1(`product`,``,``,1,1,``,``,``,`1`)
        handleOfferedProductGET2(`product`,``,``,2,1,``,``,``,`1`)
        handleOfferedProductGET3(`product`,``,``,3,1,``,``,``,`1`)
        handleOfferedProductGET4(`product`,``,``,4,1,``,``,``,`1`)
        handleOfferedProductGET5(`product`,``,``,5,1,``,``,``,`1`)
        handleOfferedProductGET6(`product`,``,``,6,1,``,``,``,`1`)
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
                                    offeredProduct1 &&
                                    offeredProduct1.results!= undefined &&
                                    offeredProduct1.results.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }

                                {   
                                    offeredProduct2 &&
                                    offeredProduct2.results!= undefined &&
                                    offeredProduct2.results.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }

                                {   
                                    offeredProduct3 &&
                                    offeredProduct3.results!= undefined &&
                                    offeredProduct3.results.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }

                                {   
                                    offeredProduct4 &&
                                    offeredProduct4.results!= undefined &&
                                    offeredProduct4.results.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }

                                {   
                                    offeredProduct5 &&
                                    offeredProduct5.results!= undefined &&
                                    offeredProduct5.results.map(product => (
                                        <TrendingCardMini
                                            key={product.id} 
                                            product={product}
                                        />
                                    ))
                                }
                                {   
                                    offeredProduct6 &&
                                    offeredProduct6.results!= undefined &&
                                    offeredProduct6.results.map(product => (
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