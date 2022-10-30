import React from 'react';
import { Box } from '@mui/material';
import { Carousal } from '3d-react-carousal';


const TestimonialCarousel = () => {
  let slides = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />
  ];
  return (
    <Box>
      <div className="section-title">Testiominals</div>
      <div className="section-content">
        Carousal Placeholder
        {/* <Carousal slides={slides} autoplay={true} interval={1000} /> */}
      </div>
    </Box>
  );
}

export default TestimonialCarousel;
