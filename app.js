//express app setup

var express = require("express");
var bodyParser = require("body-parser");
var compress = require('compression');

var app = express();

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//settin routes
require("./routes/routes.js")(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var html = '<!DOCTYPE html>';
    html+= '<html>';
    html+= '  <head>';
    html+= '    <title></title>';
    html+= '  </head>';
    html+= '  <body>';
    html+= '    <h1>'+err.message+'</h1>';
    html+= '    <h2>'+err.status+'</h2>';
    html+= '    <pre>'+err.stack+'</pre>';
    html+= '  </body>';
    html+= '</html>';
    res.send(html);
}); 

//starting the server
// var server = app.listen(3000, function () {
//     console.log("inoutlog.server: listening on port %s...", server.address().port);
// });

module.exports = app;