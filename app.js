var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//session
var session = require('express-session');

var routes = require('./routes/admin_index');
var general = require('./routes/admin_general');
var admin = require('./routes/admin_admin');
var activity = require('./routes/admin_activity');
var comments = require('./routes/admin_comments');
var status = require('./routes/admin_status');
var products = require('./routes/admin_products');
var notification = require('./routes/admin_notification');
var user = require('./routes/admin_user');
var orders = require('./routes/admin_orders');
var mobile_profile = require('./routes/mobile_profile');
var mobile_orders = require('./routes/mobile_orders');
var mobile_activity = require('./routes/mobile_activity');
var mobile_product = require('./routes/mobile_product');
var mobile_status = require('./routes/mobile_status');
var mobile_notification = require('./routes/mobile_notification');

var app = express();


//session
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 1000*60*60 }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/admin_index', routes);

app.use('/admin_general', general);

app.use('/admin_admin', admin);

app.use('/admin_activity', activity);

app.use('/admin_comments', comments);

app.use('/admin_status', status);

app.use('/admin_products',products);

app.use('/admin_notification', notification);

app.use('/admin_user', user);

app.use('/admin_orders', orders);
//c
app.use('/mobile_profile', mobile_profile);
//c
app.use('/mobile_orders',mobile_orders);
//c
app.use('/mobile_activity',mobile_activity);

app.use('/mobile_product',mobile_product);
//c
app.use('/mobile_status',mobile_status);

app.use('/mobile_notification',mobile_notification);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
