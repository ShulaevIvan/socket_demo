const path = require('path');
const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
module.exports = require("socket.io")(server);

const mainRouter = require('./routes/index');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', mainRouter);
const chat = require('./ws/chat');
server.listen(PORT, () => {
    console.log(`server started http://${HOST}:${PORT}`)
});