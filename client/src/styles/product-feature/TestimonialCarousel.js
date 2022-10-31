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
        <Typography variant='h4'>Meet SQLBase</Typography>
      </Box>
      <Box sx={{m:6}}>

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
          <SwiperSlide>
            <Testimonial />
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center'
            }}>
              <Image src="http://picsum.photos/400" alt="1" className="swiper-lazy" style={{ borderRadius: '50%', width: '300px', height: '300px' }} />
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
          </SwiperSlide>
        </Swiper>
      </Box>
    </Container>
  );
}
