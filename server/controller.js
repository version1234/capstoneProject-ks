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
            drop table if exists appointments;
            

            create table login (    
                login_id serial primary key, 
                username varchar(255),
                password varchar(255)
            );

            create table states(  
            stateId serial primary key,
            stateName varchar(255)
            );
            

            create table medicalServices(
            serviceId serial primary key,
            serviceName varchar(255)
            );

            create table availableMedicalServices(
                id serial primary key,
                stateId int,
                serviceId int,
                location varchar,
                contact varchar
             );
 
             create table appointment(
                id serial primary key,
                contactName varchar(255),
                serviceId int,
                appointmentDate date
             );

                insert into states(stateName) values
                ('Minnesota'),
                ('Wisconsin'),
                ('Iowa');

                insert into medicalServices(serviceName) values
                ('Internal Medicine'),
                ('Cardiology'),
                ('Orthopedics');

                insert into availableMedicalServices (stateId, serviceId ,location, contact)
                values (1, 1, 'Plymouth', '216-345-0000'),
                (1, 2, 'EdenPrairie', '216-545-0909'),
                (1, 3, 'Woodberry', '216-545-0910'),
                (1, 3, 'minneapolis', '216-555-0910'),
                (1, 2, 'EdenPrairie2', '666-545-0909'),
                (2, 1, 'Maplegrove', '217-676-8888'),
                (2, 2, 'Maplegroov', '217-676-0808');



                

    
            insert into login (username, password)
            values ('suneetha1','abcd1'), 
            ('suneetha2','abcd2'), 
            ('suneetha3','abcd3'), 
            ('suneetha4','abcd4'), 
            ('suneetha5','abcd5'), 
            ('suneetha6','abcd6'), 
            ('suneetha7','abcd7');
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
        sequelize.query(`SELECT ams.id, location, contact, s.stateName, s.stateId , ms.serviceId, ms.serviceName from availableMedicalServices  ams   
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
      
        sequelize.query(`SELECT ams.id, ams.location, ams.contact, s.stateName, s.stateId , ms.serviceId, ms.serviceName from availableMedicalServices  ams   
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
        console.log("in bookappointment")
        var contactName  = req.body.name; 
        var appointmentDate  = req.body.date;
        var serviceid  = req.body.serviceid;


        console.log("trying to insert",contactName,appointmentDate,serviceid);
        const insert_str = `insert into appointment (contactName, serviceId, appointmentDate) values ('${contactName}',${appointmentDate},${serviceid})`;
        sequelize.query(insert_str)
        .then((dbRes) => res.status(200).send(dbRes[0]))
        .catch((err) => { console.log('error inserting appointment', err)})


    }

    
    
}
        
    
