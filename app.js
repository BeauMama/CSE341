const express = require('express');
const mongodb = require('./db/connect')

const port = process.env.PORT || 8080;
const app = express();

app
    .use(express.json())
    .use((req,res,next)=> {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next()
    })
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if(err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    } else {
        console.log('Connected to MongoDB');
        app.listen(port);
        console.log(`Running on port ${port}`);
    }         

});