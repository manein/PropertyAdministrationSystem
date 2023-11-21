import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Navbar from './NavBar';
import GuestParking from './GuestParking';
import AboutUs from './Aboutus';
import Login from './Login';

const routes = createRoutesFromElements(
    <>
    <Route path="/home" element={<Home />}/>
    <Route path="/navbar" element={<Navbar />}/>
    <Route path="/guestparking" element={<GuestParking />}/>
    <Route path="/aboutus" element={<AboutUs />}/>
    <Route path="/login" element={<Login />}/>
    </>
  )

  const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
