/* eslint-disable no-console */
const express = require('express');
const mongodb = require('./db/connect')
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
.use(cors())
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
    .use(cors())
    .use(express.json())
    .use((req,res,next)=> {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next()
    })
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err) {
        
         return;
    }  
        
    app.listen(port, () => {

        console.log(`Server is running on port http://localhost:${port}`);     
        console.log(`Swagger is running on http://localhost:${port}/api-docs`);
});
});