import { React, Component } from 'react';
import { ReactDOM } from 'react';
import { Box, Container } from '@mui/material';
import { Carousel } from 'react-responsive-carousel'
import './testimonialCarousel.scss'


const TestimonialCarousel = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center'

  }}>

    <Carousel axis='horizontal' centerMode='true'>
      <div>
        <img alt="" src="http://picsum.photos/100" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img alt="" src="http://picsum.photos/100" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img alt="" src="http://picsum.photos/100" />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img alt="" src="http://picsum.photos/100" />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img alt="" src="http://picsum.photos/100" />
        <p className="legend">Legend 5</p>
      </div>
      <div>
        <img alt="" src="http://picsum.photos/100" />
        <p className="legend">Legend 6</p>
      </div>
    </Carousel>
  </Box>
);


export default TestimonialCarousel;
