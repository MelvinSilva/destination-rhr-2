const accomodationModel = require('../models/accomodation.model')

class AccomodationController {
    async getAccomodations(req, res) {
        try {
            const result = await accomodationModel.get()
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async getAccomodationByStation(req, res) {
        try {
            const result = await accomodationModel.getByStation(req.params.id_station)
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async updateAccomodation(req, res) {
        try {
            const updateAccomodation = req.body
            await accomodationModel.update(updateAccomodation, req.params.id)
            res.status(204).send()
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
}



module.exports = new AccomodationController()