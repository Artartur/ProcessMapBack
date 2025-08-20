An API where you can create Areas, Processes and SubProcesses

## Getting Start

- Clone this repository in your computer
- Go to ```ProcessMapBack/``` directory
- Run ```npm install``` to install all dependencies
- Run ```npm run dev``` to start the application
- Go to ```http://localhost:3000/```

- Remember to create a database in MongoDB and define ```URI``` and ```DataBase Name``` values on ```connection.ts```

## Available Routes

### Areas:
  GET: areas/
  GET: areas/name/:name
  GET: areas/:id
  
  
  POST: areas/
  
  PUT: areas/:id
  
  DELETE: areas/:id

### Processes:

  GET: processes/
  GET: processes/name/:name
  GET: processes/:id
  
  
  POST: processes/
  
  PUT: processes/:id
  
  DELETE: processes/:id

### SubProcesses:

  GET: subprocesses/
  GET: subprocesses/name/:name
  GET: subprocesses/:id
  
  
  POST: subprocesses/
  
  PUT: subprocesses/:id
  
  DELETE: subprocesses/:id
