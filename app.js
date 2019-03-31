var express = require('express');
var app = express();
var fs = require("fs");
var obj1 = JSON.parse(fs.readFileSync("dogs.json"));
var obj2 = JSON.parse(fs.readFileSync("volunteers.json"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('client'));

app.get('/dogs', function (req, resp) {
    resp.send(obj1);


});

app.get('/volunteers', function (req, resp) {
    resp.send(obj2);

});

app.get('/owners', function (req, resp) {
    resp.send(obj1);
});

app.get('/search/:username', function (req, resp) {
    var search_item = req.params.username;
    var foundO = false;
    var foundV = false;
    var data1 = "";
    var data2 = "";
    for (var i = 0; i < obj1.length; i++) {
        if (search_item == obj1[i].username) {
            foundO == true;
            data1 += obj1[i].name + " " + obj1[i].last_n + " " + obj1[i].username + " " +
                obj1[i].Dogs_Name + " " + obj1[i].breed + " " + obj1[i].age + " " + obj1[i].gender;
            resp.send(data1);
            break;

        }
    }
    for (var j = 0; j < obj2.length; j++) {
        if (search_item == obj2[j].username) {
            foundV = true;
            data2 += obj2[j].name + " " + obj2[j].last_n + " " + obj2[j].username + " " + obj2[j].email;
            resp.send(data2);
            break;

        }
    }
    if (foundO === false && foundV === false) {
        resp.send(404);
    }
});

app.get('/login/:userID', function (req, resp) {
    var search_item = req.params.userID;
    var foundO = false;
    var foundV = false;

    for (var i = 0; i < obj1.length; i++) {
        if (search_item == obj1[i].username) {
            foundO == true;
            resp.send('user');
            break;

        }
    }

    for (var j = 0; j < obj2.length; j++) {
        if (search_item == obj2[j].username) {
            foundV = true;
            resp.send('user');
            break;

        }
    }

    if (search_item == 'admin') {
        resp.send('admin');
    }


    if (foundO === false && foundV === false) {
        resp.status(404).send("sahbkhab");
    }


});

app.post('/addOwners', function (req, resp) {
    var j = req.body.ded;
    console.log("j:",j);
    var j_parsed = JSON.parse(j);
    console.log(j_parsed);
    const name = j_parsed.name;
    const Lname = j_parsed.last_n;
    const uname = j_parsed.username;
    const email = j_parsed.email;
    const city = j_parsed.city;
    const Dname = j_parsed.Dogs_Name;
    const breed = j_parsed.breed;
    const age = j_parsed.age;
    const gen = j_parsed.gender;
    const days = j_parsed.days;
    const description = j_parsed.descr;

    obj1.push({
        name: name,
        last_n: Lname,
        username: uname,
        email: email,
        city: city,
        Dogs_Name: Dname,
        breed: breed,
        age: age,
        gender: gen,
        days: days,
        descr: description
    })

    fs.writeFile("dogs.json", JSON.stringify(obj1), function (err, result) {
        if (err) {
            return err;
        }
    });
    resp.send("Fine that worked")

});

app.post('/addVol', function (req, resp) {

    var jV = req.body.dedV
    var j_parsedV = JSON.parse(jV);
    console.log(j_parsedV);
    const name = j_parsedV.name;
    const Lname = j_parsedV.last_n;
    const uname = j_parsedV.username;
    const email = j_parsedV.email;
    const city = j_parsedV.city;
    const days = j_parsedV.days;

    obj2.push({
        name: name,
        last_n: Lname,
        username: uname,
        email: email,
        city: city,
        days: days,

    });

    fs.writeFile("volunteers.json", JSON.stringify(obj2), function (err, result) {
        if (err) {
            return err;
        }
    });
    resp.send("Fine that worked");

});


module.exports = app;