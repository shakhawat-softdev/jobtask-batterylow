import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
import { MyContextProvider } from './Providers/MyContextProvider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyContextProvider>
    <RouterProvider router={router} />
  </MyContextProvider>
);

reportWebVitals();
