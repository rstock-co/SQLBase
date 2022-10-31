import React from 'react';
import { Box, Container } from '@mui/material';
import { Carousal } from '3d-react-carousal';


const TestimonialCarousel = (slides) => {

  return (
    <Container maxWidth='md' sx={{ p: 6, }} >

      <Box>
        <div className="section-title">Testiominals</div>
        <div className="section-content">
          Carousal Placeholder
          {/* <Carousal slides={slides} autoplay={true} interval={1000} /> */}
        </div>
      </Box>
    </Container>
  );
}

export default TestimonialCarousel;
