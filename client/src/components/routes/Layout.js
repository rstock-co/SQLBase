import { Outlet, Link } from "react-router-dom";
import "./Layout.scss";
import { Paper, Container } from "@mui/material";
import PurpleBox from "../../styles/components/PurpleBox";

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
          <Link to="tables">Create Tables</Link>
        </li>
        <li>
          <Link to="queries">Create Queries</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
  );
};

export default Layout;
