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

mongodb.initDb((err) => {
    if(err) {
         return;
    } else {
        
        app.listen(port);
        
    }         

});