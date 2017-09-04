const models = require('../models');
const express = require('express');

const router = express.Router();
const Hours = models.hours;

//Routes for all chef queries
router.get('/chef/:ID', getHours);

//Get the hours of the chef by ID
function getHours(req, res){
    Hours.findAll({
        where: {
            chef_id: req.params.ID
        }
    }).then(function(hours){
        res.status(200).send({"success": true, "data": hours});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

module.exports = router;