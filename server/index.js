
//console.log("start server")
const express = require('express');
const cors = require('cors');
const axios = require("axios");
 const path = require('path')
 const app = express();
 const SERVER_PORT = 5050
const {seed, getLogins,  bookAppointment, listAppointments, getLogin, getstates, getavailableMedicalServicesByState, getavailableMedicalServicesById} = require('./controller.js')
 app.use(express.json())
 app.use(cors());
//  app.use(axios());


 app.post('/seed',seed)
 app.get('/login/:username',getLogin)
 app.get('/states', getstates)


//app.get('/medicalServices', getmedicalServices);
app.get('/availableMedicalServicesByState/:id', getavailableMedicalServicesByState)
app.get('/availableMedicalServices/:id', getavailableMedicalServicesById)
app.post('/appointment', bookAppointment)
app.get('/appointments',listAppointments)

 
 app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));