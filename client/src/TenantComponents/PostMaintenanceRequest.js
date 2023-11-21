import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth_files/AuthProvider';
import TenantNavbar from './TenantNavbar';

const PostMaintenanceRequest = () => {
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [availableTimings, setAvailableTimings] = useState('');
    const { getUserFromLocalStorage } = useContext(AuthContext);
    const user = getUserFromLocalStorage();

    const userId  = user ? user._id : ""
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestPayload = {
            priority,
            category,
            description,
            availableTimings,
            tenantId : userId
        };
        
        try {
            const response = await axios.post('http://localhost:9000/maintenanceRequests', requestPayload)
            .then((res) => {alert("Request Posted successfully");
            setPriority('')
            setCategory('')
            setDescription('')
            setAvailableTimings('')
            console.log(response.data);})
            // Handle the response or reset form as needed
        } catch (error) {
            console.error('Error submitting maintenance request:', error);
        }
    };

    return (
        <>
        <TenantNavbar/>
        <div className="container mt-3 ">
            <h2 className="text-center mb-4">Post Maintenance Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="prioritySelect" className="form-label">Priority*</label>
                    <select id="prioritySelect" className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="categorySelect" className="form-label">Category*</label>
                    <select id="categorySelect" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="Electricity">Electricity</option>
                        <option value="House Service">House Service</option>
                        <option value="Plumbing">Plumbing</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptionTextArea" className="form-label">Full Description*</label>
                    <textarea id="descriptionTextArea" className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="availableTimingsInput" className="form-label">Available Timings*</label>
                    <input
                        type="text"
                        id="availableTimingsInput"
                        className="form-control"
                        value={availableTimings}
                        onChange={(e) => setAvailableTimings(e.target.value)}
                        required
                        placeholder="e.g., Weekdays after 6pm or Saturday 9am-12pm"
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default PostMaintenanceRequest;
