import "./App.css";
import useApplicationData from "./hooks/useApplicationData";
import { ThemeProvider } from "@mui/system";
import { Button, Container } from '@mui/material';
import { useEffect } from "react";
import Banner from "./styles/banner.js/banner";


const App = () => {
  const { state, dispatch } = useApplicationData();
  const userList = state.users.map(user => (
    <li key={user.id}>
      {" "}
      {user.first_name} {user.last_name} {user.email}{" "}
    </li>
  ));
  return (
    // <div className="App">
    //   <h1> Users </h1>

    //   <ul> {userList} </ul>
    // </div>
    <>
      <Banner />
    </>
  );
};

export default App;
