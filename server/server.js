const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongoString="mongodb+srv://manandevani007:XNReRhFTw9izg21j@propadmn.vpitmnh.mongodb.net/"
mongoose.connect(mongoString)
const database = mongoose.connection
const GuestParking = require('./Schema/GuestParking')
const User = require('./Schema/User')
const bcrypt = require('bcrypt');

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

app.use(express.json());
app.use(cors())
app.listen(9000, () => {
    console.log('Server Started at ${9000}')
})

const calculateAmount = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    return days * 10;
  };
app.post('/api/guest-parking', async (req, res) => {
    try {
      const formData = req.body;
      const amount = calculateAmount(formData.startDate, formData.endDate);
      const newGuestParking = new GuestParking({
        firstname: formData.firstName,
        lastname: formData.lastName,
        phonenumber: formData.phoneNumber,
        licenseplate: formData.licensePlate,
        state: formData.state,
        vehicletype: formData.vehicleType,
        dos: formData.startDate,
        doe: formData.endDate,
        amount: amount.toString(),
      });
  
      await newGuestParking.save();
  
      res.json({ success: true, message: 'Parking booked successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.get('/checkUser', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    try {
      const user = await User.findOne({ username, password });
      if (user) {
        try {
          req.session.user = user;
          // Additional session-related code
        } catch (error) {
          console.error('Error setting session data:', error);
        }
        
        res.send({ isValid: true, message: 'User found and credentials are valid.' });
      } else {
        res.send({ isValid: false, message: 'User not found or invalid credentials.' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });