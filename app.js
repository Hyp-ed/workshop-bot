const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes'));

app.use(express.static('public'));

app.use((req, res, next) => {
  const response  = {
    success: false,
    data: [],
    errors: ['Route does not exist.'],
  };
  
  res.status(404).send(response);
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ 'error': err });
});


module.exports = app;
