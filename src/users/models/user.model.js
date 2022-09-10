const mysql = require('mysql2')


//******* CONNEXION DB *********//
class UserModel {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    //******* REQUETE CHERCHER UN USER SUR LA DB *********//
    async get() {
        try {
            const result = await this.connection.promise().query('SELECT * FROM users')
            return result[0]
        }
        catch (error) {
            throw error // throw = renvoie l'erreur au controller
        }
    }

    //******* REQUETE MODIFIER UN USER SUR LA DB *********//
    async update(updateUser, id) {
        try {
            const result = await this.connection.promise().query('UPDATE users SET ? WHERE id = ?', [updateUser, id])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }

    //******* REQUETE SUPPRESSION USER SUR LA DB *********//
    async delete(id) {
        try {
            const result = await this.connection.promise().query('DELETE FROM users WHERE id = ?', [id])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }
}
module.exports = new UserModel()