import React from 'react'

const BannerCard = ({bannerTitle, bannerSubTitle1, bannerSubTitle2, bannerImgUrl, productUrl, textColor}) => {
  return (
    <article className="row">
        <div className="item" style={{color: `${textColor}`}}>
            <div className="image">
                <img src={bannerImgUrl} alt={bannerTitle} loading='lazy' />
            </div>
            <div className="text-content flexcol">
                <h3>{bannerTitle}</h3>
                <h4>
                    <span>{bannerSubTitle1}</span>
                    <br />
                    <span>{bannerSubTitle2}</span>
                </h4>
                <button className="primary-btn">
                    <a href={productUrl}>Shop Now</a>
                </button>
            </div>
            <a href={productUrl} className="over-link"></a>
        </div>
    </article>
    )
}

export default BannerCard