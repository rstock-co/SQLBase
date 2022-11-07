import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "mui-image";
import { Card, Typography } from '@mui/material'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";

import "./testimonialCarousel.scss"


// import required modules
import { Pagination, Navigation, Lazy, Autoplay } from "swiper";
import { Box, Container } from "@mui/material";
import Testimonial from "./Testimonial";


const testimonials = [
  { img: './andy.jpeg', name: 'Andy Lindsay', review: '-\"It\'s better than my robot car!\"' },
  { img: './francis.jpg', name: 'Francis Bourgouin', review: '-\"This DOES sound good everybody.\"' },
  { img: './nally.jpg', name: 'Christian Nally', review: '-\"You have a solid project on your hands.\"' },
  { img: './vasiliy.jpeg', name: 'Vasiliy Klimkin', review: '-\"You probably will use this!\"' },
]

export default function TestimonialCarousel() {

  return (
    <Container maxWidth='md' sx={{
      p: 6,
    }}>

      <Box className="section-title" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        margin: 6,
      }}>
        <Typography variant='h3' sx={{
          borderBottom: 'solid #31d0c6',
          pb: 2,
          borderBottomWidth: '4px',

        }}>Top Reviews</Typography>
        <Box sx={{ width: '900px', marginTop: 16 }}>

          <Swiper
            slidesPerView={1}
            watchSlidesProgress={true}
            spaceBetween={30}
            loop={true}

            autoplay={{ delay: 3000 }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Lazy, Autoplay]}
            className="mySwiper"
            style={{}}
          >
            {testimonials.map((testimonial) => {
              return (

                <SwiperSlide>
                  <Testimonial img={testimonial.img} name={testimonial.name} review={testimonial.review} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Box>
      </Box>
    </Container>
  );
}
