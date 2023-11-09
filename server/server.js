const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongoString="mongodb+srv://manandevani007:XNReRhFTw9izg21j@propadmn.vpitmnh.mongodb.net/"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

app.use(express.json());
app.use(cors())
app.listen(9000, () => {
    console.log('Server Started at ${9000}')
})

