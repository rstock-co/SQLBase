import { React, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material'
import Image from 'mui-image'
import HoverVideoPlayer from 'react-hover-video-player'

const ProductFeature = () => {

  const hoverVideoRef = useRef();

  useEffect(() => {
    const videoElement = hoverVideoRef.current;

    videoElement.playbackRate = 2;
  }, []);

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        flexWrap: 'wrap',

      }} >
        <Box className="section-title" sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 4,
        }}>
          <Typography variant='h3'
            sx={{
              borderBottom: 'solid #31d0c6',
              pb: 2,
              borderBottomWidth: '3px',

            }}>Meet SQLBase</Typography>
        </Box>


        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4,
          margin: 4,
        }} >

          {/* <Image src='https://picsum.photos/450' height='450px' width='450px'
            duration={1000}
            shift={"right"}
          /> */}
          <HoverVideoPlayer
            videoRef={hoverVideoRef}
            videoSrc="./CreateAndSeed.mp4"
            restartOnPaused
            style={{
              width: '45%',
              height: '45%'
            }}
            pausedOverlay={
              <img
                src="formSS.png"
                alt=""
                style={{
                  // Make the image expand to cover the video's dimensions
                  width: '100%',
                  height: '100%',
                  // objectFit: 'cover',
                }}
              />
            }
            loadingOverlay={
              <div className="loading-overlay">
                <div className="loading-spinner" />
              </div>
            } />

          <Box className="section-text" width={420} sx={{
            mr: 48
          }}>
            <Typography variant='h4' sx={{
              mt: 4
            }}>Powerful Form Tools</Typography>
            <Typography sx={{
              fontSize: 24,
              pt: 2
            }}>SQLBase is a SQL platform that allows users to easily create, query, and seed a database. It delivers a functional database with no code inputs, providing you with the right tools to build your outstanding projects.
            </Typography>
            <Typography sx={{
              fontSize: 24,
              pt: 2
            }}>
              Create a database for your next great idea in minutes, not days, by easily translating your ideas into actual testable data. You can easily picture your business logic with our handy tool

            </Typography>
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'wrap',
          margin: 4,
        }}>
          <Box width={420} sx={{
            ml: 48
          }}>
            <Typography variant='h4' sx={{
              mt: 4
            }}>Build Complicated Queries</Typography>
            <Typography sx={{
              fontSize: 24,
              pt: 2
            }}>Enjoy a full suite of database tools including a query generator. Enables you to create complex filters without knowing SQL syntax. Start manipulating data and get results faster.</Typography>
            <Typography sx={{
              fontSize: 24,
              pt: 2
            }}>
              Build filters, with our context-powered forms and get the information that is important to your business.

            </Typography>
          </Box>
          <HoverVideoPlayer
            videoRef={hoverVideoRef}
            videoSrc="./CreateAndSeed.mp4"
            restartOnPaused
            style={{
              width: '45%',
              height: '45%'
            }}
            pausedOverlay={
              <img
                src="formSS.png"
                alt=""
                style={{
                  // Make the image expand to cover the video's dimensions
                  width: '100%',
                  height: '100%',
                  // objectFit: 'cover',
                }}
              />
            }
            loadingOverlay={
              <div className="loading-overlay">
                <div className="loading-spinner" />
              </div>
            } />
        </Box>
      </Box >
    </>
  );
}

export default ProductFeature;

