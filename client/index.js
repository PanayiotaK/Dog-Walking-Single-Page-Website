window.onload = function () {
    document.getElementById("Data_Dogs").addEventListener("click", function (_event) {
        fetch('http://127.0.0.1:8090/dogs')
            .then(function (response) {
                return response.json();
            })
            .then(body => {
                var list = []
                for (var i = 0; i < body.length; i++) {
                    list.push(body[i].Dogs_Name);
                }
                //console.log(list);
                document.getElementById("Dogs_Data").innerHTML = list;
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

    document.getElementById("Login").addEventListener("click", function (event5) {
        var userID = document.getElementById("Login_In").value;
        console.log("user id: ", userID);
        var x = document.getElementById("LoginPopUp");
        var userID = document.getElementById("Login_In").value;

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
                    window.location.href = "https://www.google.com";
                }
            });
    });


    /*  document.getElementById('f1').addEventListener('submit', async function (event) {
          event.preventDefault();
          try {
              let name = document.getElementById('validationCustom01').value;
              let Lname = document.getElementById('validationCustom02').value;
              let uname = document.getElementById('validationCustomUsername').value
              let email = document.getElementById('exampleFormControlInput1').value
              let city = document.getElementById('validationCustom03').value
              let Dname = document.getElementById('validationCustom01_').value
              let breed = document.getElementById('validationCustom02D').value
              let age = document.getElementById('exampleFormControlSelect1').value
              let gen;
              let des = document.getElementById('des').value ;
              let image = document.getElementById(dogImage).value;
              console.log("image",image)


              if( document.getElementById('customRadioInline1').checked == true ){
                  gen = 'Male';
              }
              else{
                  gen = 'Female';
              }
              var days = []
              if (document.getElementById("M").checked == true) {
                  var x = document.getElementById("M").value;
                  days.push(x)
              }

              if (document.getElementById("Tu").checked == true) {
                  var x = document.getElementById("Tu").value;
                  days.push(x)
              }

              if (document.getElementById("W").checked == true) {
                  var x = document.getElementById("W").value;
                  days.push(x)
              }

              if (document.getElementById("Th").checked == true) {
                  var x = document.getElementById("Th").value;
                  days.push(x)
              }

              if (document.getElementById("F").checked == true) {
                  var x = document.getElementById("F").value;
                  days.push(x)
              }
              if (document.getElementById("Sa").checked == true) {
                  var x = document.getElementById("Sa").value;
                  days.push(x)
              }
              if (document.getElementById("Su").checked == true) {
                  var x = document.getElementById("Su").value;
                  days.push(x)
              }



              var data = {
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
                  descr: des

              };

              ded = JSON.stringify(data)

              let response = await fetch('http://127.0.0.1:8090/addOwners', {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: "ded=" + ded
              })

              if (!response.ok) {
                  throw new Error("problem adding name" + response.code);
              }
          } catch (error) {
              console.log(error)
              alert("problem: " + error);
          }
      });*/

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


}




document.getElementById("showMore").addEventListener('click',  C()
);

function C () {
    fetch('http://127.0.0.1:8090/showDogs')
    .then(response => response.json())
    .then(function (body) {
    //console.log(body);
    let length = body.length;
    console.log("CARDS", length / 2)
    let rlength = Math.floor(length / 2);
    console.log("rlength", rlength)
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
            console.log(document.getElementById("moreDogs").innerHTML);
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
        console.log(document.getElementById("moreDogs").innerHTML);


    }
});

}


setInterval(C,3000);

    







