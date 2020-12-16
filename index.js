const http = require('http');
const express = require('express');
const helmet = require('helmet');
const es6Renderer = require('express-es6-template-engine');

const homeController = require('./controllers/home');
const userController = require('./controllers/users');


const { layout } = require('./utility');

const app = express();
const server = http.createServer(app);

const PORT = 4001;
const HOST = '127.0.0.1';

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.urlencoded({extended: true}));


app.get('/', homeController.home);

app.get('/login', userController.login);
app.post('/login', userController.processLogin);

app.get('/new', userController.newUser);
app.post('/new', userController.processNewUser);

app.get('/members', userController.membersPage);








server.listen(PORT, HOST, () => {
    console.log('Swag.')
})

