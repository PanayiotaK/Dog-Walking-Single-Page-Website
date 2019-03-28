var express = require('express');
var app = express();
var fs = require("fs");
var obj1 = JSON.parse(fs.readFileSync("dogs.json"));
var obj2 = JSON.parse(fs.readFileSync("volunteers.json"));
app.use(express.static('client'));
app.get('/dogs',function(req,resp){    
    resp.send(obj1);


});

app.get('/volunteers',function(req,resp){
    resp.send(obj2);

});

app.get('/owners',function(req,resp){
    resp.send(obj1);
});

app.listen (8090)