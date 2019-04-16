window.onload = function () {
    document.getElementById("Data_Dogs").addEventListener("click", function (_event) {
        fetch('http://127.0.0.1:8090/dogs')
            .then(function (response) {
                return response.json();
            })
            .then(body => {
                console.log(body);
                var Dogs = "";
                var Dogs = "";
                var OwnersF = "";
                var OwnersL = "";
                var email = "";
                var city = "";
                var age = "";
                var gender = "";
                var breed = "";

                for (var i = 0; i < body.length; i++) {
                    Dogs += body[i].Dname + "";
                    OwnersF += body[i].Oname;
                    OwnersL += body[i].Lname;
                    email += body[i].email;
                    city += body[i].city;
                    age += body[i].Dage;
                    gender += body[i].Dgen;
                    breed += body[i].breed;

                }

                document.getElementById("Dogs_Data").innerHTML = Dogs;
            })
        //document.getElementById("Dogs_Data").innerHTML= body.Age;
    });

    document.getElementById("Data_Vol").addEventListener("click", function (_event2) {
        fetch('http://127.0.0.1:8090/volunteers')
            .then(response => response.json())
            .then(function (body) {
                var volun = "";
                for (var i = 0; i < body.length; i++) {
                    volun += body[i].name + " " + body[i].last_n + " " + body[i].email + " " + body[i].city;
                    for (var j = 0; j < body[i].days.length; j++) {
                        volun += " " + body[i].days[j];
                    }
                    volun += "<br>";
                }
                document.getElementById("Vol_Data").innerHTML = volun;

            });


    });
    document.getElementById("Data_owners").addEventListener("click", function (event3) {
        fetch("http://127.0.0.1:8090/owners")
            .then(response => response.json())
            .then(function (body) {
                var owners = "";
                for (var i = 0; i < body.length; i++) {
                    owners += body[i].name + " " + body[i].last_n + " " + body[i].email + " " + body[i].city + " " + body[i].Dogs_Name + "<br>";
                }

                document.getElementById("Owners_Data").innerHTML = owners;
            });

    });

    document.getElementById("MatchDogsVol").addEventListener("click", function (event7) {
        fetch("http://127.0.0.1:8090/matchDogs")
            .then(function (response) {
                return response.json()

            })

            .then(function (body) {
                var M = "";
                var Te = "";
                var W = "";
                var Th = "";
                var F = "";
                var Sa = "";
                var Su = "";
                var timetable = "";

                for (var i = 0; i < body.length; i++) {

                    if (body[i].day == 'Monday') {
                        M += "  Dog: " + body[i].dog.Dogs_Name + "    Volunteer: " + body[i].vol.name;
                    }
                    if (body[i].day == 'Tuesday') {
                        Te += "   Dog: " + body[i].dog.Dogs_Name + "   Volunteer: " + body[i].vol.name;

                    }
                    if (body[i].day == 'Wednesday') {
                        W += "  Dog: " + body[i].dog.Dogs_Name + "   Volunteer: " + body[i].vol.name;
                    }

                    if (body[i].day == 'Thursday') {
                        Th += "  Dog: " + body[i].dog.Dogs_Name + "    Volunteer: " + body[i].vol.name;
                    }
                    if (body[i].day == 'Friday') {
                        F += "   Dog: " + body[i].dog.Dogs_Name + "    Volunteer: " + body[i].vol.name;

                    }
                    if (body[i].day == 'Saturday') {
                        Sa += "   Dog: " + body[i].dog.Dogs_Name + "   Volunteer: " + body[i].vol.name;

                    }
                    if (body[i].day == 'Sunday') {
                        Su += "   Dog: " + body[i].dog.Dogs_Name + "   Volunteer: " + body[i].vol.name;

                    }


                }

                timetable += "Monday: " + M + "<br>" + " Tuesday: " + Te + "<br>" + " Wednesday:  " + W + "<br>" + " Thursday:" + Th + "<br>" + "Friday: " + F + "<br>" + " Saturday:" + Sa + "<br>" + "  Sunday: " + Su;

                document.getElementById("MatchData").innerHTML = timetable;
            })


    });

    document.getElementById("search").addEventListener("keyup", function (event4) {
        if (event.keyCode === 13) {
            var usename = document.getElementById("search").value;
            fetch('http://127.0.0.1:8090/search/' + usename)
                .then(response => response.text())
                .then(function (body) {
                    document.getElementById("search_data").innerHTML = body;

                });

        }

    });

var userID

    document.getElementById("Login").addEventListener("click", function (event5) {
        var loged_in = false;
        userID = document.getElementById("Login_In").value;
        console.log("user id: ", userID);
        var x = document.getElementById("LoginPopUp");
        

        if (userID == "admin") {
            pas = prompt("Give password: ");
            if (pas == "pas") {
                window.location.href = 'https://www.youtube.com/';
            }
        }


        fetch('http://127.0.0.1:8090/login/' + userID)
            .then(function (response) {
                console.log(response);
                return response.text();

            })
            .then(function (body) {
              
                if (body == 'user') {
                    loged_in = true
                    //window.location.href = "https://www.google.com";
                    var x = document.getElementById('logIn');
                    if (x.style.display === "none") {
                      x.style.display = "block";
                    } else {
                      x.style.display = "none";
            
            
                    }
                
                code_text = "<p><b>Welcome</b>  "+ userID+"</p>"
                document.getElementById("Welcome").innerHTML = code_text;
                }

            });
    });



    document.getElementById('f2').addEventListener('submit', async function (event) {
        event.preventDefault();
        try {
            let nameV = document.getElementById('validationCustom01V').value;
            let LnameV = document.getElementById('validationCustom02V').value;
            let unameV = document.getElementById('validationCustomUsernameV').value
            let emailV = document.getElementById('exampleFormControlInput1V').value
            let cityV = document.getElementById('validationCustom03V').value
            daysV = []
            if (document.getElementById("M2").checked == true) {
                var x2 = document.getElementById("M2").value;

                daysV.push(x2)
            }

            if (document.getElementById("Tu2").checked == true) {
                var x2 = document.getElementById("Tu2").value;
                daysV.push(x2)
            }

            if (document.getElementById("W2").checked == true) {
                var x2 = document.getElementById("W2").value;
                daysV.push(x2)
            }

            if (document.getElementById("Th2").checked == true) {
                var x2 = document.getElementById("Th2").value;
                daysV.push(x2)
            }

            if (document.getElementById("F2").checked == true) {
                var x2 = document.getElementById("F2").value;
                daysV.push(x2)
            }
            if (document.getElementById("Sa2").checked == true) {
                var x2 = document.getElementById("Sa2").value;
                daysV.push(x2)
            }
            if (document.getElementById("Su2").checked == true) {
                var x2 = document.getElementById("Su2").value;
                daysV.push(x2)
            }

            var dataV = {
                name: nameV,
                last_n: LnameV,
                username: unameV,
                email: emailV,
                city: cityV,
                days: daysV
            }
            dedV = JSON.stringify(dataV);
            let response = await fetch('http://127.0.0.1:8090/addVol', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "dedV=" + dedV
            })

            if (!response.ok) {
                throw new Error("problem adding data" + response.code);
            }
        } catch (error) {
            console.log(error)
            alert("problem: " + error);
        }

    });





