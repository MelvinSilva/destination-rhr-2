const stationModel = require('../models/station.model')

class StationController {
    async getStations(req, res) {
        try {
            const result = await stationModel.get()
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
   
}
module.exports = new StationController()