
//console.log("start server")
const express = require('express');
const cors = require('cors');
const axios = require("axios");
 const path = require('path')
 const app = express();
 //const SERVER_PORT = 5050
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


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../avaServices.html'));
});

// app.get('/styles', function(req, res) {
//     res.sendFile(path.join(__dirname,'/public/styles.css'));
// });

// app.get('/js', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/avaServices.js'));
// });


 const port = process.env.PORT || 5050;
 app.listen(port, () => {console.log(`listening on port ${port}`);
})