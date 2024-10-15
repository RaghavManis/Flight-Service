const express = require("express") ;
const {ServerConfig , Logger} = require("./config") ;
const router = require("./routes") ;
// const { cli } = require("winston/lib/winston/config");
const app = express() ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.listen(ServerConfig.PORT , ()=>{
    // console.log(process) ;
    console.log(`server is succesfully started at port no ${ServerConfig.PORT}`) ;
    // Logger.info("server succesfully started") ;
})
// console.log("inside main index.js")
app.use("/api" , router) ;

/**
 * 
 * folder creation 
 * npm init(in system terminal or vs code terminal ) ...>detailed explaination of this command is some where below 
 * git init
 * npm i dotenv (install all listed package in root folder of project where package.json file is located)
 * npm i express
 * npm i http-status-codes
 * npm i sequelize
 * npm install mysql2
 * npm i nodemon
 * npm install sequelize-cli
 * 
 * 
 * Reasoning:
 * dotenv, express, http-status-codes, sequelize, and mysql2 are core dependencies for your project, so install them first.
 * nodemon and sequelize-cli are tools to assist with development, so you can install them afterward.
 * 
 * Running the commands in the root folder ensures that your package.json and package-lock.json files are properly updated with the dependencies.

 */

/**
 * THINGS WHICH HAVE TO PERFORM , WHENEVERE WE USE GIT CLONE 
 * 
 * npm i (in main folder)
 * set enviroment variable and set port (.env) in main folder 
 * npx sequelize init (inside src folder)
 * for using the same database which where used in project from which you clone ........copy paste that exact information in here in config.json(in config folder)
 * 
 * 
 * 
 * purpose of npx sequelize init (run where you want all this folder ... till now in learned that in src)
 * 
 * sequelize init initializes a basic Sequelize setup by creating the following folders and configuration files in your project:
 * config/: Contains the config.json file where database connection settings are defined.
 * models/: A folder to store Sequelize models (JavaScript/TypeScript representations of your database tables).
 * migrations/: A folder for database migration files (for schema changes).
 * seeders/: A folder for seed files, used to pre-populate your database with data.
 * 
 * The config/ folder will contain database configuration files that are necessary for Sequelize to connect to the database, 
 * and they should be accessible from the root.
 */

/**
 * npm init:

 * Sets up a new project by creating a package.json file.
 * The package.json file will list the project metadata (like name, version, etc.), and it will automatically update when you install new packages.
 * Initially,the dependencies section in the package.json file will be empty,but as you install packages,they'll be added to the dependencies section.
 * 
 * npm i (or npm install):
 * 
 * Installs all dependencies listed in the package.json file.
 * This is commonly used when you clone a project from GitHub or any other source, and the node_modules folder is not included. 
 * You use npm i to install all the required packages, as specified in package.json.
 */

/**
 * package-lock.json
 * 
 * The package-lock.json file is created and updated by npm install.
 * It locks exact versions of all dependencies to ensure consistent and stable installations across different environments.
 * It speeds up installations and helps prevent dependency-related bugs caused by different versions of packages.
 * When you run npm init, it only creates a package.json file, not the package-lock.json file.
 * The package-lock.json file is created when you run npm install or npm i after adding dependencies to your project.
 * 
 * node_modules 
 * 
 * When you run npm init, it creates the package.json file but does not create the node_modules folder.
 * As soon as you install packages using npm i or npm install <package>, Node.js downloads the specified packages and places them in the node_modules folder.
 * npm install: Installs all dependencies listed in package.json and creates the node_modules folder if it doesn’t exist.
 */

/**
 * it means ......package.json contain name of dependencies .........package-lock.json contain details of that dependencies and node_modules will actually contain the packages for further use in project 
 * 
 * 1. package.json:
 * This file contains the list of dependencies (along with other metadata about your project) that your project requires.
 * It specifies the names and version ranges of the packages, but not their exact versions or internal structure.
 * When you install a package using npm i <package>, it adds an entry to the dependencies or devDependencies section of package.json.
 * 
 * 2. package-lock.json:
 * This file contains the exact version details of each installed dependency and its nested dependencies (i.e., packages that the dependencies depend on).
 * It records the exact version of each package installed, along with information about the resolved package URLs and other metadata like checksum hashes.
 * It ensures that when someone else (or you, on another machine) runs npm install, they get identical versions of all the dependencies as you had, even if package.json has version ranges.
 * 
 * 3. node_modules:
 * This folder actually contains the installed package files themselves.
 * It’s where npm stores all the code for the dependencies and sub-dependencies listed in package.json and package-lock.json.
 * Your project directly requires the packages from this folder when running or building the application.
 */







