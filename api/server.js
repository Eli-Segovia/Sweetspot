import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import errorHandler from './middleware/error.js';
import routerMounter from './utils/routerMounter.js';
import connectDB from './config/db.js';

/* ---------START Dir stuff ----------- */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES6 Module import way of getting access to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* --------- END   Dir stuff ----------- */

// Load env variables
dotenv.config({ path: `${__dirname}/config/config.env` });

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
