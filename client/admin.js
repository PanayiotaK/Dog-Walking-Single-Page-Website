



window.onload = function () {
    document.getElementById('GetDogs').style.display = "none";
    document.getElementById('GetVols').style.display = "none";
    document.getElementById('GetOwners').style.display = "none";
    document.getElementById('GetCal').style.display = "none";
    document.getElementById("PernsonalCal").style.display = "none";
    document.getElementById("searchUser").style.display = "none";



  


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
        fetch("http://localhost:8090/showDogs")
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
                code = '<div class="d-flex justify-content-center">  <div class="card border-secondary ml-3" style="max-width: 85rem;">  <div class="card-body text-secondary">    <div class="container"> '
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
                code += '  </tbody>  </table>   </div> </div>  </div>  </div>  </div>   </div> '
                document.getElementById("MatchData").innerHTML = code;
            })


    });

    document.getElementById("search").addEventListener("keyup", function (event4) {
        if (event.keyCode === 13) {
            var usename = document.getElementById('search').value;
			console.log("USername: ", usename);
            fetch('http://localhost:8090/search/' + usename)
					
               .then(function (response) {
                return response.json()

            })
                .then(function (body) {
                    search_table = '<div class="d-flex justify-content-center">';
                   //search_table += '<div class="card border-secondary ml-3" style="max-width: 85rem;"> ';
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


}