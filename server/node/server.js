var express = require('express');
var session = require('express-session');
var handler = require('./handler');
var bodyParser = require('body-parser');

function startServer() {
    var app = express();

    app.use(bodyParser.json()); // for parsing application/json
    const static_files = __dirname + "/../../views";
    console.log("static_files : " + static_files);
    app.use(express.static(static_files));


    var sess = {
        resave: false,
        saveUninitialized: true,
        secret: 'keyboard cat'
    };

    // app.set('trust proxy', 1) // trust first proxy (https +proxy)
    // sess.cookie.secure = true // serve secure cookies (https)

    app.use(session(sess));

    // app.get('/', function(request, response) {
    //    handler.home(request, response);
    // });

    app.get('/lois', function (request, response) {
        handler.fetchLois(request, response);
    });

    app.put('/lois/:id', function (request, response) {
        handler.updateLoi(request, response);
    });

    app.get('/amendements', function (request, response) {
        handler.fetchAmendements(request, response);
    });


    app.get('/home', function (request, response) {
        handler.home(request, response);
    });
    app.post('/review', function (request, response) {
        handler.review(request, response);
    });

    app.listen(8889, function () {
        console.log("Server started on http://localhost:8889");
    });
}

exports.start = startServer;
