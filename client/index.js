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




}
