const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize('medical_bills', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Bill = sequelize.define('Bill', {
  patientName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  patientAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hospitalName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateOfService: {
    type: Sequelize.DATE,
    allowNull: false
  },
  billAmount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});
//POST Method
//To create a new bill
app.post('/items', (req, res) => {
  Bill.create(req.body)
    .then(bill => res.send('Bill created successfully'))
    .catch(error => {
      console.error(error);
      res.status(500).send('Failed to create bill');
    });
});
//GET Method
//To fetch all the bills 
app.get('/items', (req, res) => {
    Bill.findAll()
      .then(bills => res.send(bills))
      .catch(error => {
        console.error(error);
        res.status(500).send('Failed to retrieve bills');
      });
  });

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Medical bill REST API listening on port 3000');
  });
});
