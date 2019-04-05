var express = require('express');
var app = express();
var fs = require("fs");
var obj1 = JSON.parse(fs.readFileSync("dogs.json"));
var obj2 = JSON.parse(fs.readFileSync("volunteers.json"));

app.use('/uploads', express.static('uploads'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');


    },
    filename: function (req, file, cb) {
        iName = Date.now() + '-' + file.originalname;
        cb(null, iName)
    }

});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.use(express.static('client'));

app.get('/dogs', function (req, resp) { 
    var list = [] ;
    for (var i = 0; i < obj1.length; i++) {
        list.push({
            Dname: obj1[i].Dogs_Name,
            Oname : obj1[i].name,
            Lname : obj1[i].last_n,
            email : obj1[i].email,
            city : obj1[i].city,
            Dage : obj1[i].age,
            Dgen : obj1[i].gender ,
            breed : obj1[i].breed
        
        });
    }   
    resp.send(list);
});

app.get('/showDogs', function (req, resp) {
    resp.send(obj1);
});


app.get('/volunteers', function (req, resp) {
    resp.send(obj2);

});

app.get('/owners', function (req, resp) {
    resp.send(obj1);
});

app.get('/matchDogs', function (req, resp) {
    let dogs = obj1;
    let volunt = obj2;
    var l = 0;
    var obj3 = [];
    day = obj1[1].days;
    for (var i = 0; i < obj1.length; i++) {
        for (var j = 0; j < obj2.length; j++) {
            l = 0;
            if (typeof (obj1[i].days) == 'object') {
                for (var k = 0; k < dogs[i].days.length; k++) {
                    volunt[j].days.forEach(function (Vday) {
                        if (obj1[i].days[k] == Vday) {
                            volunt[j].days.splice(l, 1);
                            l += 1;
                            obj3.push({
                                day: obj1[i].days[k],
                                dog: obj1[i],
                                vol: obj2[j]
                            });
                        }
                    })


                }
            } else {
                volunt[j].days.forEach(function (Vday) {
                    if (obj1[i].days == Vday) {
                        volunt[j].days.splice(l, 1);
                        l += 1;
                        obj3.push({
                            day: obj1[i].days,
                            dog: obj1[i],
                            vol: obj2[j]
                        });
                    }
                })


            }
        }

    }
    resp.send(obj3)
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

app.post('/addOwners', upload.single('dogImage'), function (req, resp) {
    //console.log("req.file", req.file)
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var uploadStatus = 'File Uploaded Successfully';
        var p = "uploads/" + iName;

    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';

    }
    let daysA = [];
    var j = req.body;
    const name = j.name;
    const Lname = j.last_n;
    const uname = j.username;
    const email = j.email;
    const city = j.city;
    const Dname = j.Dogs_Name;
    const breed = j.breed;
    const age = j.age;
    const gen = j.gender;
    const days = j.days;
    const description = j.descr;
    const image_path = "uploads/" + iName

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
        descr: description,
        dogImage: image_path
    })

    fs.writeFile("dogs.json", JSON.stringify(obj1), function (err, result) {
        if (err) {
            prompt("error submission not succesful");
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