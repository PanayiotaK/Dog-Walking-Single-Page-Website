var express = require('express');
var app = express();
var fs = require("fs");
var obj1 = JSON.parse(fs.readFileSync("dogs.json"));
var obj2 = JSON.parse(fs.readFileSync("volunteers.json"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/search/:username',function(req,resp){
    var search_item = req.params.username;
    var foundO =false;
    var foundV =false;
    var data1 = "";
    var data2 = "";
    for(var i=0; i< obj1.length ; i++ ){
        if(search_item == obj1[i].username){                
            foundO == true;
            data1 += obj1[i].name +" "+obj1[i].last_n+ " " + obj1[i].username + " "+
            obj1[i].Dogs_Name + " "+ obj1[i].breed + " "+ obj1[i].age + " "+ obj1[i].gender;
            resp.send(data1);
            break;
            
        }
    }
    for(var j=0; j<obj2.length ; j++){
        if(search_item == obj2[j].username){
            foundV = true;
            data2 += obj2[j].name +" "+obj2[j].last_n+ " " + obj2[j].username + " "+ obj2[j].email;
            resp.send(data2);
            break;

        }
    }
    if(foundO === false && foundV === false){
        resp.send(404);
    }
});

app.get('/login/:userID',function(req,resp){
    var search_item = req.params.userID;   
    var foundO = false;
    var foundV = false;
    
     for(var i=0; i< obj1.length ; i++ ){
        if(search_item == obj1[i].username){                
            foundO == true;            
            resp.send('user');
            break;
            
        }
    }
   
    for(var j=0; j<obj2.length ; j++){
        if(search_item == obj2[j].username){
            foundV = true;                      
            resp.send('user');
            break;

        }
    }
     
    if(search_item == 'admin'){
        resp.send('admin');
    }
   
   
    if(foundO === false && foundV === false){
        resp.status(404).send("sahbkhab");
    }
   

});

app.post('/addOwners',function(req,resq){
    console.log(req.body.name);
    console.log(req.body);
    const name = req.body.name;
    /*const Lname = req.body.last_n;
    const  uname = req.body.username ;
    const email = req.body.email;
    const city = req.body.city ;
    const Dname = req.body.Dogs_Name;
    const breed = req.body.breed ; 
    const age = req.body.age; 
    const gen = req.body.gender;
    const days = req.body.days ;
    const description = req.body.descr ; */
    console.log(name);
    



});

app.listen (8090)