require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { AuthService,ProfileService } = require('./services');

const { usermodel } = require('./model/usersModel.js');
const mongoose  = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { profileRouter } = require('./routes/profile/profile.js');
const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.models = {
  user: usermodel,
};

app.locals.services = {
  auth : new AuthService(app.locals.models),
  profile : new ProfileService(app.locals.models),
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
