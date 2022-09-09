// boiler plate code
require('dotenv').config();
const Sequelize = require ('sequelize');
const{CONNECTION_STRING} = process.env

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
 

        `).then(() => {
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
        sequelize.query (`select login.username, login.password FROM login WHERE username = ${user_name}`)
        .then((dbRes) => res.status(200) .send(dbRes[0]))
    
        .catch((err) => { console.log('User Not Found', err)

     })
    }
}