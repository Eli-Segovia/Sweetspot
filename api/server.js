import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routerMounter from './utils/routerMounter.js';

// Load env variables
dotenv.config({ path: './config/config.env' });

// Init app
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount Routers
routerMounter(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
