window.onload= function(){
document.getElementById("Data_Dogs").addEventListener("click",function(_event){
    fetch('http://127.0.0.1:8090/dogs')
    .then(function(response) {        
        return response.json();
    })
    .then(body =>{
        var list =[]
        for(var i=0 ;i< body.length;i++){
            list.push(body[i].Dogs_Name);
        }
        //console.log(list);
        document.getElementById("Dogs_Data").innerHTML= list;
    })
     //document.getElementById("Dogs_Data").innerHTML= body.Age;
});

document.getElementById("Data_Vol").addEventListener("click",function(_event2){
    fetch('http://127.0.0.1:8090/volunteers')
    .then(response => response.json())
    .then(function(body){
        var volun="" ;
        for (var i=0; i<body.length ; i++){
            volun += body[i].name +" "+ body[i].last_n +" "+ body[i].email +" "+ body[i].city;        
            for(var j=0 ;j <body[i].days.length; j++){                
                volun += " " +body[i].days[j];
            }       
        volun += "<br>";
        }
        document.getElementById("Vol_Data").innerHTML= volun;

    });

    
});
document.getElementById("Data_owners").addEventListener("click",function(event3){
    fetch("http://127.0.0.1:8090/owners")
    .then(response => response.json())
    .then(function(body){
        var owners="";
        for(var i=0;i<body.length; i++){
            owners += body[i].name +  " " + body[i].last_n + " " + body[i].email + " " + body[i].city+ " "+ body[i].Dogs_Name + "<br>";
        }

        document.getElementById("Owners_Data").innerHTML =  owners;
    });

});



document.getElementById("search").addEventListener("keyup",function(event4){
    if (event.keyCode === 13){
        var usename =  document.getElementById("search").value ;
        fetch('http://127.0.0.1:8090/search/'+usename)
        .then(response => response.text())
        .then(function(body){
            document.getElementById("search_data").innerHTML = body;

        });

    }

});

document.getElementById("Login").addEventListener("click",function(event5){
    var userID= document.getElementById("Login_In").value ;
    fetch('http://127.0.0.1:8090/login/'+ userID )
    .then(function(response){
        console.log(response);
        return response.text();
        
    })
    .then(function(body){
        if(body == 'user'){
            window.location.href = "https://www.google.com";
        }
        if(body == 'admin'){
            window.location.href = 'https://www.youtube.com/';
        }


    });
    


});

document.getElementById('submitO').addEventListener("click", function(event6){
    var Firstname = document.getElementById("validationCustom01").value;
    console.log(Firstname)
    /*(async () => {
        const rawResponse = await fetch('https://127.0.0.1:8090/addOwners', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: Firstname})
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();




});

*/



fetch('http://127.0.0.1:8090/addOwners', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, /',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name: document.getElementById("validationCustom01").value})
}).then(res=>res.json())
  .then(res => console.log(res))


});

}
