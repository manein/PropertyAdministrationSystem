import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth_files/AuthProvider';
import './TenantNavBar.css';

export default function TenantNavbar() {
    const navigate = useNavigate();
    const { getUserFromLocalStorage,logOut } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    console.log("saved user is ",user);
    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-stable">
                    <a className="navbar-stable" href='/tenant' >Hello, {user?.fname}</a>
                </div>
              
                <div className="navbar-item">
                        <a className="nav-link" href="/tenant">View Announcements</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/postMainReq">Raise Maintenance Request</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/reqGP">Request Guest Parking</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/MyMainReq">View My Maintenance Requests</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/viewMyGPStatus">View My Guest Parking Requests</a>
                </div>
                <div className="navbar-item">
                        <a className="nav-link" href="/aboutus">About</a>
                </div>

                <div className="navbar-item">
                        <a className="nav-link" href="/TChangePassword">ChangePassword</a>
                </div>
         </div>
                <div className='navbar-right'>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
        </nav>
    );
}
