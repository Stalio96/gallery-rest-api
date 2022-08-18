const mongoose = require('mongoose');
require('../models/User');
require('../models/Photos');

module.exports = async (app) => {
    try{
        await mongoose.connect('mongodb://localhost:27017/IliyanaGallery', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database ready');
    }catch(err){
        console.error('Database connection failed');
        process.exit(1);
    }

}