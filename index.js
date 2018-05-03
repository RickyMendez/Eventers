const express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    session = require('express-session'),
    config = require('./config/config'),
    cookieParser = require('cookie-parser');

const app = express();

const port = process.env.PORT || 8080;

const indexRoutes = require('./routes/index.router')(express);
const eventsRoutes = require('./routes/events.routes')(express);
const userRoutes = require('./routes/auth.routes')(express);

app.use(express.static(__dirname+'/public'));
app.engine('html', ejs.renderFile);
app.set('views', './public/views');
app.set('view engine', 'html');

// Passport configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: config.secret,// the secret is kept in the config file
    resave: true,
    saveUninitialized: true,
    name: 'id',
    cookie: {
        path: '/',
        // secure: true, // for https only
        maxAge: 86400000,
        httpOnly: true
    }
}));

require('./config/passport')(app);

app.use('/', indexRoutes);
app.use('/events', eventsRoutes);
app.use('/user', userRoutes);

// start listening for http traffic
app.listen(port, () => {
    console.log('Listening on port: '+ port);
});