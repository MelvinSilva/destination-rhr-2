const jwt = require('jsonwebtoken')

class UserMiddleware {

    async checkAuthorization(req, res, next) {
        try {
            //verification s'il existe un token actif dans les cookies
            const token = jwt.verify(req.cookies.user_token, process.env.TOKEN_SECRET);
            //décodage du token
            jwt.decode(token)
            //si le profil utilisateur est de type admin => next, sinon erreur 401
            if (token && token.profil_user === "admin") {
                next()
            } else {
                res.status(401).send({
                    error: "Vous n'avez pas les droits requis pour effectuer cette opération"
                })
            }
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    }
}

module.exports = new UserMiddleware()