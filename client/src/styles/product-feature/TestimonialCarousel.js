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
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 6,
      }}>
        <Typography variant='h4'>Top Reviews</Typography>
      </Box>
      <Box sx={{ m: 12 }}>

        <Swiper
          slidesPerView={1}
          watchSlidesProgress={true}
          spaceBetween={30}
          loop={true}

          autoplay={{ delay: 5000 }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Lazy, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => {
            return (

              <SwiperSlide>
                <Testimonial img={testimonial.img} name={testimonial.name} review={testimonial.review} />
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>
            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center'
            }}>
              <Image src="http://picsum.photos/400" alt="1" className="swiper-lazy" style={{ borderRadius: '50%', width: '300px', height: '300px' }} />
              <Box sx={{
                marginBottom: 6,
              }}>

                <Typography variant='h5' textAlign='center' sx={{ mt: 6 }}>Person's Name</Typography>
                <Typography variant='body2' textAlign='center' sx={{ mt: 6 }}>safdasfjriedhanfjkndmskanfkjdnsajkfnejkdwanfjkdnsajk</Typography>
              </Box>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center'
            }}>
              <Image src="http://picsum.photos/410" alt="1" className="swiper-lazy" style={{ borderRadius: '50%', width: '300px', height: '300px' }} />
              <Box sx={{
                marginBottom: 6,
              }}>

                <Typography variant='h5' textAlign='center'>Person's Name</Typography>
                <Typography variant='body2' textAlign='center'>safdasfjriedhanfjkndmskanfkjdnsajkfnejkdwanfjkdnsajk</Typography>
              </Box>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center'
            }}>
              <Image src="http://picsum.photos/420" alt="1" className="swiper-lazy" style={{ borderRadius: '50%', width: '300px', height: '300px' }} />
              <Box sx={{
                marginBottom: 6,
              }}>

                <Typography variant='h5' textAlign='center'>Person's Name</Typography>
                <Typography variant='body2' textAlign='center'>safdasfjriedhanfjkndmskanfkjdnsajkfnejkdwanfjkdnsajk</Typography>
              </Box>
            </Card>
          </SwiperSlide> */}
        </Swiper>
      </Box>
    </Container>
  );
}
