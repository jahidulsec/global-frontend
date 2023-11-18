import React, { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useGeneralGet } from '../../hooks/useGeneralGet';
import { Link } from 'react-router-dom';



const Slider = () => {

    const [sliderRes, handleSliderGET] = useGeneralGet()

    useEffect(() => {
        handleSliderGET(`slider`)
    },[])
    
  return (
    <>
        
        <div className="slider">
            <div className="container">
                <div className="wrapper">
                    <Swiper 
                        loop={true}
                        autoplay={{
                            delay: 4500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Autoplay]} 
                        className="mySwiper"
                    >
                        {
                            sliderRes &&
                            sliderRes.map(item => (
                                <SwiperSlide key={item.id}>
                                    <div className="item">
                                        <div className="image object-cover">
                                            <img
                                                src={item?.image} 
                                                alt={item?.product.slug}
                                                />
                                        </div>
                                        <div 
                                            className="text-content flexcol"
                                            style={{color: `${item?.color ? `#fff`:`#0a021c`}`}}
                                        >
                                            <h4>{item.category}</h4>
                                            <h2>
                                                <span>{item?.mini_text} <br /> 
                                                </span>
                                                <span>
                                                    {item?.mid_text}
                                                </span>
                                            </h2>
                                            <Link to={`/product/${item.product.slug}`} className="primary-btn flexitem gap-1">
                                                <span>Shop Now</span>
                                                <span className='ri-arrow-right-line'></span>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
        
        
    </>
  )
}

export default Slider