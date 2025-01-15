const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
    if(_db) {
        console.log('Database is already initalized!!');
        return callback(null, _db);

    }

    console.log(`Attempting to connect to the database with URI: ${process.env.MONGODB_URI}`);

    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        _db = client.db(process.env.DATABASE);
        console.log('Connected to database:', _db.databaseName);
        console.log('Database connected successfully');
        callback(null, _db)
    })
    .catch((err) => {
        console.error('Database connection failed!', err)
        callback(err);
    });
};

const getDb = () => {
    if (!_db){
        throw new Error('Database not initalized!!')
    }
    return _db;
}

module.exports = {initDb, getDb};