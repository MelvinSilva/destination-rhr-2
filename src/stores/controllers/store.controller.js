const storeModel = require('../models/store.model')

class StoreController {
    async getAllStores(req, res) {
        try {
            const result = await storeModel.get()
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    async getStore(req, res) {
        try {
            const result = await storeModel.getStoreByStation(req.params.id_station)
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
}
module.exports = new StoreController()