/**
 *   what is process and what is process.env ?
 *
 *   In Node.js, process is a global object that provides information and control over the current Node.js process.
 *   It is an instance of EventEmitter and contains a lot of useful properties and methods to interact with the environment in which the
 *   Node.js application is running.
 *   
 *   
 *   process.env is an object that contains the user environment, i.e., the environment variables of the system that are available to the
 *   running Node.js process.
 *   
 *   For example, environment variables are used to store configuration information, such as:
 *   
 *   Port number
 *   Database connection strings
 *   API keys
 */


/**
 * why we make many index.js file throughout our project 
 * 
 * because , let suppose we have to import 10 controller then we have to write 10 import statements which is not the efficient way , 
 * so for each folder we will make index.js file and then we import that index file in our main index and then form there we will use 
 * all different controller
 */



/**
 * can we delete package-lock.json  ?
 * 
 * yes you can but next time when someone again use npm install express then it might be chances that installing packages again have latest version
 * which may not match to the requirements of your project's package version, which can lead to the giving error 
 */



/**
 * why we use router and when to use router.use() , router.methods() , app.use(), app.methods()
 * 
 * router is use like a mini app...we don't have to use express app in different part of the same project 
 * 
 * router.use()--> use for applying on the all routes (below that) in that specifc file
 * router.methods()--> just like app.methods() in router wali file me 
 * app.methods()---> you know it
 * app.use()--> to use the imported router wali file instead of app.methods() .........since in the main index file how can we know that which 
 *              methods have to use for diferent api so just use app use then router will manage remaining thing
 */


/**
 * DIFFERENCE BETWEEN THE SQL DATABASE AND NOSQL DATABASE ?
 * 
 * Key Differences.....
 * STRUCTURE : SQL databases are table-based, while NoSQL databases are more flexible in data storage formats.
 * SCHEMA : SQL has a rigid schema; NoSQL has a flexible schema.
 * SCALABILITY : SQL databases typically scale vertically (adding more power to the server), whereas NoSQL databases often scale horizontally (adding more servers).
 * USE CASES : SQL is best for structured data and complex queries; NoSQL is better for unstructured data and rapid development.
 * 
 * EXAMPLE (NOSQL) -->: MySQL, PostgreSQL, Microsoft SQL Server, SQLite.
 * EXAMPLE (SQL) -->: MongoDB, Redis, Cassandra, CouchDB.
 */

/**
 * WHAT IS ORM AND ODM ..?
 * 
 * ORM (Object-Relational Mapping) and ODM (Object-Document Mapping) are two different techniques for interacting with databases in 
 * object-oriented programming. Both help developers manage data using objects, which can make database interactions easier and more intuitive.
 *
 * 1. ORM (Object-Relational Mapping)
 * Definition: ORM is a technique used to interact with SQL (relational) databases. It maps the rows of a table to objects in code, 
 *             allowing developers to work with database data using familiar programming language constructs instead of writing raw SQL queries.
 * How It Works: With ORM, each table in the database is represented as a class in the code, and each row is an object of that class. 
 *               Columns in the table become the properties of that class.
 * Examples of ORM Libraries: Sequelize (for Node.js), Hibernate (for Java), Entity Framework (for .NET)
 * 
 * 2. ODM (Object-Document Mapping)
 * Definition: ODM is similar to ORM but is used for NoSQL (document) databases, like MongoDB. It maps documents to objects in code, 
 *             allowing developers to interact with the database using their programming language.
 * How It Works: With ODM, each document in a collection is represented as an object in the code. Properties of the document are mapped to 
 *               fields in that object.
 * Examples of ODM Libraries: Mongoose (for MongoDB in Node.js), 
 * Benefits:
 * Allows developers to interact with MongoDB documents using object-oriented syntax.
 * Provides features like schema validation, middleware, and hooks.
 * Simplifies CRUD operations (Create, Read, Update, Delete).
 * 
 * 
 * WE NEED A DRIVER FOR CONNECTING ORM/ODM TO OUR DATABASES----> since by installing ORM/ODM will just help to connect our database to our project
 *                                                               but driver will help to understand the exact queries 
 */

/**
 * IN CONFIG.JSON IN CONFIG FOLDER WHAT DOES DIELECT DO ?
 * 
 * it indicates that through which database our application is connected. The dialect is important because it tells the ORM (like Sequelize) how
 * to communicate with the database, as different databases may have varying query languages and features. 
 */

/**
 * models file are at js level 
 * migration files are at database level 
 */

/**
 * IS THERE ANY DIFFERENCE BETWEEN RETURN AND THROW , WHNE WE USE WHICH ONE OF THIS
 * 
 * Use return when:
 *
 * You want to return a value from a function under normal circumstances.
 * The function execution is complete and you need to provide a result or end the function.
 * 
 * Use throw when:
 * 
 * You encounter an error or an exceptional situation, and you need to notify the caller that something went wrong.
 * You want the error to be caught by error-handling code (e.g., try...catch).
 */

