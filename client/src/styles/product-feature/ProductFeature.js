import React from 'react';
import { Box, Typography } from '@mui/material'
import Image from 'mui-image'

const ProductFeature = () => {


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
          <Typography variant='h4'>Meet SQLBase</Typography></Box>


        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4,
          margin: 4,
        }} >

          <Image src='https://picsum.photos/200' height='250px' width='250px'
            duration={1000}
            shift={"right"}
          />
          <Box className="section-text" width={300}>
            <Typography variant='h6'>Powerful Form Tools</Typography>
            <Typography variant='body2'>SQLBase is a SQL platform that allows users to easily create, query, and seed a database. It delivers a functional database with no code inputs, providing you with the right tools to build your outstanding projects.
              Create a database for your next great idea in minutes, not days, by easily translating your ideas into actual testable data. You can easily picture your business logic with our handy tool</Typography>
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
          <Box width={300}>
            <Typography variant='h6'>Build Complicated Queries</Typography>
            <Typography variant='body2'>Enjoy a full suite of database tools including a query generator. Enables you to create complex filters without knowing SQL syntax. Start manipulating data and get results faster.
              Every business needs a way to sort data quickly. Build filters, with our context-powered forms and get the information that is important to your business.</Typography>
          </Box>
          <Image src='https://picsum.photos/200' height='250px' width='250px' duration={1000}
            shift={"left"}
          />
        </Box>
      </Box >
    </>
  );
}

export default ProductFeature;

