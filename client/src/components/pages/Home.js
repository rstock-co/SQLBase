import "./Home.scss";
import { useEffect, useCallback, useRef } from "react";
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme/theme.js";
import Banner from '../../styles/banner/Banner'
import ProductFeature from "../../styles/product-feature/ProductFeature";
import TargetUsers from "../../styles/product-feature/TargetUsers";
import TestimonialCarousel from "../../styles/product-feature/TestimonialCarousel";
import AboutUs from "../../styles/aboutus/AboutUs";
import PageSplitter from "../../styles/components/PageSplitter";

import { useSpring } from '@react-spring/web'
import { Carousel } from "react-responsive-carousel";



const Home = () => {
  const contentContainerRef = useRef(null);

  const clientHeightRef = useRef(0);
  const [scrollYOffsetSpring, scrollYOffsetSpringApi] = useSpring(() => ({
    yOffset: 0,
  }));

  let slides = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />
  ];

  const onScroll = useCallback((event) => {
    const yOffset = event.currentTarget.scrollTop;

    scrollYOffsetSpringApi.start({
      yOffset,
    });
  }, []);


  useEffect(() => {
    clientHeightRef.current = document.documentElement.clientHeight;
    contentContainerRef.current?.addEventListener('scroll', onScroll);

    return () => {
      contentContainerRef.current?.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='false'>
        <Paper elevation={12} className="landing-paper" sx={{
          borderRadius: 4,
          marginBottom: 4
        }}>
          <Banner />
          <PageSplitter className="page-splitter" src="banner-body.jpeg" alt="banner-split" />
          <ProductFeature />
          <PageSplitter src="body-purple.png" />
          <TargetUsers />
          <PageSplitter src="purple-white.png" />
          <TestimonialCarousel />
          <PageSplitter src="body-purple.png" />
          <PageSplitter src="purple-white.png" />
          <AboutUs />


        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
