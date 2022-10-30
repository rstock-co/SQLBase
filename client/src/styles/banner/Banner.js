import React from 'react';
import { useTheme, useMediaQuery, Container, Box, Typography } from '@mui/material'
import PurpleBox from '../components/PurpleBox';

const Banner = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (


    <PurpleBox className="landing-hero"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }
      }
    >
      {/* {matches ? <h1>Mobile</h1> : <h1>Desktop</h1>} */}

      <Typography id="tagline"
        sx={{
          width: 300,
          fontSize: 'h6.fontSize',
          zIndex: 'tooltip',
          color: 'white',
          textAlign: 'left',
          marginTop: 24,
          marginLeft: 24
        }}
      >
        Create your entire database with no code. Generate, seed, and query sample data, to get your project started faster.
      </Typography>

      <Image id="tagline-image" alt="hello" src="diagram.png" width={300} />


    </PurpleBox>

  );
}

export default Banner;
