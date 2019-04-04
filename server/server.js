const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const Port = 5000;
const cors = require('cors');
const router = require('express').Router();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var socket = require('socket.io');


//to access body
app.use(bodyParser.json());

app.use(session({
    secret: 'This is a very secret Code',
    resave: false,
    saveUninitialized: false,
}))

app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
		credentials: true //allow setting of cookies
	})
);

//attaching router
app.use('/api', router);

//routes
require('./Config/Mongoose.js');
require('./Config/Routes.js')(app);

var server = app.listen(Port, () => console.log(`Server up and running on port ${Port}`));

// Static files
app.use(express.static('src/SocketIo'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
