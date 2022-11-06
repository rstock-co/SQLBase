import { Card, Typography, Box } from '@mui/material';
import React from 'react';
import './testimonial.scss'
import Image from 'mui-image';

const Testimonial = (props) => {
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center'
    }}>
      <Image src={props.img} alt="1" className="swiper-lazy" style={{ borderRadius: '50%', width: '300px', height: '300px' }} />
      <Box sx={{
        marginBottom: 6,
      }}>

        <Typography variant='h4' textAlign='center' sx={{ m: 8 }}>{props.name}</Typography>
        <Typography variant='h6' textAlign='center' sx={{ fontStyle: 'italic' }}>{props.review}</Typography>
      </Box>
    </Card>
  );
}

export default Testimonial;
