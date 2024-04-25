'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Catalog({catalog}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    handleResize(mediaQuery);

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

    return (
        <Swiper
            modules={[Navigation, Autoplay, Scrollbar, A11y]}
              spaceBetween={10}
              loop={true}
              slidesPerView={isMobile? 1 : 3}
              navigation={{ prevEl: null, nextEl: null }}
              scrollbar={{ draggable: true }}
              autoplay= {{
                delay: 2500,
                disableOnInteraction: false,
              }}
              
         >
            {
                catalog.map((data, index) => {
                    return (
                        <SwiperSlide key={index} className="p-5 flex flex-col gap-5 pb-10">
                            <h1 className="font-semibold lg:text-2xl text-md text-blue-800 my-3 text-center p-2 bg-blue-50 rounded-xl capitalize">{data.name}</h1>
                            <div className="w-full bg-contain object-contain">
                                <Image
                                src={data.photo}
                                width={1000}
                                height={1400}
                                alt={data.alt}
                                className=" object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    )
                })
            }
                
             
            </Swiper>
    )
}