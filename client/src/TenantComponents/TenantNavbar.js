import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth_files/AuthProvider';

export default function TenantNavbar() {
    const navigate = useNavigate();
    const { getUserFromLocalStorage,logOut } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    console.log("saved user is ",user)
    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1"><a href='/tenant' >Hello, {user?.fname}</a></span>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                        <a className="nav-link" href="/tenant">View Announcements</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/postMainReq">Raise Maintenance Request</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/reqGP">Request Guest Parking</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/MyMainReq">View My Maintenance Requests</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/viewMyGPStatus">View My Guest Parking Requests</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/aboutus">About</a>
                    </li>
                </ul>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
