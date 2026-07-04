const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const {logger} = require("./utils/Logger");
const { ConnectToMongoDB } = require("./configs/DB_connection");

const PORT = process.env.PORT || 5500;
dotenv.config();
const app = express();

app.get('/health', (req,res) => {
    res.status(200).json({
        message : "Server is healthy",
        timestamp : new Date.now
    })
})

app.listen(PORT, async() =>{
    logger.info(`Server is starting...`);
    await ConnectToMongoDB(process.env.MONGO_URL);
    logger.success(`Server is up and running on PORT : ${PORT}`);
})