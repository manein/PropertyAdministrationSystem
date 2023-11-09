import React from 'react';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-item">Home</div>
        <div className="navbar-item">Maintenance</div>
        <div className="navbar-item">Parking</div>
        <div className="navbar-item">Announcements</div>
        <div className="navbar-item">About Us</div>
      </div>
      <div className="navbar-right">
        <div className="navbar-item account-logo">Account</div>
      </div>
    </nav>
  );
};

export default Navbar;