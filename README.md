# Yeets

## Dependencies
`brew install mysql`  
`pip install flask`  
`pip install sqlalchemy`  

`npm install -g @angular/cli`

## To run MySQL
`brew services start mysql` to start database  

For the initial setup, you want to type `mysql -u root` into the terminal and create a database `CREATE DATABASE project` because the python server references this database.  

`brew services stop mysql` when done  


## To run Python flask server
`python3 server.py`  
To reach endpoints use `http://localhost:5000/`  
`ctrl + c` to stop
The frontend Angular client will use localhost:5000 in it's http requests to reach this server.

## Angular server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Visiting this url will load the frontend. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

