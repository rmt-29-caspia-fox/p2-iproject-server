const { MongoClient } = require('mongodb')


let dbConnection;
const uri = 'mongodb+srv://irwnd2:wxViBXV6NAYAsx3O@rents.hf2rcib.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}