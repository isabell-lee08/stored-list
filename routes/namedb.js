var express = require('express');
var router = express.Router();
const Names = require('../models/names.js')

router.get('/', async function (request, response) {
  try {
    const names = await Names.find();
    response.json(names);
  } catch {
    console.log(error);
    response.send('something went wrong');
  }
})

router.post('/', async function (request, response) {
    console.log(request.body);
  try {
    const newName = await Names.create({
      ...request.body
    });
    response.json(newName);
  } catch (error) {
    console.log(error);
    response.send('something went wrong');
  }
})

router.put('/:id', async function(request, response) {
    try {
    const updatedName = await Names.findByIdAndUpdate (
        request.params.id,
        {
          ...request.body
        }
    )
    response.json(updatedName)
  } catch (error) {
    console.log(error);
    response.send('something went wrong');
  }
});

router.delete('/:id', async function(request, response) {
    try {
      const deletedName = await Names.findByIdAndDelete (
        request.params.id
      )
    } catch (error) {
    console.log(error);
    response.send('something went wrong');
  }
});

module.exports = router;
