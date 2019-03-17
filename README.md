# Yeets

## Dependencies
`brew install mysql`  
`pip3 install flask`  
`pip3 install sqlalchemy`  
`npm install`

## To run MySQL
`brew services start mysql` to start database  

For the initial setup, you want to type `mysql -u root` into the terminal and run `source [path to project.sql]`, which will create all the tables from the schema and insert all the rows.  

`brew services stop mysql` when done  


## To run Python flask server
`python3 server.py`  
To reach endpoints use `http://localhost:5000/`  
`ctrl + c` to stop  
The frontend Angular client will use localhost:5000 in it's http requests to reach this server.

if you get this error  
`sqlalchemy.exc.OperationalError: (MySQLdb._exceptions.OperationalError) (2002, "Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)") (Background on this error at: http://sqlalche.me/e/e3q8)`  
it means your mysql server is not running. Check by typing `mysql -u root` into the command line. 


## Angular server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Visiting this url will load the frontend. 

## Build
You might need to run npm install to get the package dependences  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Recommended tools  
Webstorm for all things Angular  
Sublime Text or Visual Studio Code for server.py  
