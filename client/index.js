var name;
var id;
var email;
var Owner = 'owner';
var Volunteer = "vol";
var ui1 = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.

            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            if (document.getElementById('loader') != null) {
                document.getElementById('loader').style.display = 'none';
            }


        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'http://localhost:8090',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        /*firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID*/
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8090',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui1.start('#firebaseui-auth-container1', uiConfig);

var url = 'http://localhost:8090';
var currentCategory = null;
var currentCategory_data = null;
var categories = [];
var userSignedIn = false;



window.onload = loginV();

function loginV() {
    function newLoginHappenedV(userV) {
        console.log('type: ', localStorage.getItem("owner_save"));
        if (userV && localStorage.getItem("owner_save") == Owner) {
            console.log('user = owner')
            app(userV);

        } else if (userV && localStorage.getItem("owner_save") == Volunteer) {
            console.log('volunteer ')
            appV(userV)

            //var provider = new firebase.auth.GoogleAuthProvider();
            //firebase.auth().signInWithRedirect(provider);                
        }

    }

    firebase.auth().onAuthStateChanged(newLoginHappenedV);

}

function appV(userV) {

    name = userV.displayName;
    id = userV.uid;
    console.log('app tou volunteer')
    email = userV.email;
    var s_nameV = name.split(" ");
    var FnameV = s_nameV[0];
    var LnameV = s_nameV[1];
    console.log(name)
    document.getElementById('hi').innerHTML = name;
    document.getElementById('become_mem').style.display = 'none';
    document.getElementById('updateShowB').style.display = 'block';
    document.getElementById('bec_mem').textContent = 'Add data';
    document.getElementById('Welcome_card').textContent = 'Welcome ' + FnameV;
    document.getElementById('update_data').style.display = 'block';
    document.getElementById("Nav_Cal").style.display = "block";
    document.getElementById("PernsonalCal").style.display = "block";
    code_text = '<div class="form-check form-check-inline" > '
    code_text += '<div id="logout" style="width: 170px;"> <p id = "logout"><b>Welcome</b>  ' + FnameV + ' </p> </div>';
    code_text += '<div><button id="Logout" class="btn btn-outline-dark" type="button">Log out</button> </div>';
    code_text += '</div>';
    document.getElementById("Welcome").innerHTML = code_text;
    document.getElementById("Welcome").style.display = 'block';

    document.getElementById('Logout').addEventListener('click', function (event) {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });

    });



}



function app(user) {

    name = user.displayName;
    id = user.uid;
    email = user.email;
    var s_name = name.split(" ");
    var Fname = s_name[0];
    var Lname = s_name[1];
    console.log("app tou owner");
    document.getElementById('hi').innerHTML = name;
    document.getElementById('become_mem').style.display = 'none';
    document.getElementById('updateShowB').style.display = 'block';
    document.getElementById('bec_mem').textContent = 'Add data';
    document.getElementById('Welcome_card').textContent = 'Welcome ' + Fname;
    document.getElementById('update_data').style.display = 'block';
    //id = 'MarEu';
    fetch('http://localhost:8090/login/' + id)
        .then(function (response) {
            console.log(response);
            return response.text();
        })
        .then(function (body) {
            if (body == 'user') {
                document.getElementById("Nav_Cal").style.display = "block";
                document.getElementById("PernsonalCal").style.display = "block";
                loged_in = true;

            }
            code_text = '<div class="form-check form-check-inline" > '
            code_text += '<div id="logout" style="width: 170px;"> <p id = "logout"><b>Welcome</b>  ' + Fname + ' </p> </div>';
            code_text += '<div><button id="Logout" class="btn btn-outline-dark" type="button">Log out</button> </div>'
            code_text += '</div>'
            document.getElementById("Welcome").innerHTML = code_text;
        });

    var user = firebase.auth().currentUser;
    console.log(user)

    document.getElementById('Logout').addEventListener('click', function (event) {
        firebase.auth().signOut().then(function () {
            console.log('signed out ');
        }).catch(function (error) {
            // An error happened.
        });

    });

}


