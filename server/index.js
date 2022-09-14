

const express = require('express');
const cors = require('cors');
const axios = require("axios");
 const path = require('path');
 const app = express();
 
const {seed, getLogins,  bookAppointment, listAppointments, getLogin, getstates, getavailableMedicalServicesByState, getavailableMedicalServicesById} = require('./controller.js')
 app.use(express.json())
 app.use(cors());
//  app.use(axios());


 app.post('/seed',seed)
 //app.get('/api/login/:username',getLogin)
 app.get('/api/states', getstates)



app.get('/api/availableMedicalServicesByState/:id', getavailableMedicalServicesByState)
app.get('/api/availableMedicalServices/:id', getavailableMedicalServicesById)
app.post('/api/appointment', bookAppointment)
app.get('/api/appointments',listAppointments)


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../public/avaServices.html'));
});

app.get('/styles.css', function(req, res) {
    res.sendFile(path.join(__dirname,'../public/styles.css'));
});

app.get('/avaServices.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/avaServices.js'));
});

app.get('/appointment.html', function(req, res){
    res.sendFile(path.join(__dirname,'../public/appointment.html'));
});

app.get('/appointment.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/appointment.js'));
});

 const port = process.env.PORT || 5050
 app.listen(port, () => {console.log(`listening on port ${port}`);
})