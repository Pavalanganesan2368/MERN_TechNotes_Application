// require('express-async-errors')
const router = require('./routes/root');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const dns = require('dns');
const userRouters = require('./routes/userRoutes');
const noteRouters = require('./routes/noteRouters');
const authRouter = require('./routes/authRoutes');
const authRouters = require('./routes/authRoutes');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3500;

dns.setServers(["1.1.1.1", "8.8.8.8", ]);

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(logger);

app.use("/", express.static('public'));
app.use("/", router);
app.use("/auth", authRouters);
app.use("/users", userRouters);
app.use("/notes", noteRouters);

app.use((req, res) => {
    res.status(404)
    if(req.accepts('html')) res.sendFile(path.join(__dirname, "views", "404.html"));
    else if (req.accepts('json')) res.json({ message: "404 Not Found" });
    else res.type('txt').send('404 Not Found');
})

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected To MongoDB Database.");
    app.listen(PORT, () => console.log(`Server is Now Running: http://localhost:${PORT}`));
})

mongoose.connection.on('error', (error) => {
    console.log(error.message);
    logEvents(`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`, 'mongoErrorLog.log');
})