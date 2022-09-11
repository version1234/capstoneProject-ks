
//console.log("start server")
const express = require('express');
const cors = require('cors');
const axios = require("axios");
 const path = require('path')
 const app = express();
 const SERVER_PORT = 5050
const {seed, getLogins, getLogin, getstates, getavailableMedicalServicesByState} = require('./controller.js')
 app.use(express.json())
 app.use(cors());
//  app.use(axios());


 app.post('/seed',seed)
 app.get('/login/:username',getLogin)
 app.get('/states', getstates)
//  app.get('/reqpage',(req,res)=>{
//     console.log("test page redirect");
//     // res.redirect('./public/yourReqPage.html');
//  })


//app.get('/medicalServices', getmedicalServices);
app.get('/availableMedicalServices/:id', getavailableMedicalServicesByState)

 
 app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));