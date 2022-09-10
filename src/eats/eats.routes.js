const express = require('express')
const eatController = require('./controllers/eat.controller')

const router = express.Router()

router.get('/:id_station', eatController.getEatByStation)

module.exports = router