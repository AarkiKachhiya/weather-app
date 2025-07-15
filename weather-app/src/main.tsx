// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/:cityName" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or your global CSS
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
