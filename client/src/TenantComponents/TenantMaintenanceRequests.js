import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';

const TenantMaintenanceRequests = () => {
    const [requests, setRequests] = useState([]);
    const { user } = useContext(AuthContext);
    const userId = user ? user._id : "";

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:9000/maintenanceRequests/tenant/${userId}`)
                .then(response => {
                    setRequests(response.data);
                })
                .catch(error => {
                    console.log('Error fetching maintenance requests:', error);
                });
        }
    }, [userId]);

    const handleStatusChange = (requestId) => {
        axios.put(`http://localhost:9000/maintenanceRequests/update/${requestId}`)
            .then(response => {
                const updatedRequest = response.data;
                const updatedRequests = requests.map(request => 
                    request._id === requestId ? updatedRequest : request
                );
                setRequests(updatedRequests);
                console.log(updatedRequests); // Log to verify the updated state
            })
            .catch(error => {
                console.log('Error updating status:', error);
            });
    };

    return (
        <>
        <TenantNavbar/>
        <div className="container mt-3">
            <h2 className="text-center mb-4">My Maintenance Requests</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request._id}>
                            <td>{request.category}</td>
                            <td>{request.description}</td>
                            <td>{request.isresolved ? 'Resolved' : 'Unresolved'}</td>
                            <td>
                                <button 
                                    className={`btn ${request.isresolved ? 'btn-success' : 'btn-warning'}`}
                                    onClick={() => handleStatusChange(request._id)}
                                >
                                    {request.isresolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};



export default TenantMaintenanceRequests;
