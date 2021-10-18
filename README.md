# Prerequisites
This project requires you to use the Java JDK Version 11. \
Please select the appropriate JDK in the IntelliJ project settings.

You'll need a Docker container running **PostgreSQL** on port 5432. 
If you have not already, you can set up such a docker container using the command:

`docker run --name postgres-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

The username and password are assumed to be both "postgres". 
You can change the username and password that hibernate uses in application.properties.




# Setup
To initialize the correct DB schema, run the app using:\
`spring.jpa.hibernate.ddl-auto=create`\
in application.properties. In some cases, you may need to run it **two times** for it to work.
this option will drop and recreate your DB shema each time you restart the backend. 
If you want to persist data between resstartss of the backend, change this value to `validate` or `update`. 
If you do, you may need to remove code that tries to add data to the DB in AppStartupRunner.run().


If you've set up the project correctly you should be able to access the endpoint `http://localhost:8080/api/` after logging in with the following user:

username: james\
password: bond

The site should display the text "Hello World"



# Hints

* You can add mock data using an SQL script named `data.sql` placed in the resources folder.
* You can execute statements at startup by adding them to `AppStartupRunner.run()`.
