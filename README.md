# images-annotating-application

Hi,

I've deployed page (backend on heroku, frontend on netlify), so you can check it within this link - https://images-annotating.netlify.app

Also, you can download code and run it by these steps:

1.Download code;

2.go to cd server, then run commands: 

2.1. npm install (install node modules), 

2.2.in server folder create file ".env", in this file add two environment variables:

GOOGLE_APPLICATION_CREDENTIALS="{your path to google application credentials json file}"

DB_URI='{your mongo database cluster url}'

2.3.nodemon (to run backend) 

3.go to cd frontend, then run commands: 3.1. npm install (install node modules), 3.2. npm start (to run React project) 

Then type image url and check this application ;)





