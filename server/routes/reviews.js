const models = require('../models');
const express = require('express');

const router = express.Router();
const Reviews = models.reviews;

//Routing for both post and get
router.get('/retrieve/:chef_id', retrieveReviewsByChef);
router.post('/submit', submitReviewsByChef);

//Get reviews based on chef_id
function retrieveReviewsByChef(req, res) {
    Reviews.findAll({
        where: {
            chef_id: req.params.chef_id
        }
    }).then(function (reviews) {
        res.status(200).send({"success": true, "data": reviews});
    }).catch(function (error) {
        res.status(404).send({"success": false, error});
    });
}

    //Create new review attached to the chef
function submitReviewsByChef(req, res){
    let newReview = Reviews.build({
        user_name: req.body.user_name,
        rating: req.body.rating,
        body: req.body.body,
        chef_ID: req.body.chef_ID,
    });
    newReview.save()
        .then(function(item){
            res.status(200).send({"success":true, "data": item});
        }).catch(function(error){
            res.status(404).send({"success":false, error});
    });
}

module.exports = router;
