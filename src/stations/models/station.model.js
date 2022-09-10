const mysql = require('mysql2')


//******* CONNEXION DB *********//
class StationModel {
    connection = mysql.createConnection({ 
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    //******* REQUETE GET STATION *********//
    async get() { 
        try {
            const result = await this.connection.promise().query('SELECT * FROM station WHERE id IN (14, 12, 8, 20, 2, 9, 10, 24, 6) ORDER BY city ASC;')
            return result[0]
        }
        catch (error) {
            throw error
        }
    }

     
    








    //     const { id } = req.params;
    //     // On récupère les nouvelles valeurs depuis le corps de notre requête
    //     const userPropsToUpdate = req.body;
    //     // On envoie une requête UPDATE à notre BdD
    //     connection.query(
    //         "UPDATE accomodation SET ? WHERE id = ?",
    //         [userPropsToUpdate, id],
    //         (err) => {
    //             // Une fois la requête exécutée, on peut répondre à la requête HTTP
    //             if (err) {
    //                 console.log(err);
    //                 res.status(500).send("Error updating a accomodation");
    //             } else {
    //                 res.status(200).send("Accomodation updated successfully :tada:");
    //             }
    //         }
    //     );
    // });
}

module.exports = new StationModel()