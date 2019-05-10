const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

//Midelware
server.use(restify.plugins.bodyParser());

//Protect Routes
// server.use(rjwt({secret: config.JWT_SECRET}).unless({path: ['/auth']}));

server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URl, {
        useNewUrlParser: true
    })
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/customers.js')(server);
    require('./routes/users.js')(server);
    console.log(`Server Started on por ${config.PORT}`)
});