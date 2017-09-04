const chef = require('./chef');
const menu = require('./menu');
const user = require('./user');
const email = require('./email');
const reviews = require('./reviews');
const hours = require('./hours');

const express = require('express');
const router = express.Router();

router.use('/chef', chef);
router.use('/menu', menu);
router.use('/user', user);
router.use('/email', email);
router.use('/reviews', reviews);
router.use('/hours', hours);

module.exports = router;