const mysql = require('mysql2')


//******* CONNEXION DB *********//
class AccomodationModel {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    async get() {
        try {
            const result = await this.connection.promise().query('SELECT a.*, s.city FROM accomodation AS a INNER JOIN station AS s ON a.id_station=s.id')
            return result[0]
        }
        catch (error) {
            throw error
        }
    }

    async getByStation(id_station) {
        try {
            const result = await this.connection.promise().query('SELECT a.*, s.city FROM accomodation AS a INNER JOIN station AS s ON a.id_station=s.id WHERE a.id_station =  ?', [id_station])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }

    async update(updateAccomodation, id) {
        try {
            const result = await this.connection.promise().query('UPDATE accomodation SET ? WHERE id = ?', [updateAccomodation, id])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = new AccomodationModel()