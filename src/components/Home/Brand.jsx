import React, { useEffect, useState } from 'react'
import { brand } from '../../data'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules';


const Brand = () => {

    const [response, setResponse] = useState()


    const handleBrand = async() => {
        try {
            await fetch(import.meta.env.VITE_API_URL + '/api/brand/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Something went wrong!')
                }
                return response.json()
            }).then(data => {
                setResponse(cat => {
                    return data
                })
            })
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        handleBrand()
    },[])



  return (
    <section className="brands">
        <div className='container'>
            <div className="wrapper">
                <Swiper
                    
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={6}
                    spaceBetween={10}
                    modules={[Autoplay]} 
                    className="mySlider"
                >

                {   
                    response &&
                    response.map(item => (
                        <SwiperSlide  className='flexcenter'>
                            <div key={item.id} className="item">
                                <a>
                                    <img src={item.logo} alt={item.title} />
                                </a>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>

            </div>
        </div>
    </section>
  )
}

export default Brand