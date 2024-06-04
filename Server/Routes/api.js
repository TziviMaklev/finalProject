const express=require('express');
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




const PORT=3000;

const server=express();

server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}));

server.use(express.json());

server.use('/cars', carsRouter);
server.use('/furniture', furnitureRouter);
server.use('/appliances', appliancesRouter);
server.use('/animals', animalsRouter);
server.use('/businesses', businessesRouter);
server.use('/user', usersRouter);
server.use('/user/:id/Messages', userMessagesRouter);
server.use('/user/:id/reservedAds', reservedAdsRouter);
server.use('/user/login', loginRouter);
server.use('/user/signUp', signUpRouter);



server.listen(PORT, () => {
    console.log(`Listening to requests at http://localhost:${PORT}`);
});
