import React from 'react';
import { useTheme, useMediaQuery, Container, Box, Typography, Slide } from '@mui/material'
import PurpleBox from '../components/PurpleBox';
import Image from 'mui-image'
import ParticlesPartial from '../components/ParticlesPartial';
import './banner.scss'
import zIndex from '@mui/material/styles/zIndex';

const Banner = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const containerRef = React.useRef(null);

  return (



    <PurpleBox className={"hero-body"}
      sx={{
        paddingBottom: 0,
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // marginTop: '-1%',
        zIndex: 1
      }
      }
    >
      <ParticlesPartial className={'particles'} />

      {/* {matches ? <h1>Mobile</h1> : <h1>Desktop</h1>} */}

      <Box className={"hero-div"}
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




  );
}

export default Banner;
