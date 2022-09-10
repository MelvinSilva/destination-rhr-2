const userModel = require('../models/user.model')


class UserController {
    //******** CHERCHER DES UTILISATEURS ********//
    async getAllUsers(req, res) {
        try {
            const result = await userModel.get()
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    //******** MODIFIER UN UTILISATEUR ********//
    async updateUser(req, res) {
        try {
            const user = req.body  // récupère tout et tous les champs sont modifiables
            await userModel.update(user, req.params.id)
            res.status(204).send()
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    //******** SUPPRIMER UN UTILISATEUR ********//
    async deleteUser(req, res) {
        try {
            await userModel.delete(req.params.id)
            res.status(204).send()
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    
}
module.exports = new UserController()