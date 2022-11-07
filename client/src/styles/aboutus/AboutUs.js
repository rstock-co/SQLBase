import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Image from 'mui-image';
import { useTheme } from '@emotion/react';

const AboutUs = () => {
  const theme = useTheme()

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

          }} color={theme.palette.black}>The Team</Typography></Box>

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
            <Image src="https://picsum.photos/400"
              height='400px' width='400px' />
            <Typography variant='h4' color={theme.palette.black} textAlign='center'>Developers</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.black} textAlign='center' sx={{
              fontSize: 20
            }}>With SQLBase, as a developer you'll gain the ability to streamline the entire database creation process, use simple yet powerful data visualization tools, and allow you to save valuable time and minimize errors.  Create tables and the relationships between them with a simple form, auto generate SQL language, view and seed your tables, and more. Impress your clients with the speed and efficiency that you can create databases from scratch!</Typography>
          </Box>

          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 2,
          }}>
            <Image src="https://picsum.photos/400"
              height='400px' width='400px' />
            <Typography variant='h4' color={theme.palette.black} textAlign='center'>Developers</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.black} textAlign='center' sx={{
              fontSize: 20
            }}>With SQLBase, as a developer you'll gain the ability to streamline the entire database creation process, use simple yet powerful data visualization tools, and allow you to save valuable time and minimize errors.  Create tables and the relationships between them with a simple form, auto generate SQL language, view and seed your tables, and more. Impress your clients with the speed and efficiency that you can create databases from scratch!</Typography>
          </Box>
          <Box className="subsection-content" sx={{
            width: '400px',
            margin: 2,
          }}>
            <Image src="https://picsum.photos/400"
              height='400px' width='400px' />
            <Typography variant='h4' color={theme.palette.black} textAlign='center'>Developers</Typography>
            <br />
            <Typography className="section-text" color={theme.palette.black} textAlign='center' sx={{
              fontSize: 20
            }}>With SQLBase, as a developer you'll gain the ability to streamline the entire database creation process, use simple yet powerful data visualization tools, and allow you to save valuable time and minimize errors.  Create tables and the relationships between them with a simple form, auto generate SQL language, view and seed your tables, and more. Impress your clients with the speed and efficiency that you can create databases from scratch!</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutUs;