document.getElementById('ownerB').addEventListener('click', function (event) {

    localStorage.setItem("owner_save", Owner);
    //console.log('owner_save:', owner_save) ;


});
document.getElementById('VolunteerB').addEventListener('click', function (event) {
    localStorage.setItem("owner_save", Volunteer);
    //console.log('owner_save:',owner_save)

});




window.onload = function () {
    document.getElementById('updateB').addEventListener('click', async function (event) {
        if (localStorage.getItem("owner_save") === Owner) {
            if (document.getElementById('form1').style.display == 'block') {
                document.getElementById('form1').style.display = 'none';
            } else {
                document.getElementById('form1').style.display = 'block';
            }
        } else {
            if (document.getElementById('form2').style.display == 'block') {
                document.getElementById('form2').style.display = 'none';
            } else {
                document.getElementById('form2').style.display = 'block';
            }


        }
        data2 = [];
        data2.push({
            nameO: name,
            idO: id,
            emailO: email
        })
        data2 = JSON.stringify(data2)
        console.log(data2)
        let response = await fetch('http://localhost:8090/addOwners1', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "data2=" + data2
        })
    });



    document.getElementById("Data_Dogs").addEventListener("click", function (_event) {
        fetch('http://localhost:8090/dogs')
            .then(function (response) {
                return response.json();
            })
            .then(body => {
                table_code = '<div class="d-flex justify-content-center"> <div class="card border-secondary lg-8" style="max-width: 99rem;">  <div class="card-body text-secondary">'
                table_code += '<div class="container">  <div class="table-responsive-md"> <table class="table table-hover">  <thead>  <tr>  <th style="width: 10%">Dog</th> '
                table_code += ' <th style="width: 5%">Age</th>'
                table_code += ' <th style="width: 5%">Gender</th>'
                table_code += ' <th style="width: 15%">Breed</th>'
                table_code += ' <th style="width: 40%"> Full Name</th>'                
                table_code += ' <th style="width: 25%">email</th>'                
                table_code += '</tr>  </thead> <tbody>'

                for (var i = 0; i < body.length; i++) {
                    table_code += '<tr>';
                    table_code += ' <td>' + body[i].Dname + '</td>';
                    table_code += ' <td>' + body[i].Dage + '</td>';
                    table_code += '<td>' + body[i].Dgen + '</td>';
                    table_code += '<td>' + body[i].breed + '</td>';
                    table_code += '<td>' + body[i].Oname + '</td>';                   
                    table_code += '<td>' + body[i].email + '</td>';                    
                    table_code += '</tr>'
                }

                table_code += '</tbody> </table> </div>  </div>  </div> </div>  </div>'
                document.getElementById("Dogs_Data").innerHTML = table_code;
            })

    });



    document.getElementById("Data_Vol").addEventListener("click", function (_event2) {
        let days
        fetch('http://localhost:8090/volunteers')
            .then(response => response.json())
            .then(function (body) {
                Vol_table = ' <div class="d-flex justify-content-center">  <div class="card border-secondary ml-3" style="max-width: 85rem;">  <div class="card-body text-secondary"> '
                Vol_table += ' <div class="container">  <div class="table-responsive-md"> <table class="table table-hover">  <thead>'
                Vol_table += '<tr> '
                Vol_table += '<th style="width: 40%"> Full Name</th>  <th style="width: 25%">email</th>   <th style="width: 35%">Days Available</th> </tr> </thead>  <tbody>'

                for (var i = 0; i < body.length; i++) {
                    days = "";
                    Vol_table += '<tr>'
                    Vol_table += '<td>' + body[i].name + '</td>';                   
                    Vol_table += '<td>' + body[i].email + '</td>';
                   
                    if (body[i].days.length > 1) {
                        for (var j = 0; j < body[i].days.length - 1; j++) {
                            days += body[i].days[j] + " , ";
                        }
                        days += body[i].days[body[i].days.length - 1];

                    } else {
                        days = body[i].days
                    }
                    Vol_table += '<td>' + days + '</td>';
                    Vol_table += '</tr>';

                }
                Vol_table += '</tbody>  </table>  </div>  </div>  </div> </div> </div>';
                document.getElementById("Vol_Data").innerHTML = Vol_table;

            });


    });





    document.getElementById("Data_owners").addEventListener("click", function (event3) {
        fetch("http://localhost:8090/owners")
            .then(response => response.json())
            .then(function (body) {
                Owners_table = '<div class="d-flex justify-content-center"> <div class="card border-secondary ml-3" style="max-width: 85rem;">  <div class="card-body text-secondary"> ';
                Owners_table += '<div class="container">';
                Owners_table += '  <div class="table-responsive-md">  ';
                Owners_table += '    <table class="table table-hover">';
                Owners_table += '      <thead>';
                Owners_table += '        <tr>';
                Owners_table += '          <th style="width: 50%">Full Name</th>';               
                Owners_table += '          <th style="width: 30%">email</th>';              
                Owners_table += '          <th style="width: 20%"> Dog</th>';
                Owners_table += '        </tr>';
                Owners_table += '      </thead>';
                Owners_table += '      <tbody>';
                for (var i = 0; i < body.length; i++) {
                    Owners_table += '<tr>';
                    Owners_table += '<td>' + body[i].name + '</td>';                   
                    Owners_table += '<td>' + body[i].email + '</td>';                   
                    Owners_table += '<td>' + body[i].Dogs_Name + '</td>';
                    Owners_table += '</tr>';


                }
                Owners_table += ' </tbody> </table>  </div> </div>  </div>  </div>  </div>';
                document.getElementById("Owners_Data").innerHTML = Owners_table;
            });

    });

    document.getElementById("MatchDogsVol").addEventListener("click", function (event7) {
        fetch("http://localhost:8090/matchDogs")
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
                code = '"<div class="d-flex justify-content-center">  <div class="card border-secondary ml-3" style="max-width: 85rem;">  <div class="card-body text-secondary">    <div class="container"> '
                code += ' <meta name="viewport" content="width=device-width, initial-scale=1.0">  <div class="table-responsive">   <table id = "Calendar">     <thead id = "CalendarHead">    <tr>'
                code += ' <th> <span class="long">Monday</span>  <span class="short">Mon</span>  </th>  <th>  <span class="long">Tuesday</span>  <span class="short">Tue</span>  </th>'
                code += '<th> <span class="long">Wendsday</span> <span class="short">We</span>  </th>  <th>  <span class="long">Thursday</span>  <span class="short">Thur</span>  </th>'
                code += '<th>  <span class="long">Friday</span> <span class="short">Fri</span>  </th> <th>  <span class="long">Saturday</span>  <span class="short">Sat</span>  </th>'
                code += ' <th> <span class="long">Sunday</span>   <span class="short">Sun</span>  </th> </tr>  </thead>   <tbody id = "CalendarBody">';

                let foundM = false;
                let foundTue = false;
                let foundW = false;
                let foundTh = false;
                let foundF = false;
                let foundSat = false;
                let foundSun = false;
                let user_name ;
                let count = 0;
                for (var i = 0; i < body.length; i++) {
                    foundM = false;
                    foundTue = false;
                    foundW = false;
                    foundTh = false;
                    foundF = false;
                    foundSat = false;
                    foundSun = false;
                    user_name = body[i].vol.name.split(" ");
                    code += '<tr>'
                    count += 1
                    if (body[i].day == 'Monday') {
                        foundM = true;

                    }
                    if (body[i].day == 'Tuesday') {
                        foundTue = true;


                    }
                    if (body[i].day == 'Wednesday') {
                        foundW = true;

                    }
                    if (body[i].day == 'Thursday') {
                        foundTh = true;

                    }
                    if (body[i].day == 'Friday') {
                        foundF = true;

                    }
                    if (body[i].day == 'Saturday') {
                        foundSat = true;


                    }
                    if (body[i].day == 'Sunday') {
                        foundSun = true;

                    }


                    if (foundM === true) {
                        code += '<td><div >' + '<b>Dog</b>: ' + body[i].dog.Dogs_Name + "   <b>Volunteer</b>: " + user_name[0] + ' </div></td>'

                    } else if (foundM === false) {
                        code += ' <td></td>'

                    }
                    if (foundTue === true) {
                        code += '<td>  <b>Dog</b>: ' + body[i].dog.Dogs_Name + "   <b>Volunteer</b>: " + user_name[0] + '</td>';

                    } else if (foundTue === false) {
                        code += '<td></td>'
                    }
                    if (foundW === true) {
                        code += "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "   <b>Volunteer</b>: " + user_name[0] + "</td>";
                    } else if (foundW === false) {
                        code += '<td></td>'
                    }
                    if (foundTh === true) {
                        code += "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "    <b>Volunteer</b>: " + user_name[0] + '</td>';
                    } else if (foundTh === false) {
                        code += '<td></td>'
                    }
                    if (foundF === true) {
                        code += "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "    <b>Volunteer</b>: " + user_name[0] + '</td>'


                    } else if (foundF === false) {
                        code += '<td></td>'
                    }
                    if (foundSat === true) {
                        code += "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "    <b>Volunteer</b>: " + user_name[0] + '</td>'

                    } else if (foundSat === false) {
                        code += '<td></td>'
                    }
                    if (foundSun === true) {
                        code += "<td> <b>Dog</b>: " + body[i].dog.Dogs_Name + "   <b> Volunteer</b>: " + user_name[0] + '</td>'

                    } else if (foundSun === false) {
                        code += '<td></td>'
                    }
                    code += '</tr>'
                }

                while (count % 4 != 0) {
                    code += '<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>'
                    count += 1
                }
                code += '  </tbody>  </table>   </div> </div>  </div>  </div>  </div>   </div>'
                document.getElementById("MatchData").innerHTML = code;
            })


    });

    document.getElementById("search").addEventListener("keyup", function (event4) {
        if (event.keyCode === 13) {
            var usename = name;
            fetch('http://localhost:8090/search/' + usename)
                .then(response => response.json())
                .then(function (body) {
                    search_table = '<div class="d-flex justify-content-center">';
                    search_table += '<div class="card border-secondary ml-3" style="max-width: 85rem;"> ';
                    search_table += '  <div class="card-body text-secondary">';
                    search_table += '    <div class="container">';
                    search_table += '      <div class="table-responsive-md">';
                    search_table += '        <table class="table table-hover">';
                    search_table += '          <thead>';
                    search_table += '            <tr>';


                    if (typeof (body[0].Dname) != "undefined") {
                        search_table += '  <th style="width: 40%"> First Name</th>';                        
                        search_table += '  <th style="width: 15%">email</th>';
                        search_table += '  <th style="width: 10%">Dog</th>';
                        search_table += '  <th style="width: 5%">Gender</th>';
                        search_table += '  <th style="width: 15%">Breed</th>';
                        search_table += '  <th style="width: 15%">Days Available</th>';
                        search_table += '    </tr>';
                        search_table += '  </thead>';
                        search_table += '  <tbody>';
                        search_table += '<tr>';
                        search_table += '<td>' + body[0].name + '</td>';                        
                        search_table += '<td>' + body[0].email + '</td>';
                        search_table += '<td>' + body[0].Dname + '</td>';
                        search_table += '<td>' + body[0].Gender + '</td>';
                        search_table += '<td>' + body[0].Breed + '</td>';
                        search_table += '<td>' + body[0].Days + '</td>';
                        search_table += '</tr>';


                    } else {
                        search_table += '<th style="width: 50%"> Name</th>';                       
                        search_table += '<th style="width: 25%">email</th>';
                        search_table += '<th style="width: 25%">Days Available</th>';
                        search_table += '    </tr>';
                        search_table += '  </thead>';
                        search_table += '  <tbody>';
                        search_table += ' <tr> ';
                        search_table += ' <td> ' + body[0].name + '</td>';                        
                        search_table += ' <td> ' + body[0].email + '</td>';
                        search_table += ' <td> ' + body[0].Days + '</td>';
                        search_table += ' </tr> ';

                    }


                    search_table += '</tbody>  </table>  </div>  </div>  </div>  </div>  </div>';

                    document.getElementById("search_data").innerHTML = search_table;

                });

        }

    });

    var userID

    /*  document.getElementById("Login").addEventListener("click", function (event5) {
          var loged_in = false;
          userID = document.getElementById("Login_In").value;
          console.log("user id: ", userID);
          var x = document.getElementById("LoginPopUp");

          if (userID == "admin") {
              pas = prompt("Give password: ");
              if (pas == "pas") {
                  window.location.href = 'https://www.youtube.com/';
                  document.getElementById("Nav_Cal").style.display = "block";
              }
          }


          fetch('http://localhost:8090/login/' + userID)
              .then(function (response) {
                  console.log(response);
                  return response.text();
              })
              .then(function (body) {

                  if (body == 'user') {
                      document.getElementById("Nav_Cal").style.display = "block";
                      document.getElementById("PernsonalCal").style.display = "block";
                      loged_in = true
                      //window.location.href = "https://www.google.com";
                      var x = document.getElementById('logIn');
                      if (x.style.display === "none") {
                          x.style.display = "block";
                      } else {
                          x.style.display = "none";


                      }
                      code_text = '<div class="form-check form-check-inline" > '
                      code_text += '<div id="logout" style="width: 170px;"> <p id = "logout"><b>Welcome</b>  ' + userID + ' </p> </div>';
                      code_text += '<div><button id="Logout" class="btn btn-outline-dark" type="button">Log out</button> </div>'
                      code_text += '</div>'
                      document.getElementById("Welcome").innerHTML = code_text;
                  }

              });
      });*/



    document.getElementById('f2').addEventListener('submit', async function (event) {
        event.preventDefault();
        try {

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

            let response = await fetch('http://localhost:8090/addVol', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "dedV=" + daysV
            })

            if (!response.ok) {
                throw new Error("problem adding data" + response.code);
            }
        } catch (error) {
            console.log(error)
            alert("problem: " + error);
        }

    });


    document.getElementById("percal").addEventListener('click', function (event) {
        userID = id;   
        fetch('http://localhost:8090/loginCal/' + userID)
            .then(function (response) {
                a = response.json()
                console.log(a);
                return a;

            })

            .then(function (body) {

                for (var i = 0; i < body.length; i++) {
                    let a = body[i].dog + ' - ' + body[i].vol;
                    if (body[i].day == 'Monday') {

                        console.log(a)
                        document.getElementById("Mon1").innerHTML = a;
                    }
                    if (body[i].day == 'Tuesday') {
                        document.getElementById("Tue1").innerHTML = a;

                    }
                    if (body[i].day == 'Wednesday') {
                        document.getElementById("Wed1").innerHTML = a;

                    }
                    if (body[i].day == 'Thursday') {
                        document.getElementById("Thu1").innerHTML = a;

                    }
                    if (body.day == 'Friday') {
                        document.getElementById("F1").innerHTML = a;

                    }

                    if (body[i].day == 'Saterday') {
                        document.getElementById("Sat1").innerHTML = a;

                    }
                    if (body[i].day == 'Sunday') {
                        document.getElementById("Sun1").innerHTML = a;

                    }
                }
            })




    });


    document.getElementById("showMore").addEventListener('click', C());

    function C() {
        fetch('http://localhost:8090/showDogs')
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