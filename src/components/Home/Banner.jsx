import BannerCard from './BannerCard'
import { banners } from '../../data'

const Banner = () => {
  return (
    <section className="banners">
        <div className="container">
            <div className="wrapper">
                <div className="column">
                    <div className="banner flexwrap">
                        {
                            banners.map(item => (
                                <BannerCard 
                                    key={item.id}
                                    bannerTitle={item.bannerTitle}
                                    bannerSubTitle1={item.bannerSubTitle1}
                                    bannerSubTitle2={item.bannerSubTitle2}
                                    bannerImgUrl={item.bannerImgUrl}
                                    productUrl={item.productUrl}
                                    textColor={item.textColor}
                                />
                            ))
                        }
                    </div>
                    {/* <ProductsCatBottom /> */}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner