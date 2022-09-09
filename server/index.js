
//console.log("start server")
const express = require('express');
const cors = require('cors');
const axios = require('axios')
 const path = require('path')
 const app = express();
 const SERVER_PORT = 5050
const {seed, getLogins, getLogin} = require('./controller.js')
 app.use(express.json())
 app.use(cors());


 app.post('/seed',seed)
 app.get('/login/:username',getLogin)


 
 app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));