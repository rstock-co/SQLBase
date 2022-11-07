import "./Home.scss";
import { React, useState } from "react";
import { Paper, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import theme from "../../styles/theme/theme.js";
import Banner from "../../styles/banner/Banner";
import ProductFeature from "../../styles/product-feature/ProductFeature";
import TargetUsers from "../../styles/product-feature/TargetUsers";
import TestimonialCarousel from "../../styles/product-feature/TestimonialCarousel";
import AboutUs from "../../styles/aboutus/AboutUs";
import PageSplitter from "../../styles/components/PageSplitter";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Keyboard } from "swiper";
import { Box } from "@mui/material/node_modules/@mui/system";

const Home = () => {


  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 3000) {
      setVisible(true)
    }
    else if (scrolled <= 3000) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  window.addEventListener('scroll', toggleVisible);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="false">
        <Paper
          elevation={12}
          className="landing-paper"
          sx={{
            borderRadius: 4,
            marginBottom: 4,
            zIndex: 1,
          }}
        >

          <Banner sx={{ scrollSnapAlign: 'center' }} />

          <PageSplitter
            className="page-splitter"
            src="tealbanner-body.jpg"
            alt="banner-split"

          />
          <ProductFeature sx={{ scrollSnapAlign: 'center' }} />
          <PageSplitter src="body-teal.png" />
          <TargetUsers sx={{ scrollSnapAlign: 'center' }} />
          <PageSplitter src="teal-white.png" />
          <TestimonialCarousel sx={{ scrollSnapAlign: 'center' }} />
          <PageSplitter src="body-teal.png" />
          <PageSplitter src="teal-white.png" />
          <AboutUs sx={{ scrollSnapAlign: 'center' }} />
          <PageSplitter src="body-teal.png" />
          <Button >
            <KeyboardDoubleArrowUpIcon sx={{
              display: visible ? 'inline' : 'none',
              position: 'fixed',
              width: 80,
              height: 80,
              backgroundColor: '#31d0c6',
              borderRadius: "50%",
              right: 60,
              bottom: 40,
              zIndex: 10
            }} onClick={scrollToTop} />
          </Button>
        </Paper>
      </Container>

    </ThemeProvider >
  );
};

export default Home;
