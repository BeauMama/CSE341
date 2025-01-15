require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

async function connectDB()  {
    try {
        await client.connect();
        console.log('Connected to MongoDB!!')
    } catch (err) {
        console.error(err);
    }
}

connectDB();

module.exports = client;