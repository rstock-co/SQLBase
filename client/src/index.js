import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import Home from './components/Home';
import Tables from './components/Tables';
import Queries from './components/Queries';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tables" element={<Tables />} />
          <Route path='queries'element={<Queries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
