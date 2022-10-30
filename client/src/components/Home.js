import "./Home.scss";
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import Banner from '../styles/banner/Banner'
import ProductFeature from "../styles/product-feature/ProductFeature";
import TargetUsers from "../styles/product-feature/TargetUsers";
import TestimonialCarousel from "../styles/product-feature/TestimonialCarousel";
import AboutUs from "../styles/aboutus/AboutUs";




const Home = () => {
  return (
    <main>
      <Paper elevation={12} className="landing-paper">
        <Banner />
        <img className="page-splitter" src="banner-body.jpeg" alt="banner-split" />
        <Container sx={{ p: 6, }} >
          <ProductFeature />
          <br />
          <TargetUsers />
          <TestimonialCarousel />
          <AboutUs />





        </Container>
      </Paper>
    </main >
  )
};

export default Home;