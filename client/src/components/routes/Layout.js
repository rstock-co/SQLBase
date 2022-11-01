import { Outlet, Link } from "react-router-dom";
import useSchemaData from "../../hooks/useSchemaData";
import "./Layout.scss";

const Layout = () => {
  const { saveProgress } = useSchemaData();
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
            <Link to="queries" onClick={saveProgress("state_schema")}>
              Create Queries
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
