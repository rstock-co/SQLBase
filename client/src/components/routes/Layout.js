import { Outlet, Link } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <nav>
        <h1>SQLBase</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="user-databases">My Databases</Link>
          </li>
          <li>
            <Link to="tables">Create Tables</Link>
          </li>
          <li>
            <Link to="seeds">Create Seeds</Link>
          </li>
          <li>
            <Link to="queries">Create Queries</Link>
          </li>
          <li>
            <Link to="charts">Charts</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
