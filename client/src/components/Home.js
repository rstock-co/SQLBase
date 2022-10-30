import "./Home.scss";
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import Banner from '../styles/banner/Banner'
import ProductFeature from "../styles/product-feature/ProductFeature";
import TargetUsers from "../styles/product-feature/TargetUsers";
import TestimonialCarousel from "../styles/product-feature/TestimonialCarousel";
import AboutUs from "../styles/aboutus/AboutUs";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme/theme.js";
import PageSplitter from "../styles/components/PageSplitter";




const Home = () => {
  return (
    <ThemeProvider theme={theme}>

      <Container maxWidth='false'>

        <Paper elevation={12} className="landing-paper">
          <Banner />
          <PageSplitter className="page-splitter" src="banner-body.jpeg" alt="banner-split" />
          <Container maxWidth='md' sx={{ p: 6, }} >
            <ProductFeature />
            <br />
            <TargetUsers />
            <TestimonialCarousel />
            <AboutUs />





          </Container>
        </Paper>
      </Container>
    </ThemeProvider>

  )
};

export default Home;