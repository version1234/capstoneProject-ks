// boiler plate code
require('dotenv').config();
const Sequelize = require ('sequelize');
const{CONNECTION_STRING} = process.env
console.log("server------ index.js");
console.log(CONNECTION_STRING);

const sequelize = new Sequelize('postgres://cqygodlhghevkh:6a6b7f5a0cf926b3410a8f49f28ae92cf300af4515325098908c4a6692bf5af9@ec2-44-197-128-108.compute-1.amazonaws.com:5432/d5iufgbm3g7283',{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
    
})

module.exports = {
   
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists login;
            drop table if exists states;
            drop table if exists medicalServices;
            drop table if exists availableMedicalServices;
            drop table if exists appointment;
            

            create table login (    
                login_id serial primary key, 
                username varchar(255),
                password varchar(255)
            );

            insert into login (username, password)
            values ('suneetha1','abcd1'), 
            ('suneetha2','abcd2'), 
            ('suneetha3','abcd3'), 
            ('suneetha4','abcd4'), 
            ('suneetha5','abcd5'), 
            ('suneetha6','abcd6'), 
            ('suneetha7','abcd7');

            create table states(  
            stateId serial primary key,
            stateName varchar(255)
            );
            insert into states(stateName) values
            ('Minnesota'),
            ('Wisconsin'),
            ('Iowa');
            

            create table medicalServices(
            serviceId serial primary key,
            serviceName varchar(255)
            );

            insert into medicalServices(serviceName) values
            ('Internal Medicine'),
            ('Cardiology'),
            ('Orthopedics');

            create table availableMedicalServices(
                id serial primary key,
                stateId int,
                serviceId int,
                location varchar,
                contact varchar,
                imagepath varchar
             );

             insert into availableMedicalServices (stateId, serviceId ,location, contact, imagepath)
                values (1, 1, 'Plymouth', '216-345-0000', 'image1.jpeg'),
                (1, 2, 'EdenPrairie', '216-545-0909', 'image2.jpeg'),
                (1, 3, 'Woodberry', '216-545-0910', 'image3.jpeg'),
                (1, 3, 'minneapolis', '216-555-0910', 'image4.jpeg'),
                (1, 2, 'EdenPrairie', '666-545-0909', 'image2.jpeg'),
                (2, 1, 'Appleton', '217-676-8888', 'image5.jpeg'),
                (2, 2, 'Bayfield', '217-676-0808', 'image6.jpeg'),
                (3, 3, 'DesMonies', '243-676-0778', 'image3.jpeg'),
                (3, 1, 'Waterloo', '225-656-0990', 'image1.jpeg');

 
             create table appointment(
                id serial primary key,
                contactName varchar(255),
                serviceId int,
                appointmentDate varchar
             );

    
           
         `)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
  
    },
    getLogins: (req, res) => {
        sequelize.query(`SELECT * FROM login`)
        .then((dbRes) => res.status(200) .send(dbRes[0]))
    
    .catch((err) => { console.log('error display Logins', err)

     })
    },

    getLogin: (req, res) => {
        const user_name = req.params.username
        console.log("user_name :: ",user_name);
        sequelize.query (`select login.login_id, login.username, login.password FROM login WHERE username = '${user_name}'`)
        .then((dbRes) => res.status(200).send(dbRes))
    
        .catch((err) => { console.log('User Not Found', err)

     })
    },

    getstates: (req, res) => {
        sequelize.query(`SELECT states.stateID, states.stateName FROM states`)
        .then((dbRes) => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0])})
    
    .catch((err) => { console.log('display states', err)
     })

    },

    getavailableMedicalServicesByState: (req, res)=> {
        const stateID = req.params.id
        console.log(stateID)
        sequelize.query(`SELECT ams.id, ams.imagepath, location, contact, s.stateName, s.stateId , ms.serviceId, ms.serviceName from availableMedicalServices  ams   
            INNER JOIN  states s 
            ON  s.stateId = ams.stateID 
            INNER JOIN  medicalServices ms
            ON ms.serviceId = ams.serviceId
            where s.stateid = ${stateID}  
            `)
            .then((dbRes) => res.status(200) .send(dbRes[0]))


        .catch((err) => { console.log('errorwhile medicaldservicesBy state', err)})

        
    },
    getavailableMedicalServicesById: (req, res)=> {
      if (req.params.id === 'undefined' || req.params.id <= 0)
       throw new Error("Bad request")
        sequelize.query(`SELECT ams.id, ams.imagepath, ams.location, ams.contact, s.stateName, s.stateId , ms.serviceId, ms.serviceName from availableMedicalServices  ams   
            INNER JOIN  states s 
            ON  s.stateId = ams.stateID 
            INNER JOIN  medicalServices ms
            ON ms.serviceId = ams.serviceId
            where ams.id = ${req.params.id}  
            `)
            .then((dbRes) => res.status(200) .send(dbRes[0]))


        .catch((err) => { console.log('errorwhile medicaldservicesBy id', err)})
        
    },
    bookAppointment: (req,res) => {
        // alert("bookapoitn")
        console.log("in bookappointment")
        var contactName  = req.body.contactName; 
        var appointmentDate  = req.body.appointmentDate;
        var serviceid  = req.body.serviceId;


        console.log("trying to insert",contactName,appointmentDate,serviceid);
        // alert(serviceid)
        const insert_str = `insert into appointment (contactName, serviceId, appointmentDate) values ('${contactName}',${serviceid},'${appointmentDate}')`;
        sequelize.query(insert_str)
        .then((dbRes) => {
            console.log("respons after insert", dbRes[0])
            res.status(200).send(dbRes[0])})
        .catch((err) => { console.log('error inserting appointment', err)})


    },
    listAppointments: (req,res) => {
        sequelize.query(`SELECT apt.id, apt.contactName, apt.appointmentDate, ams.id, ams.location, ams.contact FROM appointment apt 
        INNER JOIN  availableMedicalServices  ams 
        ON apt.serviceId = ams.id

        
        `)
        .then((dbRes) => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0])})
    
    .catch((err) => { console.log('display appointments', err)
     })

    }
    
    
}
        
    
