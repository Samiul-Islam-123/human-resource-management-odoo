const mongoose = require("mongoose");
const {logger} = require('../utils/Logger');

const ConnectToMongoDB = async (DB_URL) => {
    try{
        console.log(DB_URL)
        logger.info(`Connecting to MongoDB ...`);
        await mongoose.connect(DB_URL);
        logger.success(`Connected to mongoDB `);
    }
    catch(error){
        logger.error(`Error while connecting to Mongo : ${error.message}`);
    }
}

module.exports =  {ConnectToMongoDB}