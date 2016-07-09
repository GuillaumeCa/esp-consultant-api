var restify = require('restify'),
    mongoose = require('mongoose')
    server = restify.createServer({
      name: 'Espace Consultant API',
      version: '0.1.0'
    })

server.use(restify.acceptParser(server.acceptable));
function corsHandler(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');

    return next();
}

function optionsRoute(req, res, next) {

    res.send(200);
    return next();
}

server.opts('/\.*/', corsHandler, optionsRoute);

server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());

mongoose.connect('mongodb://localhost/esp-consultant')
server.use(function (req, res, next) {
  console.log(req.method + " " + req.url);
  next()
})

// Routes
require('./routes')(server)


server.listen(3001)
console.log('Espace consultant API running on port 3001');
