const mongoose = require('mongoose');

const validateLotNum = (value) => {
    return value >= 1 && value <= 15;
};


const tenantParkingSchema = new mongoose.Schema({
    LotNum: {
        type: String,
        required: true,
        unique: true,
        validate: [validateLotNum, 'LotNum must be between 1 and 15']
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    // Additional fields like 'assignedDate' could be added
    assignedDate: {
        type: Date,
        default: Date.now
    }
    // ... other fields as needed
});

module.exports = mongoose.model('TenantParking', tenantParkingSchema);
