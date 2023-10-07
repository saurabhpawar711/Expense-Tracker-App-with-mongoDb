const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'views')));

const bodyParser = require('body-parser');

app.use(cors());
app.use(helmet());
app.use(compression());

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
);
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json({ extended: false }));

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const orderRoute = require('./routes/order');
const leaderboardRoute = require('./routes/leaderboardRoute');
const passwordRoute = require('./routes/resetPassword');
const reportsRoute = require('./routes/reportsRoute');
const isPremium = require('./routes/checkIfPremium');

app.use(userRoute);
app.use(expenseRoute);
app.use(orderRoute);
app.use(leaderboardRoute);
app.use(passwordRoute);
app.use(reportsRoute);
app.use(isPremium);

app.use((req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'views', `${req.url}`))
})

mongoose
    .connect('mongodb+srv://saurabhpawar71100:Saurabh%40123@cluster0.vkpbsmc.mongodb.net/expenseApp?retryWrites=true&w=majority')
    .then(() => {
        app.listen(4000);
    })
    .catch(err => {
        console.log(err);
    })