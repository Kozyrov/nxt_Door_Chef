const models = require('../models');
const express = require('express');

const router = express.Router();
const User = models.users;

//routes for user queries
router.post('/register', createNewUser);

//Create new User profile
function createNewUser(req, res){
    var newUser = User.build({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        foodType: req.body.foodType,
        bio: req.body.bio
    });
    newUser.save()
        .then(function(user){
            res.status(200).send({"success": true, "data": user});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
    });
}

module.exports = router;