document.getElementById("percal").addEventListener('click',  function (event) {   
        //var userid = document.getElementById("Login_In").value;
        console.log("USER",userID)
        fetch('http://127.0.0.1:8090/loginCal/'+ userID)
        .then(function (response) {
            a = response.json()
            console.log(a);
            return a;

        })
        

        .then(function (body) {
        
        for (var i = 0; i< body.length; i++ ){
            let a = body[i].dog
            if (body[i].day == 'Monday'){
                
                console.log(a)
                document.getElementById("Mon1").innerHTML = a;
            }
            if(body[i].day == 'Tuesday'){
                document.getElementById("Tue1").innerHTML =  a;

            }
            if(body[i].day == 'Wednesday'){
                document.getElementById("Wed1").innerHTML =  a;

            }
            if(body[i].day == 'Thursday'){
                document.getElementById("Thu1").innerHTML =  a;

            }
            if(body.day == 'Friday'){
                document.getElementById("F1").innerHTML =  a;

            }

            if(body[i].day == 'Saterday'){
                document.getElementById("Sat1").innerHTML =  a;

            }
            if(body[i].day == 'Sunday'){
                document.getElementById("Sun1").innerHTML =  a;

            }
        }
    })




});


document.getElementById("showMore").addEventListener('click', C());

