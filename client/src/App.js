import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedElement from './Auth_files/ProtectedElement';
import { AuthProvider } from  './Auth_files/AuthProvider';

import Home from './Home';
import Navbar from './NavBar';
import GuestParking from './GuestParking';
import AboutUs from './Aboutus';
import Login from './Login';
import SignUp from './SignUp';
import ManageTenants from './AdminComponents/ManageTenants';
import ManageAnnouncements from './AdminComponents/ManageAnnouncements';
import ViewAnnouncements from './TenantComponets/ViewAnnouncements';
import PostMaintenanceRequest from './TenantComponets/PostMaintenanceRequest';
import MaintenanceRequestList from './MaintainceTeamComponents/MaintenanceRequestList';
import TenantMaintenanceRequests from './TenantComponets/TenantMaintenanceRequests';
import RequestGuestParking from './TenantComponets/RequestGuestParking';
import GuestParkingManager from './SecurityComponents/GuestParkingManager';
import TenantGuestParkingStatus from './TenantComponets/TenantGuestParkingStatus';

import AdminDash from './AdminComponents/AdminDash';
import MaintenanceDash from './MaintainceTeamComponents/MaintenanceDash';
import TenantDash from './TenantComponets/TenantDash';
import SecurityDash from './SecurityComponents/SecurityDash';
    

function App() {
    return (
        <AuthProvider>
          <Router>
            <Routes>
            <Route path="/admin"  element={<ProtectedElement><AdminDash /></ProtectedElement> } />
                <Route path="/maintenance" element={<ProtectedElement><MaintenanceDash /></ProtectedElement> } />
                <Route path="/tenant"  element={<ProtectedElement><TenantDash /></ProtectedElement> } />
                <Route path="/security"   element={<ProtectedElement><SecurityDash /></ProtectedElement> } />

                <Route path="/home" element={<Home />}/>
                <Route path="/navbar" element={<Navbar />}/>
                <Route path="/guestparking" element={<GuestParking />}/>
                <Route path="/aboutus" element={<AboutUs />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/" element={<SignUp />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/manageTenant" element={<ManageTenants />}/>
                <Route path="/manageAnnounc" element={<ManageAnnouncements />}/>
                <Route path="/viewAnnounc" element={<ViewAnnouncements />}/>
                <Route path="/postMainReq" element={<ProtectedElement><PostMaintenanceRequest /></ProtectedElement>}/>
                
                <Route path="/MyMainReq" element={<ProtectedElement><TenantMaintenanceRequests /></ProtectedElement>}/>
                
                <Route path="/reqGP" element={<ProtectedElement><RequestGuestParking /></ProtectedElement>}/>
                <Route path="/manageGP" element={<ProtectedElement><GuestParkingManager /></ProtectedElement>}/>
                
                <Route path="/viewMyGPStatus" element={<ProtectedElement><TenantGuestParkingStatus /></ProtectedElement>}/>
                

                <Route path="/MainReqList" element={<ProtectedElement><MaintenanceRequestList /></ProtectedElement>}/>
            </Routes>
      </Router>
    </AuthProvider>
      );

};

export default App;