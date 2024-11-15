# About Application

This is an expense tracker application. It is exposed as an API with authentication in place. JWT is used to authentication each of the expense api endpoints. This is a very lightweight API

## How to run the application:

- Run `npm install` to install all the packages
- Run `npm run start` to start the application
- Make sure to have Mongodb installed locally in the machine
- MongoDB Compass is useful to connect to the database

## Prerequisites:

Have these variables in the .env file

```
SECRET_KEY=""
REFRESH_KEY=""
CONNECTION_STRING=""
```

Use the command in node environment to run random values: require('crypto').randomBytes(16).toString('hex');

References:

Youtube: https://www.youtube.com/watch?v=mbsmsi7l3r4

Mongoose: https://mongoosejs.com/docs/index.html
