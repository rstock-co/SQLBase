import { Card, Typography, Box } from '@mui/material';
import React from 'react';
import './testimonial.scss'
import Image from 'mui-image';

const Testimonial = () => {
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center'
    }}>
      <Image src="http://picsum.photos/300" alt="1" className="swiper-lazy" style={{ borderRadius: '50%', width: '300px', height: '300px' }} />
      <Box sx={{
        marginBottom: 6,
      }}>

        <Typography variant='h5' textAlign='center'>Person's Name</Typography>
        <Typography variant='body2' textAlign='center'>safdasfjriedhanfjkndmskanfkjdnsajkfnejkdwanfjkdnsajk</Typography>
      </Box>
    </Card>
  );
}

export default Testimonial;
