import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import PurpleBox from '../components/PurpleBox';
import Image from 'mui-image'

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
          <Typography variant='h4' color={theme.palette.white}>Target Users</Typography></Box>

        <Box sx={{
          pt: 10,
          display: 'flex',
          flexDirection: "row",
          justifyContent: 'space-around',


        }}>
          <Box className="subsection-content" sx={{
            width: '350px',
            margin: 2,
          }}>
            <Image src="https://picsum.photos/350"
              height='350px' width='350px' />
            <Typography variant='h5' color={theme.palette.white} textAlign='center'>Developers</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.white} textAlign='center'>With SQLBase, as a developer you'll gain the ability to streamline the entire database creation process, use simple yet powerful data visualization tools, and allow you to save valuable time and minimize errors.  Create tables and the relationships between them with a simple form, auto generate SQL language, view and seed your tables, and more. Impress your clients with the speed and efficiency that you can create databases from scratch!</Typography>
          </Box>

          <Box className="subsection-content" sx={{
            width: '350px',
            margin: 2,
          }}>
            <Image src="https://picsum.photos/200"
              height='350px' width='350px' />
            <Typography variant='h5' color={theme.palette.white} textAlign='center'>Business Owners</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.white} textAlign='center'>Grow your business by finally tackling that tech project you've been dreaming of!  SQLBase allows users at any level of familiarity with SQL to start mapping out and converting their business logic into simple tables, or to improve the speed and efficiency of your developer team.  Visualize your project, and allow SQLBase to guide you through the database creation process.</Typography>
          </Box>
          <Box className="subsection-content" sx={{
            width: '350px',
            margin: 2,
          }}>
            <Image src="https://picsum.photos/200"
              height='350px' width='350px' />
            <Typography variant='h5' color={theme.palette.white} textAlign='center'>Database Designers</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.white} textAlign='center'>Even experienced database designers will find SQLBase improves their ability to produce quality performance SQL databases speed and ease.  Go deep with advanced intelligent data visualizations and complex query syntax that can be generated with minimal configuration and effort.</Typography>
          </Box>
        </Box>
      </Container>
    </PurpleBox>
  );
}

export default TargetUsers;
