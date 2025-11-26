var express = require('express');
var router = express.Router();
const Names = require('../models/names.js')

/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const names = await Names.find();
    res.render('index', { title: 'Top 5 Baby Names 2024 (NYC)', names: names});
  } catch {
    console.log(error);
  }
})

module.exports = router;
