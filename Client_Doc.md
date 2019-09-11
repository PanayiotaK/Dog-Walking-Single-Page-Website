# Client Documentation
#### Important Info
1)	If you are already singed in in with a google account in any other service e.g.  gmail, google, YouTube you will have to log out in order to test that, the google service will provide you with a window to choose the account you want to log in with.

2)	Admin Page : <br>
    -  Logout from your account.<br>
    -  Click at any of the 2 options(Start as an Owner, Start as a Volunteer)
    -  Add a new account with this credentials:<br>
    **Email**: dogwalkingpage123@gmail.com<br>
    **Password** : Durham123!


3)	For the Personalised timetable to work, the days of a volunteer must match with the days of a dog. 
Otherwise the data in the timetable will be empty.

4)	The website assumes that the first name of each person is unique. That’s because the google id is a complicated pattern of numbers and symbol which is difficult to remember or use to identify each user.
5)	You can update your data if you resubmit the form. In order to do that you will have to successfully completed it the first time.
6)	When you add a new dog the data of your dog will also be available in the dog section, just press the ‘Show More Dogs’ to see your pet.
7)	If the image is not jpeg or png then it is not saved.
8)	Cloud deployment url: https://dog-walking.herokuapp.com/

#### Extended explanation for each section:

- DogWalking is a website that allows owners who can’t take their dog for a walk, to sign up so a volunteer will take their pet for a walk whenever they decide their dog needs to exercise. Also, DogWalking allows volunteers to sign up and provide information about the days they will like to volunteer. In that way, volunteering doesn’t affect their everyday schedule. 

-	Thus, the website includes **3 entities**: people, pictures and events (the dog walking session with each volunteer with the dog)

-	This website allows a volunteer to take only one dog for a walk each day.  

-	The dog must be **over 1 year old** to be signed up, as is not recommended for puppies to be taken for walks because they are still too sensitive.

    	The website is broken down into 4 parts.
        1.	Become a member 
        2.	Dogs
        3.	Gallery
        4.	Contact Us

    1)Become a member:<br>
- This section allows the clients to login as Owners or Volunteers.
By clicking any of these buttons a popup box appears and ask the user to log in using Google.<br>
<br>
**If you choose Owner**:<br>
- Now the webpage is more personalised. <br>
  Your first name will appear in 2 places next to the Welcome header and in the right corner of the navbar, next to the logout button.<br>
- The options from the navbar changes. Now you have: <br> 
    1.	Add Data
    2.	Dogs
    3.	Gallery
    4.	Calendar
    5.	Logout
<br>
1. **Add data**: <br>
    - Here is the section where the owner has to add the data of their dog or update them.<br>
    - The owner has to upload a jpeg or png photo of their dog, if the picture is not in the correct form then the picture is not saved.  Also, the user can update their dogs data if they resubmit the form.<br>
<br>
2. **Dogs**:<br>
   - This section is the same as in the original page (index page). The user can see the dogs that are available for walking. <br>
   - When the owner submits the form with their dog, the page will automatically create a new card with the dog data. It can be visible by clicking the `Show More Dogs!` button.<br>
   -  The button is there to avoid unnecessary scrolling from the user especially if there are a lot of dogs.<br>
<br>
3. **Gallery**:<br>
    - This section is also the same as in the index page. Just a simple carousel with some photos from cute dogs. 
    -  The photos can either move by themselves after a while or the user can move them by clicking on the arrows.

4. **Logout**: <br>
    - By clicking the logout button, the user goes back to the original page. The session with google is closed and the user can now exit the website safely.
    -  The next time the same user will access the website they will still have to click the Start as Owner button and then logged in. 
<br>
<br>

**If you choose Volunteer:** <br>
<br>
- The options in the navbar are the same as the Owners.
-  The only difference now is that the form the volunteer has to submit. 
-  Also, the user can update that information if he/she resubmits the form.
- The log out procedure is the same as the Owner.
 <br>
 <br>


**Admin**:<br>
<br>
- The admin page can be accessed by either clicking the Start as Owner or Start as Volunteer. 
-  The admin page should use this <br> 
      -  Email : dogwalkingpage123@gmail.com <br>
      -   password : Durham123! <br>
  
- The admin page is really simple.  The admin has 5 options : <br>
    1.	Get Dogs 
    2.	Get Volunteers
    3.	Get Owners
    4.	Match dogs/volunteers
    5.	Search User <br>
<br>

1) **Get Dogs** :<br>
      - The get dogs option will list all the available dogs of the website in a table. In order to be more user friendly, because this table can get big, when the admin drags the mouse over one entry, the entry changes colour and the user can see the data of the dog more easily.

2,3 ) **Get Volunteer, Get Owners**: <br>
- Same concept as the Get Dogs, the admin can see all the Volunteers and Owners in an interactive table.

4) **Match dogs/volunteers:** <br>
   - That is an option only the admin has. He/She is the one that will match a dog with a volunteer that are both available the same day.
   -  Fortunately, the admin doesn’t have to do that manually. By clicking the button, a calendar is created and now the admin can see the weekly timetable and which dog is assigned to each volunteer. <br>
  
5) **Search User**: <br>
   - The admin can search a user by their First name, as the userid is a big string with numbers and characters and difficult to remember. Also, the website assumes that there are no people with the same fist name as there will be confusion with the timetable and the search.
    -   The admin can search for both data and volunteers.
    - If the user exists a table with the user data will appeared.
<br>
<br>
##### Index Page sections continues:
2. **Dogs Section** : <br>
    - People visiting the website can see the dogs that are available for walking. 
    - When the owner submits the form with their dog, the page will automatically create a new card with the dog data. It can be visible by clicking the `Show More Dogs!` button. 
    - The button is there to avoid unnecessary scrolling from the user, especially if there are a lot of dogs.

3. **Gallery Section**: <br>
    - A simple carousel with some photos from cute dogs.  The photos can either move by themselves after a while or the user can move them by clicking on the arrows.

4. **Contact us**:<br>
The section where the user can find more data about the website and how they can contact them if there is  a problem.


