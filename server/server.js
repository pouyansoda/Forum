const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const Port = process.env.PORT || 5000;
const cors = require('cors');
const router = require('express').Router();




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

app.listen(Port, () => console.log(`Server up and running on port ${Port}`));