/**
 * WHY WE NEDD THIS TWO LINES OF CODE --->app.use(express.json()) ; app.use(express.urlencoded({extended:true})) ;
 *
 * 
 * are needed so your Express app can read and understand the data that comes from the client.
 *
 * app.use(express.json()):
 * 
 * This helps the server READ JSON DATA from the client's request.
 * Example: If you send { "name": "John" } in a request, this line allows you to access it using req.body.name.
 *  
 * 
 * app.use(express.urlencoded({ extended: true })):
 * 
 * This helps the server READ FORM DATA from the client, like when a user submits a form on a website.
 * Example: If you send name=John&age=30, this line allows you to access it using req.body.name and req.body.age.
 */

/**
 * WHAT COMMANDS ARE USE TO SEED INITIAL DATA IN FORM OF SEED FILES 
 * 
 * npx sequelize seed:generate --name add-airplanes  ---> for creating the seed file
 * npx sequelize db:seed:all   ---> after updating the seed files we will run thos command to aupdate the table with that entries 
 * npx sequelize db:seed:undo:all   ---> for undo the changes in seed files 
 */

/**
 * HOW CAN YOU IDENTIFY THAT WHICH CONSTRAINTS KEY OF WHICH TABLE IS REFRENCING TO WHICH TABLE
 * (QUERY TO CHECK CONSTRAINT IS APPLIED OR NOT )
 * 
 * SELECT * 
 * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
 * WHERE TABLE_NAME = 'foreign_key_table_name' 
 * AND CONSTRAINT_SCHEMA = 'database_name';   ----> in whole query no need to mention name of table which was refrenced

 */

/**
 * command use for creating a migration file which will be use for associating two models
 * 
 * npx sequelize migration:generate --name update-city-airport-association
 */

/**
 * how association between two table will be make 
 * 
 * 1. at migration level 
 * in migration file of the table in which foreign key will present , edit fereign key like this 
 * departureAirportId: {
 *      type: Sequelize.STRING,
 *      allowNull:false ,
 *      references:{
 *        model:"Airports" ,
 *        key:"code"
 *      } ,
 *    (THAT'S ALL AT MIGRATION FILE)
 *
 * 2. at js level(in models file)
 * 
 *  in table where foreign key is--------------------->
 *  this.belongsTo(models.Airport, {
 *      foreignKey: 'departureAirportId',
 *      targetKey: 'code', 
 *      as: 'departureAirport',
 *    });
 *
 *    in table to which foreign key is pointing ----------------->
 *    this.hasMany(models.Flight, {
 *      foreignKey: 'departureAirportId',  // Flight's FK
 *      sourceKey: 'code',   
 *      onDelete: 'CASCADE',
 *    });
 */

/**
 * WHEN SOME SEED FILES ARE ALREADY SEEDE THEN HOW CAN YOU SEED ONE MORE FILE AFTER CREATING IT
 * 
 * we can't use ---->  npx sequelize db:seed:all ----> it will seed again the seeded file 
 * we will use -----------> npx sequelize db:seed --name name_of_seeder_file_from_seeder_folder
 */

/**
 * TO OPEN THE CURRENT DIRECTORY IN FILE EXPLORER ON WINDOWS , USE THIS COMMAND
 * 
 * explorer .    (replacemnet of open .     which is use in mac)

 */


/**
 * COMMAND FOR REMOVING ORIGIN ( FROM THE GIT REMOTE COMMAND )
 * 
 * git remote rm origin
 */

/**
 * YOU SHOULD ASK ONE QUESTION THAT , WHEN WE CREATE A MODEL IN OUR BOOKING SERVICE THEN HOW IT IS CREATED IN THE SAME DATABASE IN WHICH OTHER
 *  MODELS ARE PRESENT OF THE MAIN PROJECT 
 * 
 * ANS IS SIMPLE , IN STARTING WHEN YOU RUN COMMAND NPX SEQUELIZE INIT THEN A FILE CONFIG.JSON CREATED , IN WHICH YOU HAVE EDITED THE INFORMATION
 * ACCORDING TO THE MAIN PROJECT  SO THERE YOU MENTION THE DATABASE NAME, AND THAT'S HOW PRESENT BOOKING FOLDER IS ATTACHED WITH THE SAME DATABASE 
 */

/**
 * WHAT COMMANDS WILL BE USE FOR SWITCHING BETWEEN MAIN AND MASTER 
 * 
 * GIT SWITCH MAIN (IF YOU ARE ON MASTER )
 * GIT SWITCH MASTER (IF YOU ARE ON MAIN) ---> MAKE ENSURE THAT BEFORE SWITCHING YOU HAVE COMMITED THE CHANGES 
 * 
 */