function C() {
    fetch('http://127.0.0.1:8090/showDogs')
        .then(response => response.json())
        .then(function (body) {
            //console.log(body);
            let length = body.length;

            let rlength = Math.floor(length / 2);

            let k = 0
            let code1 = "";
            if (length % 2 == 0) {
                for (var i = 0; i < length / 2; i++) {
                    code1 += '<div class="d-flex justify-content-center"> ';
                    code1 += ' <div class="card border-secondary mb-3" style="max-width: 45rem;">';
                    code1 += '<div class="card-body text-secondary">';
                    code1 += '  <div class="container">';
                    code1 += ' <div class="row">';
                    for (var j = 0; j < 2; j++) {
                        code1 += '<div class="col">';
                        code1 += '<div class="card" style="width: 18rem;">';
                        code1 += '<div class="card-header">';
                        code1 += ' <h5 class="card-title">' + body[k].Dogs_Name + '</h5>';
                        code1 += '</div>';
                        code1 += '<img class="card-img-top" src=" ' + body[k].dogImage + '" alt="Dog image" width=200 height=350>';
                        code1 += '<div class="card-body">';
                        code1 += ' <p class="card-text">' + body[k].descr + '</p>';
                        code1 += '</div>';
                        code1 += ' <ul class="list-group list-group-flush">';
                        code1 += ' <li class="list-group-item">' + body[k].breed + '</li>';
                        code1 += ' <li class="list-group-item">' + body[k].age + '</li>';
                        code1 += '<li class="list-group-item">' + body[k].gender + '</li>';
                        code1 += '</ul>';
                        code1 += '</div>';
                        code1 += '</div>';
                        k += 1;
                    }
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';
                    document.getElementById("moreDogs").innerHTML = code1;

                }
                //console.log("K_telos for loop1",k) 
            } else {
                for (var i = 0; i < rlength; i++) {
                    code1 += '<div class="d-flex justify-content-center"> ';
                    code1 += ' <div class="card border-secondary mb-3" style="max-width: 45rem;">';
                    code1 += '<div class="card-body text-secondary">';
                    code1 += '  <div class="container">';
                    code1 += ' <div class="row">';
                    for (var j = 0; j < 2; j++) {
                        code1 += '<div class="col">';
                        code1 += '<div class="card" style="width: 18rem;">';
                        code1 += '<div class="card-header">';
                        code1 += ' <h5 class="card-title">' + body[k].Dogs_Name + '</h5>';
                        code1 += '</div>';
                        code1 += '<img class="card-img-top" src=" ' + body[k].dogImage + '" alt="Dog image" width=200 height=350>';
                        code1 += '<div class="card-body">';
                        code1 += ' <p class="card-text">' + body[k].descr + '</p>';
                        code1 += '</div>';
                        code1 += ' <ul class="list-group list-group-flush">';
                        code1 += ' <li class="list-group-item">' + body[k].breed + '</li>';
                        code1 += ' <li class="list-group-item">' + body[k].age + '</li>';
                        code1 += '<li class="list-group-item">' + body[k].gender + '</li>';
                        code1 += '</ul>';
                        code1 += '</div>';
                        code1 += '</div>';
                        k += 1;
                    }
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';
                }

                k = length - 1;
                code1 += '<div class="d-flex justify-content-center"> ';
                code1 += ' <div class="card border-secondary mb-3" style="max-width: 45rem;">';
                code1 += '<div class="card-body text-secondary">';
                code1 += '  <div class="container">';
                code1 += ' <div class="row">';

                code1 += '<div class="col">';
                code1 += '<div class="card" style="width: 18rem;">';
                code1 += '<div class="card-header">';
                code1 += ' <h5 class="card-title">' + body[k].Dogs_Name + '</h5>';
                code1 += '</div>';
                code1 += '<img class="card-img-top" src=" ' + body[k].dogImage + '" alt="Dog image" width=200 height=350>';
                code1 += '<div class="card-body">';
                code1 += ' <p class="card-text">' + body[k].descr + '</p>';
                code1 += '</div>';
                code1 += ' <ul class="list-group list-group-flush">';
                code1 += ' <li class="list-group-item">' + body[k].breed + '</li>';
                code1 += ' <li class="list-group-item">' + body[k].age + '</li>';
                code1 += '<li class="list-group-item">' + body[k].gender + '</li>';
                code1 += '</ul>';
                code1 += '</div>';
                code1 += '</div>';
                document.getElementById("moreDogs").innerHTML = code1;



            }
        });

}

setInterval(C, 3000);
}


