# Calendar App

This is a calendar app created with Ruby on Rails and React JS

### App Dependency

Rails version: 5.2.3 <br />
Ruby version: 2.6.0 (x86_64-linux) <br />
Gem 3.0.1 <br />
Bundler version 1.17.2 <br />

### Setup

- Copy config/application.copy.yml and paste as config/application.yml
- Fill the necessary database fields
- Frontend can be hosted with "npm start", will use 3000 port
- For Backend/API use "rails s -p 5000", will use 5000 port
- If you don't have 5000 port available for rails, use any port number and update the port number in package.json for api.

### App Description

1. App User

   - As an app user, one should be able to
     - [x] signup using email(or phone) and password.
     - [ ] verify account through email(or phone).
     - [x] login using is email, password.

2. Schedule

   - As an app user, one should be able to

     - [x] create a schedule, using a title, description, DateTime, how long event will happen (These are mandatory fields, you are free to add other fields)
     - [x] edit her/his schedule
     - [x] delete her/his schedule
     - [x] invite people to that schedule through email
     - [x] see who accepted/rejected the invitation
     - [ ] set a notification for any schedule, in-app notification is mandatory, you are free to take it further with email notification/push information

   - As a non-app user, one should be able to
     - [x] receive an invitation for schedule through email
     - [x] following the invitation, access a page which shows the description of the schedule
     - [x] accept/reject an invitation
