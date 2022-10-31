import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PurpleBox from '../components/PurpleBox';
import Image from 'mui-image'

const TargetUsers = () => {
  return (
    <PurpleBox>
      <Container maxWidth="lg" sx={{ p: 6 }}>
        <Box className="section-title" sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 4,
        }}>
          <Typography variant='h4'>Target Users</Typography></Box>

        <Box sx={{
          pt: 10,
          display: 'flex',
          flexDirection: "row",
          justifyContent: 'space-around',
          marginLeft: 2,
          marginRight: 2,


        }}>
          <Box className="subsection-content" sx={{
            width: '300px'
          }}>
            <Image src="https://picsum.photos/200"
              height='250px' width='250px' />
            <div className="subsection-title">Developers</div>
            <div className="section-text">With SQLBase, as a developer you'll gain the ability to streamline the entire database creation process, use simple yet powerful data visualization tools, and allow you to save valuable time and minimize errors.  Create tables and the relationships between them with a simple form, auto generate SQL language, view and seed your tables, and more. Impress your clients with the speed and efficiency that you can create databases from scratch!</div>
          </Box>

          <Box className="subsection-content" sx={{
            width: '300px'
          }}>
            <Image src="https://picsum.photos/200"
              height='250px' width='250px' />
            <div className="subsection-title">Business Owners</div>
            <div className="section-text">Grow your business by finally tackling that tech project you've been dreaming of!  SQLBase allows users at any level of familiarity with SQL to start mapping out and converting their business logic into simple tables, or to improve the speed and efficiency of your developer team.  Visualize your project, and allow SQLBase to guide you through the database creation process.</div>
          </Box>
          <Box className="subsection-content" sx={{
            width: '300px'
          }}>
            <Image src="https://picsum.photos/200"
              height='250px' width='250px' />
            <div className="subsection-title">Database Designers</div>
            <div className="section-text">Even experienced database designers will find SQLBase improves their ability to produce quality performance SQL databases speed and ease.  Go deep with advanced intelligent data visualizations and complex query syntax that can be generated with minimal configuration and effort.</div>
          </Box>
        </Box>
      </Container>
    </PurpleBox>
  );
}

export default TargetUsers;
