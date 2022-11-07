import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import PurpleBox from '../components/PurpleBox';
import Image from 'mui-image'
import ParticlesPartial from '../components/ParticlesPartial';


const TargetUsers = () => {
  const theme = useTheme();

  return (
    <PurpleBox>
      <Container maxWidth="lg" sx={{ p: 6, pb: 2 }}>
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

            }} color={theme.palette.white}>Target Users</Typography></Box>

        <Box sx={{
          pt: 10,
          display: 'flex',
          flexDirection: "row",
          justifyContent: 'space-around',


        }}>
          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 6,
            mb: 0
          }}>
            <Image src="./developers.png"
              height='400px' width='400px' />
            <Typography variant='h4' color={theme.palette.white} textAlign='center' sx={{ mt: "1em" }}>Developers</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.white} textAlign='center' sx={{
              fontSize: 21
            }}>With SQLBase, you'll gain the ability to streamline the entire database creation process, use simple yet powerful data visualization tools, and allow you to save valuable time and minimize errors.
            </Typography>
            <Typography className="section-text" color={theme.palette.white} textAlign='center' sx={{
              pt: 2,
              fontSize: 21
            }}>Create tables and the relationships with a simple form, auto generate SQL language, view and seed your tables, and more. Impress your clients with the speed and efficiency that you can create databases from scratch!
            </Typography>
          </Box>

          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 6,
            mb: 0
          }}>
            <Image src="startingasmallbiz.png"
              height='400px' width='400px' />
            <Typography variant='h4' color={theme.palette.white} textAlign='center' sx={{ mt: "1em" }}>Business Owners</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.white} textAlign='center' sx={{
              fontSize: 21
            }}>Grow your business by finally tackling that tech project you've been dreaming of! SQLBase allows users to start mapping out and converting their business logic into simple tables with no coding required!
            </Typography>
            <Typography className="section-text" color={theme.palette.white} textAlign='center' sx={{
              pt: 2,
              fontSize: 21
            }}> Improve the speed and efficiency of your developer team and visualize your project. Allow SQLBase to guide you through the database creation process.
            </Typography>
          </Box>
          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 6,
            mb: 0
          }}>
            <Image src="databasedesigners.jpg"
              height='400px' width='400px' />
            <Typography variant='h4' color={theme.palette.white} textAlign='center' sx={{ mt: "1em" }}>Database Designers</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.white} textAlign='center' sx={{
              fontSize: 21
            }}>Even experienced database designers will find SQLBase improves their ability to produce quality performance SQL databases speed and ease. </Typography>
            <Typography className="section-text" color={theme.palette.white} textAlign='center' sx={{
              pt: 2,
              fontSize: 21
            }}> Go deep with advanced intelligent data visualizations and complex query syntax that can be generated with minimal configuration and effort.
            </Typography>
          </Box>
        </Box>
      </Container>
    </PurpleBox>
  );
}

export default TargetUsers;
