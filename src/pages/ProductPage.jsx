import React, { useContext, useEffect } from 'react'
import ProductPageHeader from '../components/Product Page/ProductPageHeader'
import ProductSection from '../components/Product Page/ProductSection'
import RelatedProduct from '../components/Product Page/RelatedProduct'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useGeneralGet } from '../hooks/useGeneralGet'


const ProductPage = () => {

  const {id} = useParams()
  const [product, handleProductGET,loading] = useGeneralGet()

  

  useEffect(() => {
    handleProductGET(`product`,id)
  },[id])



  return (
    <>
    {
      product &&
      product.title &&
      <Helmet>
        <title>{product.title} | Global Computer (BD)</title>
        <meta name='description' content={`Buy ${product.title} at the best price in Bangladesh. Latest ${product.brand} ${product.model_name} ${product.category.title} available at Global Computer (BD). Order online to get delivery in BD.`} />
        <meta name='keywords' content={product.title} />
        <meta property='og:title' content={product.title} />
        <meta property='og:description' content={`Buy ${product.title} at the best price in Bangladesh. Latest ${product.brand} ${product.model_name} ${product.category.title} available at Global Computer (BD). Order online to get delivery in BD.`} />
        <meta property='og:type' content='product' />
        <meta property='og:site_name' content='Global Computer (BD)' />
        <meta property='og:image' content={product.images[0].image} />
        <meta property='product:brand' content={product.brand} />
        <meta property='product:availability' content={product.is_stock ? 'IN STOCK' : 'OUT OF STOCK'} />
        <meta property='product:condition' content='new' />
        <meta property='product:price:amount' content={product.price} />
        <meta property='product:price:currency' content='BDT' />
      </Helmet>
    }
    <section id='page' className='product-page single-page'>
        <div className="container">
          {
            product &&
            <div className="wrapper">
                <ProductPageHeader 
                  productCat={product.category} 
                  productTitle={product.title}
                />
                <ProductSection 
                  product={product} 
                />
                <RelatedProduct 
                  productCat={product.category}  
                />
            </div>
          }
          {
            loading && <span className='loading'>Loading</span>
          }
        </div>
    </section>
    </>
  )
}

export default ProductPage