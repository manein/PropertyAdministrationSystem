const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
// const mongoString="mongodb+srv://manandevani007:XNReRhFTw9izg21j@propadmn.vpitmnh.mongodb.net/"

const mongoString = "mongodb+srv://abdullearn18:abdullearn18@cluster0.rcrkkkv.mongodb.net/"

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

app.use(express.json());
app.use(cors())
app.listen(9000, () => {
    console.log('Server Started at ${9000}')
})

const User = require('./Schema/Users');
const Announcement= require('./Schema/Annoucements');
const MaintenanceRequest = require('./Schema/MaintenanceRequestSchema');
const GuestParking = require('./Schema/GuestParkingSchema'); 
const TenantParking = require('./Schema/TenantParkingSchema')

// SignUP APIS
app.post('/createUser', async (req, res) => {

    // console.log("in saving",req.body)
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
        console.log("User saved in db")
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        // console.log(user)
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})



app.get('/getTenants', async (req, res) => {
    try {
        const tenants = await User.find({ role: 'tenant' });
        res.send(tenants);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/deleteTenant/:id', async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (result) {
            res.send({ message: 'Tenant deleted successfully' });
        } else {
            res.status(404).send({ message: 'Tenant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


app.post('/acceptTenant', async (req, res) => {
    try {
        const tenant = await User.findByIdAndUpdate(req.body._id, { isAccepted: true }, { new: true });
        if (tenant) {
            res.send(tenant);
        } else {
            res.status(404).send({ message: 'Tenant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//manage Announcements
app.post('/createAnncc', async (req, res) => {
    try {
        const { header, description } = req.body;
        const newAnnouncement = new Announcement({ header, description });
        await newAnnouncement.save();
        res.status(201).send(newAnnouncement);
    } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).send(error);
    }
});


app.get('/getAnnouncements', async (req, res) => {
    try {
        const announcements = await Announcement.find({});
        res.send(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).send(error);
    }
});

app.delete('/deleteAnnouncement/:id', async (req, res) => {
    try {
        const result = await Announcement.findByIdAndDelete(req.params.id);
        if (result) {
            res.send({ message: 'Announcement deleted successfully' });
        } else {
            res.status(404).send({ message: 'Announcement not found' });
        }
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).send(error);
    }
});

app.get('/getAnnouncements', async (req, res) => {
    try {
        // Fetch all announcements and sort them by createdDate in descending order (most recent first)
        const announcements = await Announcement.find({}).sort({ createdDate: -1 });
        res.send(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).send(error);
    }
});

// Maintance Requests

app.post('/maintenanceRequests', async (req, res) => {
    try {
        const newRequest = new MaintenanceRequest(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        res.status(500).json({ message: 'Error creating maintenance request', error: error });
    }
});

app.get('/unresolvedMainReq', async (req, res) => {
    try {
        const unresolvedRequests = await MaintenanceRequest.find({ isresolved: false })
            .populate('tenantId', 'fname lname HouseNum -_id')
            .exec();

        
        res.json(unresolvedRequests.map(req => ({
            ...req._doc,
            availableDates: req.availableDates.map(date => ({
                date: date.date, 
                fromTime: date.fromTime,
                toTime: date.toTime
            }))
        })));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Get maintenance requests for a specific tenant
app.get('/maintenanceRequests/tenant/:tenantId', async (req, res) => {
    try {
        const tenantId = req.params.tenantId;
        const requests = await MaintenanceRequest.find({ tenantId: tenantId });
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update the resolved status of a maintenance request
app.put('/maintenanceRequests/update/:requestId', async (req, res) => {
    try {
        const requestId = req.params.requestId;
        // Find the current request by ID
        const request = await MaintenanceRequest.findById(requestId);
        // If the request is found, toggle its 'isResolved' status
        if (request) {
            request.isresolved = !request.isresolved;
            await request.save();
            // console.log("it is toggled")
            res.json(request);
        } else {
            res.status(404).send('Maintenance request not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.post('/guestParking/request', async (req, res) => {
    try {
        const { carType, VehicleNum, Name, requestedBy, requestedFrom, requestedTo } = req.body;

        const newGuestParkingRequest = new GuestParking({
            carType,
            VehicleNum,
            Name,
            requestedBy: requestedBy,
            requestedFrom,
            requestedTo
        });

        await newGuestParkingRequest.save();

        res.status(201).json(newGuestParkingRequest);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing request');
    }
});

// Fetch all guest parking requests
app.get('/guestParking/requests', async (req, res) => {
    try {
        const requests = await GuestParking.find({ isAssigned: false });
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Fetch all assigned parkings
app.get('/guestParking/assigned', async (req, res) => {
    try {
        const assignedParkings = await GuestParking.find({ isAssigned: true });
        res.json(assignedParkings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Assign a parking lot number to a request
app.put('/guestParking/assign/:requestId', async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { LotNum } = req.body;

        const request = await GuestParking.findById(requestId);
        if (request) {
            request.LotNum = LotNum;
            request.isAssigned = true;
            await request.save();
            res.json(request);
        } else {
            res.status(404).send('Request not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Fetch all guest parking requests for a specific tenant
app.get('/guestParking/tenantRequests/:tenantId', async (req, res) => {
    try {
        const tenantId = req.params.tenantId;
        const requests = await GuestParking.find({ requestedBy: tenantId });
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



app.get('/unassignedParkingSpaces', async (req, res) => {
    try {
        // Fetch the list of parking spaces from the database
        const parkingSpaces = await TenantParking.find({});
        const assignedParkingSpaces = parkingSpaces.map((space) => space.LotNum);

        const totalParkingSpaces = 15; // Total number of parking spaces

        // Generate an array of unassigned parking spaces (LotNum values)
        const unassignedSpaces = Array.from({ length: totalParkingSpaces }, (_, index) => {
            const LotNum = index + 1;
            
            // Check if the LotNum exists in the database and is not assigned
            const isAssigned = assignedParkingSpaces.includes(LotNum);
            
            return { LotNum, isAssigned: isAssigned }; // Mark as unassigned if not in the database
        });
        // console.log(unassignedSpaces);
        res.json(unassignedSpaces);
    } catch (error) {
        console.error('Error fetching unassigned parking spaces:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/getValidTenants', async (req, res) => {
    try {
        const validTenants = await User.find({ role: 'tenant', isAccepted: true });
        res.json(validTenants);
    } catch (error) {
        console.error('Error fetching valid tenants:', error);
        res.status(500).json({ message: 'Error fetching valid tenants', error: error });
    }
});

app.post('/assignTParking', async (req, res) => {
    const { tenantId, LotNum } = req.body;
    try {
        // Check if the parking space exists
        let parkingSpace = await TenantParking.findOne({ LotNum });

        if (!parkingSpace) {
            // If parking space doesn't exist, create a new one
            parkingSpace = new TenantParking({
                LotNum,
                tenantId,
                isAssigned: true,
                assignedBy: req.body.assignedBy._id,
                assignedDate: new Date()
            });

            await parkingSpace.save();
            return res.status(200).json({ message: 'Parking space assigned successfully.' });
        }

        if (parkingSpace.isAssigned) {
            // Parking space is already assigned
            return res.status(400).json({ message: 'Parking space is already assigned.' });
        }

        // Assign the parking space
        parkingSpace.tenantId = tenantId;
        parkingSpace.isAssigned = true;
        parkingSpace.assignedBy = req.user._id;
        parkingSpace.assignedDate = new Date();
        console.log("saviii")
        await parkingSpace.save();

        res.status(200).json({ message: 'Parking space assigned successfully.' });
    } catch (error) {
        console.error('Error assigning parking space:', error);
        res.status(500).json({ message: 'Error assigning parking space', error: error });
    }
});


app.get('/getAssignedParking', async (req, res) => {
    try {
        // Assuming you have a model for assigned parking with a reference to the tenant model, you can use the populate method to fetch tenant details
        const assignedParking = await TenantParking.find().populate('tenantId');

        // Return the assigned parking data with populated tenant details as JSON
        // console.log(assignedParking)
        res.status(200).json(assignedParking);
    } catch (error) {
        console.error('Error fetching assigned parking:', error);
        res.status(500).json({ message: 'Error fetching assigned parking', error: error });
    }
});


app.post('/unassignTParking', async (req, res) => {
    const { tenantId, LotNum } = req.body;

    try {
        // Find the parking space with the specified LotNum
        const parkingSpace = await TenantParking.findOne({ LotNum });

        if (!parkingSpace) {
            // Parking space not found
            return res.status(400).json({ message: 'Parking space not found.' });
        }

        // Check if the parking space is already unassigned
        if (!parkingSpace.isAssigned) {
            return res.status(400).json({ message: 'Parking space is already unassigned.' });
        }

        // Check if the parking space is assigned to the specified tenant
        if (parkingSpace.tenantId.toString() !== tenantId) {
            return res.status(400).json({ message: 'Parking space is assigned to a different tenant.' });
        }

        // Delete the parking space
        await TenantParking.deleteOne({ LotNum })

        res.status(200).json({ message: 'Parking space deleted successfully.' });
    } catch (error) {
        console.error('Error deleting parking space:', error);
        res.status(500).json({ message: 'Error deleting parking space', error: error });
    }
});

app.get('/api/tenantParking/:tenantId', async (req, res) => {
    try {
        const tenantId = req.params.tenantId;
        const parkings = await TenantParking.find({ tenantId: tenantId, isAssigned: true });

        if (!parkings || parkings.length === 0) {
            return res.status(404).send('No parking details found for the specified tenant.');
        }

        res.send(parkings);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
});
