import React from 'react'

const ProductsBottomCard = () => {
  return (
    <div className="row">
        <div className="item">
            <div className="image">
                <img 
                    src="https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/articleimages/2023/01/13/intel-core-i9-13900ks-processor-1180639-1673594227.jpg?itok=3RGgjdir" 
                    alt="" 
                    loading='lazy'
                />
            </div>
            <div className="content mini-link">
                <h4>Processors</h4>
                <ul className="flexcol">
                    <li><a href="#">Celeron</a></li>
                    <li><a href="#">Core i3</a></li>
                    <li><a href="#">Core i5</a></li>
                    <li><a href="#">Core i7</a></li>
                    <li><a href="#">Core i9</a></li>
                </ul>
                <div className="second-link">
                    <a href="" className="view-all">View all <i className="ri-arrow-right-line"></i></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductsBottomCard