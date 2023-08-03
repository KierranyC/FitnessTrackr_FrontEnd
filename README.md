# Navbar

- Home 

  Shows all public routines. 

- My Routines

  Shows up only when user is logged in. New routine form and users created routines on the same page. Page will also include update and delete buttons for routines. Click routine to see it in a single post view, have update button on the routine in this view. Also have button to add activities, like in a dropdown that lists all activities and has inputs for count and duration.   

- Activities

  Have form to add activities on my routines and on activities. Have them look the same on both pages. Be able to edit/delete on either page. Show all activities users created. *If there's time, add all public activities for inspo
 
- Login/Register
  
  This will be the same link in header or footer. Once the link is clicked, show the login screen first with link to sign up underneath. Clicking the link to register takes you to register form. When user is logged in, the login/register switches to logout button. Errors for logging in and registration. For logging in, show errors for incorrect username or password. For registration, show errors for username and password requirements, like length, what kind of characters they require, etc.

- Logout 

# Footer

- Created By Kierrany and Drew @2023
- Contact Info, email etc


MVP (MAIN GOALS)
Routes

As any user when browsing the app, I want to

click links/tabs that display different parts of the app.
see the route I am visiting in the url bar (i.e. Routines tab should have a route https://example.com/routines)
stay on the "same page", while seeing the content update (i.e. use React Router, no page refresh)
see Components/Tabs with corresponding routes:
Home
Routines
My Routines
Activities
Login/Register (optional. Could be alternatively created as a modal or part of the header/footer)
User

As an unregistered visitor I want to:

see a Sign Up/Sign In form in the header/footer, on a tab (with or without matching route) or in a modal
be able to sign up for a new account with valid username/password combination
see meaningful messages if there are errors during registration, so that I may correct them
see tabbed navigation for Routines and Activities (with matching routes)
As a registered user I want to:

be able to log in with my username/password combination
see meaningful messages if there are errors during login, so that I may correct them
stay logged in between page visits (for example, if I close my browser, and come back later)
be able to log out if I am logged in
see tabbed navigation for Routines, My Routines (once logged in), and Activities (with matching routes)
Routines

As any user on the Routines tab, I want to:

see a list of all public routines showing:
The routine name, goal, and creator's username
A list of activities for the routine, including their name, description, and duration and/or count
As a registered user on the My Routines tab, I want to:

be shown a form to create a new routine

the form should have text fields for name and goal
for each routine which is owned by me I should

be able to update the name and goal for the routine
be able to delete the entire routine
be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
be able to update the duration or count of any activity on the routine
be able to remove any activity from the routine
Activities

As an unregistered visitor on the Activities tab, I want to:

see a list of all activities which have been created
As a registered user on the Activities tab, I want to:

be shown a form to create a new activity (by name and description)
be shown an error if the activity already exists
STRETCH GOALS
Routines

As any user on the Routines tab, I want to:

be able to click on a username (shown as a Routine creator), and see a list of all of their public routines
be able to click on an activity name (shown in a list of activities on a routine), and see a list of all public routines which feature it
As a registered user, on the My Routines tab, I want to:

expect the dropdown to add an activity to one of my routines not to include any activity which is already a part of the routine
Activities

As any user on the Activities tab, I want to:

be able to click on an activity name and see a list of all public routines which feature it
As a registered user on the Activities tab, I want to:

be able to edit an existing activity, and update the description, regardless of who owns it