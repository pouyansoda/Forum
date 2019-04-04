// getting-started.js
var mongoose = require('mongoose');
var fs = require('fs');
//connect to the database
mongoose.connect('mongodb://localhost/personal-project', { useNewUrlParser: true });
//loads all of mode files
var models_path = __dirname + '/../models'
//for each file in the path
fs.readdirSync(models_path).forEach(function (file) {
    //check if it is a js file and load it
    if (file.indexOf('.js') > 0) {
        //load each model file
        require(models_path + '/' + file);
    }
})