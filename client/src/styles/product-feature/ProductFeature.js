import React from 'react';

const ProductFeature = () => {
  return (
    <div>
      <section className="home-section">
        <div className="section-title">Meet SQLBase</div>
        <div className="section-content">
          <div className="section-image">Image</div>
          <div className="section-text">
            <h3>Powerful Form Tools</h3>
            <h5>SQLBase is a SQL platform that allows users to easily create, query, and seed a database. It delivers a functional database with no code inputs, providing you with the right tools to build your outstanding projects.
              Create a database for your next great idea in minutes, not days, by easily translating your ideas into actual testable data. You can easily picture your business logic with our handy tool</h5>
          </div>
        </div>
        <div className="section-content">
          <div className="section-text">
            <h3>Build Complicated Queries</h3>
            <h5>Enjoy a full suite of database tools including a query generator. Enables you to create complex filters without knowing SQL syntax. Start manipulating data and get results faster.
              Every business needs a way to sort data quickly. Build filters, with our context-powered forms and get the information that is important to your business.</h5>
          </div>
          <div className="section-image">Image</div>
        </div>
      </section>
    </div>
  );
}

export default ProductFeature;

