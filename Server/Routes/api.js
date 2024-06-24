const express = require('../node_modules/express');
const cors = require('cors');
const carsRouter = require('../Controllers/cars');
const furnitureRouter = require('../Controllers/furniture');
const appliancesRouter = require('../Controllers/appliances');
const animalsRouter = require('../Controllers/animals');
const businessesRouter = require('../Controllers/businesses');
const usersRouter = require('../Controllers/users');
const userMessagesRouter = require('../Controllers/userMessages');
const reservedAdsRouter = require('../Controllers/reservedAds');
const signUpRouter = require('../Controllers/signUp');
const loginRouter = require('../Controllers/login');
const PORT=3300;
const server=express();

server.use( cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}));

server.use(express.json());

server.use('/api/cars', carsRouter);
server.use('/api/furniture', furnitureRouter);
server.use('/api/appliances', appliancesRouter);
server.use('/api/animals', animalsRouter);
server.use('/api/businesses', businessesRouter);
server.use('/api/user', usersRouter);
server.use('/api/user/:id/Messages', userMessagesRouter);
server.use('/api/user/:id/reservedAds', reservedAdsRouter);
server.use('/api/user/login', loginRouter);
server.use('/api/signUp', signUpRouter);



server.listen(PORT, () => {
    console.log(`Listening to requests at http://localhost:${PORT}`);
});
