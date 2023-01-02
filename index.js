require('dotenv').config();
require('express-async-errors');
const path = require('path');
// express
const express = require('express');
// routers import
const checkoutRouter = require('./routes/checkout.routes');
// middlewares import
const NotFoundMiddleware = require('./middleware/not-found.middleware');
const ErrorHandlerMiddleware = require('./middleware/error-handler.middleware');
// extra packages import
const cors = require('cors');

// app
const app = express();

// inbuilt middlewares
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));
// third party middlewares
app.use(cors());

// routes
app.get('/api', (_, res) => {
    res.send('API');
});
app.use('/api/checkout', checkoutRouter);
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
});

// middlewares
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const PORT = process.env.PORT || 5500;

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening to port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();