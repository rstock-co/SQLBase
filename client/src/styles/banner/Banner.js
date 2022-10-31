import React from 'react';
import { useTheme, useMediaQuery, Container, Box, Typography, Slide } from '@mui/material'
import PurpleBox from '../components/PurpleBox';
import Image from 'mui-image'
import ParticlesPartial from '../components/ParticlesPartial';
import './banner.scss'

const Banner = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const containerRef = React.useRef(null);

  return (

    <Box>

      <PurpleBox className="landing-hero"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '-1%'
        }
        }
      >
        {/* {matches ? <h1>Mobile</h1> : <h1>Desktop</h1>} */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }
          }
        >

          {/* {matches ? <h1>Mobile</h1> : <h1>Desktop</h1>} */}

          <Slide direction='up'
            in={true}
            easing={theme.transitions.easing.easeInOut}
            timeout={1000}
            mountOnEnter
            unmountOnExit
            container={containerRef.current}>

            <Typography id="tagline"
              sx={{
                width: 400,
                fontSize: 'h4.fontSize',
                color: 'white',
                textAlign: 'left',
                marginTop: 32,
                marginRight: -6
              }}
            >
              Create your entire database with no code. Generate, seed, and query sample data, to get your project started faster.
            </Typography>
          </Slide >

          <Box
            sx={{
              marginTop: 24,
            }}>


            <Image
              src="diagram.png"
              height="400px"
              width="400px"
              fit="scale-down"
              duration={3000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"

              showLoading={false}
              errorIcon={true}
              shift='right'
              distance="150px"
              shiftDuration={900}
              bgColor="inherit"
            />
          </Box>
        </Box>

      </PurpleBox >
      <ParticlesPartial className="particles" />

    </Box>

  );
}

export default Banner;
