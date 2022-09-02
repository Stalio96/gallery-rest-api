const express = require('express');

const cors = require('cors');

const axios = require("axios");

const expressConfing = require('./config/express');
const databaseConfig = require('./config/database');
require('dotenv').config();

const routesConfig = require('./config/routes');

start();

async function start(){
    
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: ['http://localhost:3030', 'http://localhost:3000'],
        credentials: true
    }));
    expressConfing(app);
    await databaseConfig(app);
    routesConfig(app);
    

    app.get('/', (req, res) => res.json({message: 'REST service operational'}))

    app.listen(process.env.PORT || 3030, () => console.log('REST service started on port 3030'));
}