import React,{useContext} from 'react'
import { useNavigate, } from 'react-router-dom';
import { AuthContext } from '../Auth_files/AuthProvider';

export default function AdminNav() {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Hello, Admin</span>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/manageTenant">Manage Tenants</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/manageAnnounc">Manage Announcements</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">View Announcements</a>
                        </li>
                    </ul>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
  )
}