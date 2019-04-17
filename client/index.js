window.onload = function () {
    document.getElementById("Data_Dogs").addEventListener("click", function (_event) {
        fetch('http://127.0.0.1:8090/dogs')
            .then(function (response) {
                return response.json();
            })
            .then(body => {
               table_code = '<div class="d-flex justify-content-center"> <div class="card border-secondary lg-8" style="max-width: 99rem;">  <div class="card-body text-secondary">'
               table_code += '<div class="container">  <div class="table-responsive-md"> <table class="table table-hover">  <thead>  <tr>  <th style="width: 10%">Dog</th> '
               table_code +=' <th style="width: 5%">Age</th>'
               table_code +=' <th style="width: 5%">Gender</th>'
               table_code +=' <th style="width: 15%">Breed</th>'
               table_code +=' <th style="width: 20%"> First Name</th>'
               table_code +=' <th style="width: 20%"> Last Name</th>'
               table_code +=' <th style="width: 15%">email</th>'
               table_code +=' <th style="width: 10%">City</th>'
               table_code +='</tr>  </thead> <tbody>'
           
               
                for (var i = 0; i < body.length; i++) {
                    table_code += '<tr>';                    
                    table_code += ' <td>'+ body[i].Dname + '</td>';
                    table_code += ' <td>'+ body[i].Dage + '</td>';
                    table_code += '<td>' + body[i].Dgen  + '</td>';
                    table_code += '<td>' + body[i].breed  + '</td>';
                    table_code += '<td>' + body[i].Oname + '</td>';
                    table_code += '<td>' + body[i].Lname   + '</td>';
                    table_code += '<td>' +body[i].email + '</td>' ;
                    table_code += '<td>' + body[i].city +'</td>';
                    table_code += '</tr>'
                }

                table_code += '</tbody> </table> </div>  </div>  </div> </div>  </div>'
                document.getElementById("Dogs_Data").innerHTML = table_code;
            })
        
    });
              

    document.getElementById("Data_Vol").addEventListener("click", function (_event2) {
        let days
        fetch('http://127.0.0.1:8090/volunteers')
            .then(response => response.json())
            .then(function (body) {
                Vol_table = ' <div class="d-flex justify-content-center">  <div class="card border-secondary ml-3" style="max-width: 85rem;">  <div class="card-body text-secondary"> '
                Vol_table += ' <div class="container">  <div class="table-responsive-md"> <table class="table table-hover">  <thead>'
                Vol_table += '<tr> '
                Vol_table += '<th style="width: 20%"> First Name</th>  <th style="width: 20%"> Last Name</th>   <th style="width: 15%">email</th>  <th style="width: 10%">City</th>  <th style="width: 35%">Days Available</th> </tr> </thead>  <tbody>'

                for (var i = 0; i < body.length; i++) {
                    days = "";
                    Vol_table += '<tr>'
                    Vol_table += '<td>' + body[i].name + '</td>' ;
                    Vol_table += '<td>' + body[i].last_n+'</td>';
                    Vol_table += '<td>' + body[i].email  +'</td>';
                    Vol_table += '<td>' + body[i].city +'</td>';

                    if( body[i].days.length > 1){
                         for (var j = 0; j < body[i].days.length-1; j++) {
                             days += body[i].days[j] + " , ";
                         }
                         days += body[i].days[body[i].days.length-1];

                    }
                    else{
                        days = body[i].days
                    }
                    Vol_table += '<td>' + days +'</td>';
                    Vol_table += '</tr>' ;

                }
                Vol_table += '</tbody>  </table>  </div>  </div>  </div> </div> </div>';
                document.getElementById("Vol_Data").innerHTML =Vol_table;

            });


    });
    document.getElementById("Data_owners").addEventListener("click", function (event3) {
        fetch("http://127.0.0.1:8090/owners")
            .then(response => response.json())
            .then(function (body) {
                Owners_table = '<div class="d-flex justify-content-center"> <div class="card border-secondary ml-3" style="max-width: 85rem;">  <div class="card-body text-secondary"> ';
                Owners_table +='<div class="container">' ;
                Owners_table +='  <div class="table-responsive-md">  ';
                Owners_table +='    <table class="table table-hover">' ;
                Owners_table +='      <thead>';
                Owners_table +='        <tr>' ;                            
                Owners_table +='          <th style="width: 25%"> First Name</th>';
                Owners_table +='          <th style="width: 25%"> Last Name</th>';
                Owners_table +='          <th style="width: 25%">email</th>';
                Owners_table +='          <th style="width: 15%">City</th>';
                Owners_table +='          <th style="width: 10%"> Dog</th>'; 
                Owners_table +='        </tr>';
                Owners_table +='      </thead>';
                Owners_table +='      <tbody>' ;
                for (var i = 0; i < body.length; i++) {
                    Owners_table += '<tr>';
                    Owners_table += '<td>' + body[i].name  +'</td>';
                    Owners_table += '<td>' +  body[i].last_n  +'</td>';
                    Owners_table += '<td>' + body[i].email +'</td>';
                    Owners_table += '<td>' + body[i].city  +'</td>';
                    Owners_table += '<td>' + body[i].Dogs_Name  +'</td>';
                    Owners_table += '</tr>';

                   
                }
                Owners_table += ' </tbody> </table>  </div> </div>  </div>  </div>  </div>' ;
                document.getElementById("Owners_Data").innerHTML = Owners_table;
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
                code = '"<div class="d-flex justify-content-center">  <div class="card border-secondary ml-3" style="max-width: 85rem;">  <div class="card-body text-secondary">    <div class="container"> '
                code += ' <meta name="viewport" content="width=device-width, initial-scale=1.0">  <div class="table-responsive">   <table id = "Calendar">     <thead id = "CalendarHead">    <tr>'
                code +=' <th> <span class="long">Monday</span>  <span class="short">Mon</span>  </th>  <th>  <span class="long">Tuesday</span>  <span class="short">Tue</span>  </th>'
                code +='<th> <span class="long">Wendsday</span> <span class="short">We</span>  </th>  <th>  <span class="long">Thursday</span>  <span class="short">Thur</span>  </th>'
                code += '<th>  <span class="long">Friday</span> <span class="short">Fri</span>  </th> <th>  <span class="long">Saturday</span>  <span class="short">Sat</span>  </th>'
                code +=' <th> <span class="long">Sunday</span>   <span class="short">Sun</span>  </th> </tr>  </thead>   <tbody id = "CalendarBody">';
           
                let foundM = false;
                let foundTue = false;
                let foundW = false;
                let foundTh = false;
                let foundF = false;
                let foundSat = false;
                let foundSun = false;
                let count = 0;
                for (var i = 0; i < body.length; i++) {
                     foundM = false;
                     foundTue = false;
                     foundW = false;
                     foundTh = false;
                     foundF = false;
                     foundSat = false;
                     foundSun = false;
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

     
                if (foundM === true){
                    code += '<td><div >' + '<b>Dog</b>: '+ body[i].dog.Dogs_Name + "   <b>Volunteer</b>: " + body[i].vol.name +' </div></td>'

                }
                else if (foundM === false){
                    code+= ' <td></td>'

                }
                if (foundTue === true ){
                    code += '<td>  <b>Dog</b>: '+ body[i].dog.Dogs_Name + "   <b>Volunteer</b>: " + body[i].vol.name + '</td>';

                }
                else if (foundTue === false){
                    code += '<td></td>'
                }
                if(foundW === true ){
                    code+= "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "   <b>Volunteer</b>: " + body[i].vol.name +"</td>";
                }
                else if (foundW === false){
                    code += '<td></td>'
                }
                if(foundTh === true ){
                    code += "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "    <b>Volunteer</b>: " + body[i].vol.name + '</td>';
                }
                else if (foundTh === false){
                    code += '<td></td>'
                }
                if  (foundF === true ){
                    code += "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "    <b>Volunteer</b>: " + body[i].vol.name + '</td>'


                }
                else if (foundF === false){
                    code += '<td></td>'
                }
                if  (foundSat === true ){
                    code += "<td>  <b>Dog</b>: " + body[i].dog.Dogs_Name + "    <b>Volunteer</b>: " + body[i].vol.name + '</td>'

                }
                else if (foundSat === false){
                    code += '<td></td>'
                }
                if  (foundSun === true ){
                    code += "<td> <b>Dog</b>: " + body[i].dog.Dogs_Name + "   <b> Volunteer</b>: " + body[i].vol.name + '</td>'

                }
                else if (foundSun === false){
                    code += '<td></td>'
                }
                code += '</tr>'
                }

                while(count % 4 !=0 ){
                    code+= '<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>'
                    count += 1
                }                
                code += '  </tbody>  </table>   </div> </div>  </div>  </div>  </div>   </div>'
                document.getElementById("MatchData").innerHTML = code;
            })


    });

    document.getElementById("search").addEventListener("keyup", function (event4) {
        if (event.keyCode === 13) {
            var usename = document.getElementById("search").value;
            fetch('http://127.0.0.1:8090/search/' + usename)
                .then(response => response.json())
                .then(function (body) {
                    search_table = '<div class="d-flex justify-content-center">'  ;
                    search_table += '<div class="card border-secondary ml-3" style="max-width: 85rem;"> ' ;
                    search_table += '  <div class="card-body text-secondary">';
                    search_table += '    <div class="container">';
                    search_table += '      <div class="table-responsive-md">';
                    search_table += '        <table class="table table-hover">';
                    search_table += '          <thead>';
                    search_table += '            <tr>';                 
              

                    if(typeof(body[0].Dname) != "undefined"){                        
                        search_table += '  <th style="width: 20%"> First Name</th>';
                        search_table += '  <th style="width: 20%"> Last Name</th> ';
                        search_table += '  <th style="width: 15%">email</th>';                        
                        search_table += '  <th style="width: 10%">Dog</th>';                       
                        search_table += '  <th style="width: 5%">Gender</th>';
                        search_table += '  <th style="width: 15%">Breed</th>';
                        search_table += '  <th style="width: 15%">Days Available</th>';
                        search_table += '    </tr>';
                        search_table += '  </thead>';
                        search_table += '  <tbody>';
                        search_table += '<tr>' ;
                        search_table += '<td>'+ body[0].Fname +'</td>' ;
                        search_table += '<td>'+ body[0].Lname  + '</td>' ;
                        search_table += '<td>'+ body[0].email + '</td>' ;
                        search_table += '<td>'+ body[0].Dname + '</td>' ;
                        search_table += '<td>'+ body[0].Gender + '</td>' ;
                        search_table += '<td>'+ body[0].Breed + '</td>' ;
                        search_table += '<td>'+ body[0].Days + '</td>' ;
                        search_table += '</tr>' ;
                       

                    }

                    else{   
                        search_table += '<th style="width: 25%"> First Name</th>';
                        search_table += '<th style="width: 25%"> Last Name</th> ';
                        search_table += '<th style="width: 25%">email</th>';
                        search_table += '<th style="width: 25%">Days Available</th>';
                        search_table += '    </tr>';
                        search_table += '  </thead>';
                        search_table += '  <tbody>';
                        search_table += ' <tr> ';
                        search_table += ' <td> ' + body[0].Fname  + '</td>';
                        search_table += ' <td> ' + body[0].Lname  + '</td>';
                        search_table += ' <td> ' + body[0].email  + '</td>';
                        search_table += ' <td> ' + body[0].Days + '</td>';                        
                        search_table += ' </tr> ';                        
                        
                    }

                  
                    search_table += '</tbody>  </table>  </div>  </div>  </div>  </div>  </div>' ;

                    document.getElementById("search_data").innerHTML = search_table;

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
                document.getElementById("Nav_Cal").style.display = "block";
            }
        }


        fetch('http://127.0.0.1:8090/login/' + userID)
            .then(function (response) {
                console.log(response);
                return response.text();
            })
            .then(function (body) {   

                if (body == 'user') {
                    document.getElementById("Nav_Cal").style.display = "block";
                    document.getElementById("PernsonalCal").style.display = "block"
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


window.onload = function () {
var x = document.getElementById("cal");
console.log(x.style.display)
        if (x.style.display === "block") {
          x.style.display = "none";
        } /*else {
          x.style.display = "none";


        }*/

}



}


