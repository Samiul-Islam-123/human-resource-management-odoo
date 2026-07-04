const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const {logger} = require("./utils/Logger");
const { ConnectToMongoDB } = require("./configs/DB_connection");
const { initCronJobs } = require("./utils/cronJobs");

const PORT = process.env.PORT || 5500;
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./modules/auth/auth.routes'));
app.use('/users', require('./modules/users/user.routes'));
app.use('/dashboard', require('./modules/dashboard/dashboard.routes'));
app.use('/attendance', require('./modules/attendance/attendance.routes'));
app.use('/leaves', require('./modules/leaves/leave.routes'));
app.use('/audit', require('./modules/audit/audit.routes'));
app.use('/announcements', require('./modules/announcements/announcement.routes'));

app.get('/health', (req,res) => {
    res.status(200).json({
        message : "Server is healthy"
    })
})

app.listen(PORT, async() =>{
    logger.info(`Server is starting...`);
    await ConnectToMongoDB(process.env.MONGO_URL);
    initCronJobs();
    logger.success(`Server is up and running on PORT : ${PORT}`);
})