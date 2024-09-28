const mongoose = require('mongoose')

async function connectMongoDb(path){
    await mongoose.connect(path);
}

module.exports = connectMongoDb;