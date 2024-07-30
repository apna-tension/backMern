## Technologies Used
* node.js
* express.js
* mongoDB
* mongoose
* .env - Environment variables to used for hiding the information in the environment
* nodemon - to run the server continously
* postman - to test the api
* bcrypt.js - to hash the password (for security purposes) and compare the password with the password stored in the database
* jsonwebtoken(JWT) - to generate the token for the user (for security purposes) and compare the token against the token stored in the database  
* ZOD - to validate the user input login and register forms with the help of zod
* cors - to allow the request from the different origin to the server. for example, if the server is running on the localhost:3000 and the client is running on the localhost:3001 then the server will not allow the request from the client. so, to allow the request from the client, we use the cors
