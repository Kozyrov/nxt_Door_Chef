const models = require('../models');
const express = require('express');

const router = express.Router();
const Menu = models.menus;
const sequelize = models.sequelize;

//Routes for all menu queries
router.get('/id/:chef_id', getChefMenu);
router.get('/search/:food', getMenuByFood);
router.post('/register', createNewMenu);


//Get menu of chef by chef_id
function getChefMenu(req, res){
    Menu.findAll({
        where: {
            chef_id: req.params.chef_id
        }
    }).then(function(menu){
        res.status(200).send({"success": true, "data": menu});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}
//Get menu by search term
function getMenuByFood (req, res) {
    let search_term = req.params.food;
    let query = "SELECT DISTINCT menus.chef_id, chefs.id, chefs.firstName, chefs.lastName, chefs.city, chefs.address, chefs.lat, chefs.lng, chefs.bio, chefs.alias, chefs.portrait, chefs.foodType FROM menus JOIN chefs ON menus.chef_id = chefs.ID WHERE menus.description LIKE '%"+search_term+"%' OR menus.foodType LIKE '%"+search_term+"%' OR menus.item_name LIKE '%"+search_term+"%'";
    sequelize.query(query).then(function(results){
        console.log(results);
        res.status(200).send({"success": true, "data": results[0]});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

//Create new Chef menu - part of creating a chef profile
function createNewMenu(req, res){
    var newMenu = Menu.build({
        menu_item_number: req.body.menu_item_number,
        item_name: req.body.item_name,
        description: req.body.description,
        price: req.body.price,
        chef_id: req.body.chef_id
    });
    newMenu.save()
        .then(function(item){
            res.status(200).send({"success": true, "data": item});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
    });
}

module.exports = router;