import React from 'react'
import { Link } from 'react-router-dom'
import { toTitleCase } from '../../Utilities/toTitleCase'

const ProductPageHeader = ({productTitle, productCat}) => {


  
  return (
    <div className="breadcrump">
        <ul className="flexwrap">
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/category?category=${productCat.slug}&page=1`}>{toTitleCase(productCat.slug)}</Link></li>
            <li>{productTitle}</li>
        </ul>
    </div>
  )
}

export default ProductPageHeader