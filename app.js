// Third party modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Application modules
const {logRequest, notFound} = require('./middlewares');
const TasksRouter = require('./routers/tasks');

const app = express();

// Middlewares
app.use(cors());
app.use(logRequest);
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/tasks', TasksRouter);

// Handle the undefined routes
app.use(notFound);

// Start the server
const port = process.env.PORT;
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
            .then(() => console.log(`connected to db ${mongoose.connection.db.databaseName}...`));
        app.listen(port, () => console.log(`server is listening on port ${port}...`));
    } catch(err) { console.log(err); }
}

start()