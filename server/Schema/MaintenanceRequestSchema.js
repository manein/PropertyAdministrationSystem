const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'] // Assuming these are the priority levels
    },
    category: {
        type: String,
        required: true,
        enum: ['Electricity', 'House Service', 'Plumbing'] 
    },
    description: {
        type: String,
        required: true
    },
    availableTimings: {
        type: String,
        required: true
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isresolved: {
        type: Boolean,
        default: false
    }
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

module.exports = MaintenanceRequest;
