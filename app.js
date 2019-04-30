var express = require('express');
var firebase = require("firebase/app");
require("firebase/auth");
var firebase = require('firebase');
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
        return cb(new Error('Only jpeg/jpg/png images allowed'))
        //cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.use(express.static('client'));

app.get('/dogs', function (req, resp) {
    var list = [];
    for (var i = 0; i < obj1.length; i++) {
        list.push({
            Dname: obj1[i].Dogs_Name,
            Oname: obj1[i].name,           
            email: obj1[i].email,           
            Dage: obj1[i].age,
            Dgen: obj1[i].gender,
            breed: obj1[i].breed

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


/*app.get('/owners', function (req, resp) {
    resp.send(obj1);
});*/

var obj3
app.get('/matchDogs', function (req, resp) {

    var volunt = JSON.parse(JSON.stringify(obj2));;
    var dogs = JSON.parse(JSON.stringify(obj1));
    var l = 0;
    obj3 = [];
    day = obj1[1].days;
    for (var i = 0; i < dogs.length; i++) {
        for (var j = 0; j < volunt.length; j++) {
            l = 0;

            if (typeof (dogs[i].days) == 'object') {
                for (var k = 0; k < dogs[i].days.length; k++) {
                    volunt[j].days.forEach(function (Vday) {
                        if (dogs[i].days[k] == Vday) {
                            volunt[j].days.splice(l, 1);
                            l += 1;
                            obj3.push({
                                day: dogs[i].days[k],
                                dog: dogs[i],
                                vol: volunt[j]
                            });
                            dogs[i].days.splice(k, 1);
                        }
                    })


                }
            } else {
                volunt[j].days.forEach(function (Vday) {
                    if (dogs[i].days == Vday) {
                        volunt[j].days.splice(l, 1);
                        l += 1;
                        obj3.push({
                            day: dogs[i].days,
                            dog: dogs[i],
                            vol: obj2[j]
                        });
                        dogs[i].days = [];
                    }
                })


            }
        }

    }
    console.log(obj3)
    resp.send(obj3)
});





app.get('/search/:username', function (req, resp) {
    var search_item = req.params.username;
    var foundO = false;
    var foundV = false;
    var data12 = [];

    for (var i = 0; i < obj1.length; i++) {
        if (search_item == obj1[i].name) {
            foundO = true;
            data12.push({
                name: obj1[i].name,                
                email: obj1[i].email,
                Dname: obj1[i].Dogs_Name,
                Gender: obj1[i].gender,
                Breed: obj1[i].breed,
                Days: obj1[i].days

            });
            break;

        }
    }

    for (var j = 0; j < obj2.length; j++) {
        if (search_item == obj2[j].name) {
            foundV = true;
            data12.push({
                name: obj2[j].name,                
                email: obj2[j].email,
                Days: obj2[j].days
            });

            break;

        }
    }

    
    if (foundO === false && foundV === false) {
        resp.send(404);
    }else{
        resp.send(data12);

    }
});

/*app.get('/login/:userID', function (req, resp) {
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
        resp.status(404).send("not found");
    }


});*/

var dataOwners;
app.post('/addOwners1', function (req, resp) {  
    dataOwners = [];
    var h = JSON.stringify(req.body);
    //console.dir("all"+ j )
    console.log("h", h)
    var p1 = JSON.parse(h);
    //console.log(p)
    var data_owners = p1.data2;
    var par = JSON.parse(data_owners);
    const nameO = par[0].nameO;
    const idO = par[0].idO;
    const emailO = par[0].emailO;
    dataOwners.push({
        nameO: nameO,
        idO: idO,
        emailO: emailO

    })

    resp.send('fine');

});




app.post('/addOwners', upload.single('dogImage'), function (req, resp) {
    console.log(dataOwners)

    //console.log("req.file", req.file)
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var uploadStatus = 'File Uploaded Successfully';
        var p = "uploads/" + iName;

    } else {
        console.log('No File Uploaded');
        //resp.send("uns");
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';

    }
    let daysA = [];
    var j = JSON.stringify(req.body);
    //console.dir("all"+ j )
    var p = JSON.parse(j);
    //console.log(p)

    //console.log("data_owners", data_owners)

    const dogN = p.Dogs_Name;
    const breed = p.breed;
    const age = p.age;
    const gendre = p.gender;
    const days = p.days;
    const desc = p.descr;
    const image_path = "uploads/" + iName

    //console.log(ownerD)
    var found = false;
    var position ;
    for (var i = 0 ; i< obj1.length ; i++){
        if (dataOwners[0].nameO === obj1[i].name){
            found = true;
            position = i;

        }
    }

    if(found === true){
        console.log('true');
        obj1[position].Dogs_Name = dogN;
        obj1[position].breed = breed ;
        obj1[position].age = age;
        obj1[position].gender = gendre;
        obj1[position].days = days;
        obj1[position].descr = desc;
        obj1[position].dogImage = image_path;
        

    }

else{
    obj1.push({
        name: dataOwners[0].nameO,
        username: dataOwners[0].idO,
        email: dataOwners[0].emailO,
        Dogs_Name: dogN,
        breed: breed,
        age: age,
        gender: gendre,
        days: days,
        descr: desc,
        dogImage: image_path


    })

    

}

fs.writeFile("dogs.json", JSON.stringify(obj1), function (err, result) {
    if (err) {
        prompt("error submission not succesful");
    }
});
 
    resp.send("Fine that worked")

});

app.get('/loginCal/:userID', function (req, resp) {
    userid = req.params.userID;
    var found = false;
    for (var i = 0 ; i<obj1.length ; i++){
        if(userid == obj1[i].username){
            found = true;
        }
    }  
    console.log("o user einai : ", userid)
    var walk_days = []
    var found2 = false;
    if(obj3 == [] || found === false){
        resp.send(404);
    }
    for (var i = 0; i < obj3.length; i++) {
        if (userid == obj3[i].vol.username || userid == obj3[i].dog.username) {
            found2 = true
            Fname = obj3[i].vol.name.split(" ");
            walk_days.push({
                day: obj3[i].day,
                dog: obj3[i].dog.Dogs_Name,
                vol: Fname[0]

            });

        }

    }
    if(found2 === false){
        resp.send(404);
    }
    console.log("USER: ", userid)
    console.log(walk_days)
    if(found === false){
        resp.send(found)
    }else{
    resp.send(walk_days)
    }


});

app.post('/addVol', function (req, resp) {
    var posV;
    var foundVol = false;
    var nameV = dataOwners[0].nameO;
    var idV = dataOwners[0] .idO;
    var emailV = dataOwners[0].emailO;    
    var days = req.body.dedV;   
    var days_arr = days.split(',');
    
   
   for(var i = 0 ;i<obj2.length ; i++){
       if(nameV == obj2[i].name){
           posV = i;
           foundVol = true;
           break;

       }
    
   }

   if(foundVol === true){
       obj2[posV].days = days_arr;
   }
   else{
    obj2.push({
        name: nameV,        
        username: idV,
        email: emailV,       
        days: days_arr

    });
   }
    fs.writeFile("volunteers.json", JSON.stringify(obj2), function (err, result) {
        if (err) {
            return err;
        }
    });
    resp.send("Fine that worked");

});


module.exports = app;