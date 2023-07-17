const { User } = require('../models');


const userData = [
  {
    "username": "test1",
    "email": "testemail1@yahoo.com",
    "password": "password1"
  },
  {
    "username": "test2",
    "email": "testemail2@yahoo.com",
    "password": "password2"
  },
  {
    "username": "test3",
    "email": "testemail3@yahoo.com",
    "password": "password3"
  },
  {
    "username": "test4",
    "email": "testemail4@yahoo.com",
    "password": "password4"
  },
  {
    "username": "test5",
    "email": "testemail5@yahoo.com",
    "password": "password5"
  },
  {
    "username": "test6",
    "email": "testemail6@yahoo.com",
    "password": "password6"
  },
  {
    "username": "test7",
    "email": "testemail7@yahoo.com",
    "password": "password7"
  },
  {
    "username": "test8",
    "email": "testemail8@yahoo.com",
    "password": "password8"
  },
  {
    "username": "test9",
    "email": "testemail9@yahoo.com",
    "password": "password9"
  },
  {
    "username": "test10",
    "email": "testemail10@yahoo.com",
    "password": "password10"
  }
  ];


const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });


module.exports = seedUsers;
