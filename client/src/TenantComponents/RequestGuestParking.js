import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';

const RequestGuestParking = () => {
    const [carType, setCarType] = useState('');
    const [vehicleNum, setVehicleNum] = useState('');
    const [name, setName] = useState('');
    const [requestedFrom, setRequestedFrom] = useState('');
    const [requestedTo, setRequestedTo] = useState('');
    
    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestPayload = {
            carType,
            VehicleNum: vehicleNum,
            Name: name,
            requestedBy: user ? user._id : null,
            requestedFrom,
            requestedTo
        };

        axios.post('http://localhost:9000/guestParking/request', requestPayload)
            .then(response => {
                // Handle the response, maybe clear the form or show a success message
                console.log('Parking Request Submitted:', response.data);
                alert("request submitted succesfully.")
                setCarType('')
                setVehicleNum('')
                setName('')
                setRequestedFrom('')
                setRequestedTo('')
            })
            .catch(error => {
                console.log('Error submitting parking request:', error);
            });
    };

    return (
        <>
        <TenantNavbar/>
        <div className="container mt-3">
            <h2 className="text-center mb-4">Request Guest Parking</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="carType" className="form-label">Car Type</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="carType" 
                        value={carType} 
                        onChange={(e) => setCarType(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="vehicleNum" className="form-label">Vehicle Number</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="vehicleNum" 
                        value={vehicleNum} 
                        onChange={(e) => setVehicleNum(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Guest's Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="requestedFrom" className="form-label">Requested From</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="requestedFrom" 
                        value={requestedFrom} 
                        onChange={(e) => setRequestedFrom(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="requestedTo" className="form-label">Requested To</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="requestedTo" 
                        value={requestedTo} 
                        onChange={(e) => setRequestedTo(e.target.value)} 
                        required 
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default RequestGuestParking;
