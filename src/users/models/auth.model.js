const mysql = require('mysql2')


//******* CONNEXION DB *********//
class AuthModel {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })


    //******* REQUETE INSCRIPTION *********//
    async createUser(newUser) {
        try {
            const result = await this.connection.promise().query('INSERT INTO users SET ?', [newUser])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }

    //******* REQUETE CONNEXION et permet d'alimenter le contenu du token  *********//
    async loginUser(login) {
        try {
            const result = await this.connection.promise().query('SELECT cp_number, firstname, profil_user FROM users WHERE cp_number = ?', [login])
            return result[0][0] // premier [0] = buffer mysql inutile, deuxieme [0] recupere le premier utilisateur et le seul car il n'y en a qu'un grave au WHERE login qui est unique!!!!
        }
        catch (error) {
            throw error
        }
    }

//******* VERIFICATION *********//
// Vérifier si le CP est déjà existant //
    async verifyCpUser(cpUserVerify) {
        try {
            const result = await this.connection.promise().query('SELECT cp_number FROM users WHERE cp_number = ?', [cpUserVerify])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }

    async verifyEmail(emailVerify) {
        try {
            const result = await this.connection.promise().query('SELECT email FROM users WHERE email = ?', [emailVerify])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }

    async verifyLogin(authVerify) {
        try {
            const result = await this.connection.promise().query('SELECT cp_number, password FROM users WHERE cp_number = ?', [authVerify])
            return result[0][0]
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = new AuthModel()