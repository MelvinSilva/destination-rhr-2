const mysql = require('mysql2')


//******* CONNEXION DB *********//
class EatModel {
    connection = mysql.createConnection({ 
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    
    //******* REQUETE GET pour chaque id_station *********//
    async getByIdStation(id_station) { 
        try {
            const result = await this.connection.promise().query('SELECT *, station.city FROM eat INNER JOIN station ON eat.id_station = station.id WHERE eat.id_station =  ?', [id_station])
            return result[0]
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = new EatModel()