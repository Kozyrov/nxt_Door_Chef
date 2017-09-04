const models = require('../models');
const express = require('express');

const router = express.Router();
const Chef = models.chefs;

//Routes for all chef queries
router.get('/', getAllChefs);
router.get('/foodtype/:foodType', getChefByFoodType);
router.get('/city/:city', getChefsByCity);
router.get('/city-foodtype/:city/:foodType', getChefsByCityAndFoodType);
router.get('/id/:ID', getChefById);
router.post('/register', createNewChef);

//Get all chefs in the database
function getAllChefs(req, res){
    Chef.findAll()
        .then(function (chefs){
            res.status(200).send({"success": true, "data": chefs});
        }).catch(function (error) {
            res.status(404).send({"success": false, error});
    });
}

//Get all chefs by food type - will be a search results query
function getChefByFoodType(req, res){
    let search_term = req.params.foodType;
    Chef.findAll({
        where: {
           foodType: search_term
        }
    }).then(function(chef){
        console.log(chef);
        res.status(200).send({"success": true, "data": chef});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

//Get all chefs by city - will be a search results query
function getChefsByCity(req, res){
    Chef.findAll({
        where: {
            city: req.params.city
        }
    }).then(function(chef){
        res.status(200).send({"success": true, "data": chef});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

//Get all chefs by city and food type - will be a search results query
function getChefsByCityAndFoodType(req, res){
    Chef.findAll({
        where: {
            foodType: req.params.foodType,
            city: req.params.city
        }
    }).then(function(chef){
        res.status(200).send({"success": true, "data": chef});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

//Get chef by ID
function getChefById(req, res){
    Chef.findAll({
        where: {
            ID: req.params.ID
        }
    }).then(function(chef){
        res.status(200).send({"success": true, "data": chef});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

//Create new Chef profile - personal details only
function createNewChef(req, res){
    var newChef = Chef.build({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        foodType: req.body.foodType,
        bio: req.body.bio
    });
    newChef.save()
        .then(function(chef){
            res.status(200).send({"success": true, "data": chef});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
    });
}

module.exports = router;