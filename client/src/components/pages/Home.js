import "./Home.scss";
import {Carousel} from '3d-react-carousal';

let slides = [
    <img  src="https://picsum.photos/800/300/?random" alt="1" />,
    <img  src="https://picsum.photos/800/301/?random" alt="2" />  ,
    <img  src="https://picsum.photos/800/302/?random" alt="3" />  ,
    <img  src="https://picsum.photos/800/303/?random" alt="4" />  ,
    <img src="https://picsum.photos/800/304/?random" alt="5" />   
  ];

const Home = () => {
  return (
    <main>
      <section className="home-tagline">
        <div id="tagline">Create your entire database with no code. Generate, seed, and query sample data, to get your project started faster.</div>
        <div id="tagline-image">Image</div>
      </section>
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
      <section className="home-section">
        <div className="section-title">Testiominals</div>
        <div className="section-content">
          <Carousel slides={slides} autoplay={true} interval={1000}/>
        </div>
      </section>
    </main>
  )
};

export default Home;