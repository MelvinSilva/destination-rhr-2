const express = require('express')
const accomodationController = require('./controllers/accomodation.controller')
const accomodationMiddleware = require('./middlewares/accomodation.middleware')

const router = express.Router()

router.get('/',[ accomodationMiddleware.checkToken, accomodationController.getAccomodations])
router.get('/:id_station', [accomodationMiddleware.checkToken,  accomodationController.getAccomodationByStation])

router.put('/:id',[ accomodationMiddleware.checkToken,  accomodationController.updateAccomodation])

module.exports = router