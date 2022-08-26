import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import errorHandler from './middleware/error.js';

import routerMounter from './utils/routerMounter.js';
import connectDB from './config/db.js';

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to Mongo
connectDB();

// Init app
const app = express();

// Bring in Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount Routers
routerMounter(app);

// Mount error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    // Close server close process
    server.close(() => process.exit(1));
});
