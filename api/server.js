import express from 'express';
import dotenv from 'dotenv';

// Routes
import stores from './routes/stores.js';

// Load env variables
dotenv.config({ path: './config/config.env' });

// Init app
const app = express();

// Mount Routers
app.use('/api/v1/stores', stores);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
