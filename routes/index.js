var express = require('express');
var router = express.Router();
const Names = require('../models/names.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baby Names List' });
});

module.exports = router;
