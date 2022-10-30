import React from 'react';
import { Box } from '@mui/material';

const TargetUsers = () => {
  return (
    <Box>
      <section className="home-section">
        <div className="section-title">Who is It For</div>
        <div className="section-content">
          <div className="subsection-content">
            <div className="section-image">Image</div>
            <div className="subsection-title">Developers</div>
            <div className="section-text">With SQLBase, as a developer you'll gain the ability to streamline the entire database creation process, use simple yet powerful data visualization tools, and allow you to save valuable time and minimize errors.  Create tables and the relationships between them with a simple form, auto generate SQL language, view and seed your tables, and more. Impress your clients with the speed and efficiency that you can create databases from scratch!</div>
          </div>
          <div className="subsection-content">
            <div className="section-image">Image</div>
            <div className="subsection-title">Business Owners</div>
            <div className="section-text">Grow your business by finally tackling that tech project you've been dreaming of!  SQLBase allows users at any level of familiarity with SQL to start mapping out and converting their business logic into simple tables, or to improve the speed and efficiency of your developer team.  Visualize your project, and allow SQLBase to guide you through the database creation process.</div>
          </div>
          <div className="subsection-content">
            <div className="section-image">Image</div>
            <div className="subsection-title">Database Designers</div>
            <div className="section-text">Even experienced database designers will find SQLBase improves their ability to produce quality performance SQL databases speed and ease.  Go deep with advanced intelligent data visualizations and complex query syntax that can be generated with minimal configuration and effort.</div>
          </div>
        </div>
      </section>
    </Box>
  );
}

export default TargetUsers;
