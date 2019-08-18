# Simple-Registration-code-test

## Technology

1. Server
    - NodeJs, Express
    - Data Base: PostgreSql
    - ORM: SequelizeJS
    - Cors
2. Client
    - HTML 5
    - CSS
    - VueJs
    - Ajax Request: Axios
    - Bootstrap 4

## Installation

1. Server
    - Install [Node.js](https://nodejs.org/)
    - Install [PostgresSql](https://www.postgresql.org/)
    - after nodejs installed do this command
    ```sh
        $ cd Simple-Registration-code-test
        $ cd server
        $ npm install
        $ node app.js
    ```
    - And for automatically restarting the node application you can install [Nodemon](https://www.npmjs.com/package/nodemon) and run 

    ```sh
        $ nodemon app.js
    ```
2. Client 
    (Optional)
    - If you want to a little development server with live reload capability, Install [live-server](https://www.npmjs.com/package/live-server) 

## REST API

| endpoint | method | param | Output |Info|
| ------ | ------ |-------- | -------|-----|
| http://localhost:3000/users | POST | body{"first_name":"...", "last_name":"...",  "email":"...", "date_of_birth":"...", "gender":"...", "phone_number":"..."} | Object {status:"...", "message"} | Create data of registration  |
| http://localhost:3000/users/login| POST | body{"phone_number":"..."} | Object {"status":"...", "message":"..."} | Login with phone number | 
