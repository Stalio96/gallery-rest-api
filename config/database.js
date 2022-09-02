const mongoose = require('mongoose');
require('../models/User');
require('../models/Photos');

module.exports = async (app) => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database atlas ready');
    }catch(err){
        console.error('Database connection failed');
        process.exit(1);
    }

}