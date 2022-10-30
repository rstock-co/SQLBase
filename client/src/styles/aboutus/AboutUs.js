import React from 'react';
import { Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Box>
      <section className="home-section">
        <div className="section-title">The Team</div>
        <div className="section-content">
          <img src="https://picsum.photos/800/302/?random" alt="3" />,
          <img src="https://picsum.photos/800/303/?random" alt="4" />,
          <img src="https://picsum.photos/800/304/?random" alt="5" />
        </div>
      </section>
    </Box>
  );
}

export default AboutUs;
