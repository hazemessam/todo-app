// Third party modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Application modules
const logRequest = require('./middlewares/logger');
const { errorHandler, notFoundHandler } = require('./errors');
const TasksRouter = require('./routers/tasks');


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(logRequest);
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/tasks', TasksRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler)

// Start the server
const port = process.env.PORT || 8080;
const start = () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log(`connected to db ${mongoose.connection.db.databaseName}...`))
        .then(() => app.listen(port, () => console.log(`server is listening on port ${port}...`)))
        .catch(err => console.log(err));
}

start()
