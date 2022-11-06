import "./Home.scss";
import { React } from "react";
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

const Home = () => {
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
            height: '100%',
            component: 'div'
          }}
        >
          <div style={{
            // overflowY: 'auto',
            scrollSnapType: 'y mandatory'
          }}>

            <Banner style={{ scrollSnapAlign: 'center' }} />

            <PageSplitter
              className="page-splitter"
              src="tealbanner-body.jpg"
              alt="banner-split"

            />
            <ProductFeature style={{ scrollSnapAlign: 'center' }} />
            <PageSplitter src="body-teal.png" />
            <TargetUsers style={{ scrollSnapAlign: 'center' }} />
            <PageSplitter src="teal-white.png" />
            <TestimonialCarousel style={{ scrollSnapAlign: 'center' }} />
            <PageSplitter src="body-teal.png" />
            <PageSplitter src="teal-white.png" />
            <AboutUs style={{ scrollSnapAlign: 'center' }} />
            <PageSplitter src="body-teal.png" />
            <Button sx={{
              position: 'fixed'
            }}>
              Back to Top
            </Button>
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
