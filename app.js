const express = require('express');
const bodyParse = require('body-parser');
const mongodb = require('./db/connect')

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParse.json())
    .use((req,res,next)=> {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next()})
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port); 
        console.log(`Running on port ${port}`);
        }
});

