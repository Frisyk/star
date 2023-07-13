'use client'
import { catalogData } from './catalogData';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Catalog() {
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
              slidesPerView={isMobile? 2 : 5}
              navigation={{ prevEl: null, nextEl: null }}
              scrollbar={{ draggable: true }}
              autoplay= {{
                delay: 2500,
                disableOnInteraction: false,
              }}
              
         >
            {
                catalogData.map((data, index) => {
                    return (
                        <SwiperSlide key={index} className="p-5 flex flex-col gap-5 pb-10">
                            <div className="w-full bg-contain object-contain">
                                <Image
                                src={data.photo}
                                width={200}
                                height={400}
                                alt={data.alt}
                                className="w-full h-[200px] object-cover"
                                />
                            </div>
                            <h1 className="font-semibold text-xl my-3 capitalize">{data.name}</h1>
                            <p>{data.desc}</p>
                        </SwiperSlide>
                    )
                })
            }
                
             
            </Swiper>
    )
}