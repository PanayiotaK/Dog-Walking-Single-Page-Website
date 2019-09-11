# Server Documentation:

## Steps to run the website locally:
1. Download all the node modules  `npm install`
2. **Test the files**: <br>
    _Pretests_ : `npm run pretests <filename>`   
     - (there are some errors that cannot be fixed e.g. firebase variables, the events from the document.getelementbyid, static for app.js ) <br>
    
    _Test_: `npm test` <br>
3. Start Server: `npm start`.<br>
4. The website should be visible when localhost:8090 is typed.
## Extended Information




There are 2 external JSON files the dogs and the volunteers. In the app.js the data from the dogs.json are accessed using the obj1 variable and the data from the volunteers with the obj2 variable.  In the app.js there are post and get methods for all 3 entities (get dogs, get volunteers, get weekly timetable).
### **The CloudDep folder is usied for the cloud deployment. Please do not change anything or run nmp commands there.**
     



#### Get Requests :

| `/command`        | Description           
| ------------- |:-------------:
| `/dogs`         | Sends a JSON file with the data of the owners and the dogs. It is used to display the    dogs’ and the owners’ data to the admin side in a table.
| `/showDogs`    |   Sends all the data from the dogs.json file. The get request     is used so the client-side(index.js) can take the data to                       create new cards for the newly added dogs. The function in the client side called C() is repeatedly called so if there is a new dog in the json file a new card will be created. If the number of the dogs is even, then each card will have 2 dogs. If the number is odd, then one card will be created at the end for the last dog.   
| `/volunteers`| Sends all the data from the volunteers.json file. This request is used in the admin page, when the admin clicks the get volunteers. 
|`/matchDogs  `    |  This request will take the data from both dogs and volunteers json files, and It will try to match each dog with a volunteer. The days of the dog and the volunteer should be the same in order to match and a volunteer can take only one dog for a walk each day. After the matching process is done a json file with the day, the dog and the volunteer will be sent to the client side (index.js) and the data are added to the calendar, so the admin can have a visual representation of the weekly timetable.
|`/search/:username`|  	this request requires the username parameter for the client side. Which is the name of the user and not the userid. After the first name is acquired it will go through every name from both json files (dogs and volunteers ) and if there is a match with the searched user the data of the user will be send to the client side to create a table. If the first name is not found the server will send a 404 message. 
|`/loginCal/:userID`| 	It is used to  get the data to create the personalised  calendar for each user when they are logged in to their accounts. These data will only be available if the admin requests to match the dogs with the owners (match dog/volunteers). The `userid` of the user is send with the request in order to search through the json file that has the matched dogs and volunteers. If the userid is found in the json(obj3) that means that the user has been matched and a calendar will be created showing the name of the dog and of the volunteer on the day the walk is scheduled.|



#### Post requests:
| `/command`        | Description        
| ------------- |:-------------:
|`/addOwners1 `|The data from the google oauth (Name, email, userid) 			are send to the server with a post request. These data are put in a json file and can be accessed from another get/ post request. This post request is made when a user is logged in (owner or volunteer). The data can not be incorrect as the post request is made after the user is logged in so the google oauth already checked if the email existed and the password was correct. This request is made when the users press the update data button.
|`/addOwners`|	The server gets the data from the form that the owners have to submit and the personal data of the owner from the previous request /addOwners1 and creates one entry with all this data, in the external file dogs. If the user tries to upload a file that is not jpeg or png then the file will not be stored. All the images submitted from the owners are stored in an external folder called uploads. If the user press again the update data button and tries to resubmit the form the post request acts as a put request and it will update the already existing data.
|`/addVol `|	the same as the /addOwners post request but with the data from the form of the volunteer has to submit.
 

