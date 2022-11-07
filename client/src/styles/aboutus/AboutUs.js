import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import Image from 'mui-image';
import { useTheme } from '@emotion/react';
import { padding, style } from '@mui/material/node_modules/@mui/system';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const AboutUs = () => {
  const theme = useTheme()
  const linkBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    // pl: '132px'
  }

  return (
    <Box>

      <Container maxWidth="lg" sx={{ p: 12, pb: 2, mb: 12 }}>
        <Box className="section-title" sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 4,
        }}>
          <Typography variant='h3' sx={{
            borderBottom: 'solid #31d0c6',
            pb: 2,
            borderBottomWidth: '3px',

          }} color={theme.palette.black}>Hire The Team</Typography></Box>

        <Box sx={{
          pt: 10,
          display: 'flex',
          flexDirection: "row",
          justifyContent: 'space-around',


        }}>
          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 2,
          }}>
            <Image src="lawrence.jpeg"
              height='400px' width='400px' style={{ borderRadius: '8%' }} />
            <Typography variant='h4' color={theme.palette.black} textAlign='left'>Lawrence Chan</Typography>
            <Box sx={linkBoxStyle}>
              <Typography sx={{
                fontSize: 22
              }}>
                Coder for hire
              </Typography>
              <Link sx={{
                fontSize: 28
              }} href="https://www.linkedin.com/in/lschan12/">
                <LinkedInIcon />
                LinkedIn
              </Link>
              <Link sx={{
                fontSize: 28
              }} href="https://github.com/lschan12">
                <GitHubIcon />
                Github
              </Link>
            </Box>
          </Box>

          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 2,
          }}>
            <Image src="richard.jpg"
              height='400px' width='400px' style={{ borderRadius: '8%' }} />
            <Typography variant='h4' color={theme.palette.black} textAlign='left'>Richard Stock</Typography>
            <Box sx={linkBoxStyle}>
              <Typography sx={{
                fontSize: 22
              }}>
                Open to work
              </Typography>
              <Link sx={{
                fontSize: 28
              }} href="https://www.linkedin.com/in/-richard-stock/">
                <LinkedInIcon />
                LinkedIn
              </Link>
              <Link sx={{
                fontSize: 28
              }} href="https://github.com/rstock-co">
                <GitHubIcon />
                Github
              </Link>
            </Box>
          </Box>
          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 2,
          }}>
            <Image src="travis.PNG"
              height='400px' width='400px' style={{ borderRadius: '8%' }} />
            <Typography variant='h4' color={theme.palette.black} textAlign='left'>Travis Liu</Typography>

            <Box sx={linkBoxStyle}>
              <Typography sx={{
                fontSize: 22
              }}>
                Needs to pay rent
              </Typography>
              <Link sx={{
                fontSize: 28
              }} href="https://www.linkedin.com/in/travis-liu/">
                <LinkedInIcon /> LinkedIn
              </Link>
              <Link sx={{
                fontSize: 28
              }} href="https://github.com/liucidity">
                <GitHubIcon /> Github
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutUs;
