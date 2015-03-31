# NERD stack #

Application skeleton using hipster techniques of web development. This starter app is built using Node.js / IO.js, Express and React. To make backend implementation complete this starter pack also contains a database connector and example models using your favorite database. 

The purpose of this application skeleton is to empower developers to be able to start developing their node.js + React easily but still maintaining enough wiggle room to not get constrained into heavy frameworks.

This repository contains all source code for the actual implementation of the skeleton. To start using this, please refer to the installer which let's you choose few options, including your database implementation. 


## Installation ##
This repository contains all source code for the actual implementation of the skeleton. To start using this, please refer to the installer which let's you choose few options, including your database implementation. 

####Environment ####
The tools of the trade for this application development stack are node.js, git and your preferred database implementation. 
You can install node.js for Windows or Mac from https://nodejs.org/download/
For Linux you can follow instructions on https://github.com/joyent/node/wiki/Installation

To install git you can download it from http://git-scm.com/downloads or use your package manager to install it.

####Databases####
The application contains multiple implementations of databases. After you have decided which database to use you need to have it running on your local machine to be able to start developing your next big web application with NERD stack. Installation instructions for different databases:

- [PostgreSql](https://wiki.postgresql.org/wiki/Detailed_installation_guides)
- [MySql](https://dev.mysql.com/doc/refman/5.1/en/installing.html)
- [SQLite3](http://www.tutorialspoint.com/sqlite/sqlite_installation.htm)
- [CouchDB](http://docs.couchdb.org/en/latest/install/)
- [MongoDB](http://docs.mongodb.org/manual/installation/#installation-guides)
- [Neo4j](http://neo4j.com/docs/stable/server-installation.html) 
- [Redis (Windows not officially supported)](http://redis.io/download)
- [RethinkDB (Not available on Windows)](http://rethinkdb.com/docs/install/ )

##Running##

To run this application you can install this app with usual commands:
````
git clone :repository
npm install
gulp dev
````

When you are happy with your application and plan to run it without development mode  you can invoke the following commands:
````
gulp build ```` To build the latest frontend resources
and
```` node /config/server.js ```` To start the server.
It is recommended to use something like supervisor to run the application when uptime is important.