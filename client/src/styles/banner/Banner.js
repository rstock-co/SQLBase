import React from 'react';
import { useTheme, useMediaQuery, Container, Box, Typography } from '@mui/material'

const Banner = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (


    <Box className="landing-hero"
      sx={{
        m: 0,
        // flex: 'flex',
        // flexDirection: 'column',
        // flexWrap: 'wrap',
        // zIndex: 'tooltip'
      }
      }
    >
      {/* {matches ? <h1>Mobile</h1> : <h1>Desktop</h1>} */}
      <section className="home-tagline">
        <Typography id="tagline"
        // sx={{
        //   fontSize: 'h4.fontSize',
        //   zIndex: 'tooltip',
        //   color: 'white',
        //   textAlign: 'left'
        // }}
        >
          Create your entire database with no code. Generate, seed, and query sample data, to get your project started faster.
        </Typography>

        <img id="tagline-image" alt="hello" src="diagram.png" />

      </section>
    </Box >

  );
}

export default Banner;
