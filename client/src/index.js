import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/routes/Layout";
import Home from "./components/pages/Home";
import CreateSchemaPage from "./components/pages/CreateSchema";
import CreateQueriesPage from "./components/pages/CreateQueries";
import GlobalProvider from "./state/GlobalStateProvider";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tables" element={<CreateSchemaPage />} />
            <Route path="queries" element={<CreateQueriesPage />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
