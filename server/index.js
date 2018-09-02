const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const indexRouter = require('./routes/index');
const restaurantsRouter = require('./routes/restaurants');

const app = express();

// view engine setup
app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

module.exports = app;