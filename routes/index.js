//initialize routers

const express = require('express');
const router = express.Router();
//require models
const models = require('../models');
//require models using destructuring
//allows you to make a variables for each of the models you exported from models/index.js
const {db, Place, Hotel, Restaurant, Activity} = require('../models');

//an /api route to retrieve all the hotels, restaurants, and activities 
//from the database and subsequently return them as JSON.
router.get('/attractions', (req, res, next)=>{
    //bluebird; takes an array of promises
    //returns a promise (array of data) only after all of these asynchronous calls (promises) have completed
    Promise.all([
        //eager loading: {include: [{all: true}]} include all association data
        //when you want to get associations with the same query 
        //when retrieving data from the database
        Hotel.findAll({include: [{all: true}]}),
        Restaurant.findAll({include: [{all: true}]}),
        Activity.findAll({include: [{all: true}]})
    ])
    .then((dataArr)=>{
        //data is returned in the order we placed them in the PromiseAll
        //destructuring to define multiple variables at once
        const [hotels, restaurants, activities] = dataArr;
        res.json({
            hotels,
            restaurants,
            activities
        })
    })
    .catch(next);
});

module.exports = router;