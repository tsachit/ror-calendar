# Calendar App

This is a calendar app created with Ruby on Rails and React JS. Check out the [demo](https://ror-calendar.herokuapp.com) for yourself.

### App Dependency

Rails version: 5.2.3 <br />
Ruby version: 2.6.0 (x86_64-linux) <br />
Gem 3.0.1 <br />
Bundler version 1.17.2 <br />

### Setup

- Copy config/application.copy.yml and paste as config/application.yml
- Fill the given environment variables
- Run command to migrate:
   ```bash
   rails db:migrate
   ```
- Run command to start ror:
   ```bash
   bin/rails s -p 5000
   ```
- Frontend uses port 3000 and api uses 5000, so if they're not available in your computer and if you have to change it. Update in Procfile.dev and client/package.json proxy value.
- If you happen to change port of api, also update in helpers for in app notification.
- Run command to start react:
   ```bash
   npm start
   ```
   or, <br/>
   Run command to build the react app
   ```bash
   npm run heroku-postbuild
   ```

### App Description

1. App User

   - As an app user, one should be able to
     - [x] signup using email(or phone) and password.
     - [x] verify account through email(or phone).
     - [x] login using is email, password.

2. Schedule

   - As an app user, one should be able to

     - [x] create a schedule, using a title, description, DateTime, how long event will happen (These are mandatory fields, you are free to add other fields)
     - [x] edit her/his schedule
     - [x] delete her/his schedule
     - [x] invite people to that schedule through email
     - [x] see who accepted/rejected the invitation
     - [x] set a notification for any schedule, in-app notification is mandatory, you are free to take it further with email notification/push information

   - As a non-app user, one should be able to
     - [x] receive an invitation for schedule through email
     - [x] following the invitation, access a page which shows the description of the schedule
     - [x] accept/reject an invitation
