const authModel = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

const maxAge = 1200000 // calcul de la duree du token (20 minutes)

const maxAgeLogOut = 1 // 1ms

class AuthController {

    //******** INSCRIPTION ********//
    async signUp(req, res) {
        try {
            req.body.password = await argon2.hash(req.body.password) // mdp crypté
            req.body.profil_user = "user" // profil "user" automatique lors de l'inscription
            const newUser = req.body
            const result = await authModel.createUser(newUser)
            res.status(201).send(result) // pour l'ID (result.insertId)
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    //******** CONNEXION ********//
    async signIn(req, res) {
        try {
            const { cp_number } = req.body 
            const { firstname, lastname, profil_user } = await authModel.loginUser(cp_number)
            const token = jwt.sign({ cp_number, profil_user, firstname, lastname, profil_user }, process.env.TOKEN_SECRET, { expiresIn: maxAge})
            res.cookie('user_token', token, { httpOnly: true, maxAge})
            res.status(201).send(token)
            
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    
    //******** DECONNEXION ********//
    async logout (req, res) {
        try {
            const token = jwt.sign({ }, process.env.TOKEN_SECRET, { expiresIn: maxAgeLogOut })
            res.cookie('user_token', token, { httpOnly: true, maxAge:maxAgeLogOut })
            res.status(200).send(token)
            
        }
        catch (error) {
            res.status(500).send({ error: error.message })
        }
    } 

    //******** RE-CONNEXION ********//
    async reconnect (req, res) {
        const token = req.cookies.user_token // on recupere le cookie user_token qui à été généré lors du signIn
        res.status(200).send(token) // on renvoie dans la reponse le cookie qui contient le token
    }    
    
}

module.exports = new AuthController()