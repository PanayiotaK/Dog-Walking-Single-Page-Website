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

    if (email == 'DogWalkingPage123@gmail.com' || email == 'dogwalkingpage123@gmail.com') {
        document.location.replace('http://localhost:8090/admin.html');
        console.log('admin')

    } else {
        var s_nameV = name.split(" ");
        var FnameV = s_nameV[0];
        var LnameV = s_nameV[1];
        console.log(name)
        document.getElementById("Update").style.display = "block";
        document.getElementById('become_mem').style.display = 'none';
        document.getElementById('updateShowB').style.display = 'block';
        document.getElementById('bec_mem').textContent = 'Add data';
        document.getElementById('Welcome_card').textContent = 'Welcome ' + FnameV;
        //document.getElementById('update_data').style.display = 'block';
        document.getElementById("Nav_Cal").style.display = "block";
        document.getElementById("PernsonalCal").style.display = "block";
        code_text = '<div class="form-check form-check-inline" > '
        code_text += '<div id="logout" style="width: 170px;"> <p id = "logout"><b>Welcome</b>  ' + FnameV + ' </p> </div>';
        code_text += '<div><button id="Logout" class="btn btn-outline-dark " type="button" onclick = "logoutfunct()">Log out</button> </div>';
        code_text += '</div>';
        document.getElementById("Welcome").innerHTML = code_text;
        document.getElementById("Welcome").style.display = 'block';



    }

}

function logoutfunct() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        location.reload();
    }, function (error) {
        // An error happened.
    });
}



function app(user) {

    name = user.displayName;
    id = user.uid;
    email = user.email;
    if (email == 'DogWalkingPage123@gmail.com' || email == 'dogwalkingpage123@gmail.com') {
        document.location.replace('http://localhost:8090/admin.html');
        console.log('admin')

    } else {
        var s_name = name.split(" ");
        var Fname = s_name[0];
        var Lname = s_name[1];
        console.log("app tou owner");
        document.getElementById("Update").style.display = "block";
        document.getElementById('become_mem').style.display = 'none';
        document.getElementById('updateShowB').style.display = 'block';
        document.getElementById('bec_mem').textContent = 'Add data';
        document.getElementById('Welcome_card').textContent = 'Welcome ' + Fname;
        //document.getElementById('update_data').style.display = 'block';
        document.getElementById("Nav_Cal").style.display = "block";
        document.getElementById("PernsonalCal").style.display = "block";
        //id = 'MarEu';    
        code_text = '<div class="form-check form-check-inline" > '
        code_text += '<div id="logout" style="width: 170px;"> <p id = "logout"><b>Welcome</b>  ' + Fname + ' </p> </div>';
        code_text += '<div><button id="Logout" class="btn btn-outline-dark" type="button" onclick="logoutfunct()">Log out</button> </div>'
        code_text += '</div>'
        document.getElementById("Welcome").innerHTML = code_text;


        var user = firebase.auth().currentUser;
        console.log(user)
    }


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

    var userID

    document.getElementById('f2').addEventListener('submit', async function (event) {
        event.preventDefault();
        var error 
        try {
            error = false;
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
                error = true
                throw new Error("problem adding data" + response.code);
            }
        } catch (error) {
            console.log(error)
            alert("problem: " + error);
        }

    });


    document.getElementById("percal").addEventListener('click',  function (event) {
        userID = id;
        document.getElementById('cal').style.display = 'block';
        fetch('http://localhost:8090/loginCal/' + userID)
            .then(function (response) {
                console.log(response)
                if (response.ok) {
                    a = response.json()
                    console.log(a);
                    return a;
                } else {
                    //alert("The admin hasn't match you with a dog/volunteer yet")

                    throw new Error("The admin hasn't match you with a dog/volunteer yet");

                }
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
            .catch(error => alert(error))

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
                            code1 += ' <p class="card-text"><b>Description: </b>' + body[k].descr + '</p>';
                            code1 += '</div>';
                            code1 += ' <ul class="list-group list-group-flush">';
                            code1 += ' <li class="list-group-item"><b>Breed: </b>' + body[k].breed + '</li>';
                            code1 += ' <li class="list-group-item"><b>Age: </b> ' + body[k].age + '</li>';
                            code1 += '<li class="list-group-item"><b>Gender: </b> ' + body[k].gender + '</li>';
                            code1 += '</ul>';
                            code1 += '</div>';
                            code1 += '</div>';
                            k += 1;
                        }
                        code1 += '</div>';
                        if (i == length / 2 - 1) {
                            code1 += '<div class="row">  <div class="col">  <br>  <button id="Hide" type="button" class="btn btn-outline-dark" onclick="hide()">Hide</button>'
                            code1 += '</div> </div>'
                        }
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
                            code1 += ' <p class="card-text"><b>Description: </b>' + body[k].descr + '</p>';
                            code1 += '</div>';
                            code1 += ' <ul class="list-group list-group-flush">';
                            code1 += ' <li class="list-group-item"><b>Breed: </b>' + body[k].breed + '</li>';
                            code1 += ' <li class="list-group-item"><b>Age: </b>:' + body[k].age + '</li>';
                            code1 += '<li class="list-group-item"><b>Gender: </b>' + body[k].gender + '</li>';
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
                    code1 += ' <p class="card-text"><b>Description: </b>' + body[k].descr + '</p>';
                    code1 += '</div>';
                    code1 += ' <ul class="list-group list-group-flush">';
                    code1 += ' <li class="list-group-item"><b>Breed: </b>' + body[k].breed + '</li>';
                    code1 += ' <li class="list-group-item"><b>Age: </b>' + body[k].age + '</li>';
                    code1 += '<li class="list-group-item"><b>Gender: </b>' + body[k].gender + '</li>';
                    code1 += '</ul>';
                    code1 += '</div>';
                    code1 += '<div class="row">  <div class="col">  <br>  <button id="Hide" type="button" class="btn btn-outline-dark" onclick="hide()">Hide</button>'
                    code1 += '</div> </div>'
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';
                    code1 += '</div>';

                    document.getElementById("moreDogs").innerHTML = code1;



                }
            });

    }

    setInterval(C, 3000);


}