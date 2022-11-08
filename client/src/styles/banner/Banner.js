import React from 'react';
import { useTheme, useMediaQuery, Container, Box, Typography, Slide, Button, Fade } from '@mui/material'
import PurpleBox from '../components/PurpleBox';
import Image from 'mui-image'
import ParticlesPartial from '../components/ParticlesPartial';
import './banner.scss'
import zIndex from '@mui/material/styles/zIndex';
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const containerRef = React.useRef(null);
  const navigate = useNavigate();

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

      {/* {matches ? <h1>Mobile</h1> : <h1>Desktop</h1>} */}


      <ParticlesPartial className={'particles'} />
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


        <box style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'apart',
          flexWrap: 'wrap',
        }}>

          <Slide direction='up'
            in={true}
            easing={theme.transitions.easing.easeInOut}
            timeout={1000}
            mountOnEnter
            unmountOnExit
            container={containerRef.current}>

            <Typography id="tagline"
              sx={{
                width: 600,
                fontSize: 'h3.fontSize',
                color: 'white',
                textAlign: 'left',
                marginTop: 20,
                marginRight: -6
              }}
            >
              Create your entire database with no code. Generate, seed, and query sample data, to get your project started faster.
            </Typography>


          </Slide >

          <box style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            pt: 12
          }}>

            <Fade in={true} timeout={5000} appear={true}>
              <Button sx={{
                backgroundColor: '#fe854f',
                height: 64,
                width: 300,
                color: '#fff',
                fontSize: '1.3em',
                fontWeight: 'bold',
                boxShadow: '0 11px 32px -6px #fe854f',
                ":hover": {
                  backgroundColor: '#fe854f',
                  boxShadow: 'none'
                },

              }} style={{ marginTop: 36 }}
                onClick={() => {
                  navigate("/tables");
                }}
              >Start SQLBase
              </Button>
            </Fade>
            <Fade in={true} timeout={5000} appear={true}>

              <Button sx={{
                backgroundColor: '#31d0c6',
                height: 64,
                width: 300,
                color: '#fff',
                fontSize: '1.3em',
                fontWeight: 'bold',
                boxShadow: '0 11px 32px -6px #31d0c6',
                ":hover": {
                  backgroundColor: '#31d0c6',
                  boxShadow: 'none'
                },

              }} style={{ marginTop: 36, marginLeft: 24 }}>Free Trial</Button>
            </Fade>

          </box>
        </box>





        <Box
          sx={{
            marginTop: 20,
          }}>


          <Image
            src="tealdiagram.png"
            height="500px"
            width="500px"
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
