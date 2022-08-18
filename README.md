[![Build Status](https://travis-ci.org/Xantier/nerd-stack.svg)](https://travis-ci.org/Xantier/nerd-stack)
[![Coverage Status](https://coveralls.io/repos/Xantier/nerd-stack/badge.svg)](https://coveralls.io/r/Xantier/nerd-stack)
[![Dependencies](https://david-dm.org/Xantier/nerd-stack.svg)](https://david-dm.org/Xantier/nerd-stack)
[![devDependency Status](https://david-dm.org/Xantier/nerd-stack/dev-status.svg)](https://david-dm.org/Xantier/nerd-stack#info=devDependencies)


# NERD stack #

The NERD stack provides you with an application skeleton with [Node.js](https://nodejs.org/), [Express](http://expressjs.com/), [React](https://facebook.github.io/react/) and database connectivity. It provides user with an opportunity to start quickly developing both large and small scale [isomorphic/universal javascript](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) web applications using [Flux](https://facebook.github.io/flux/) architecture. The skeleton has in place implementations for:

- A server backend using Node.js and Express
- View layer rendered by Facebook's React framework 
- Establish database connectivity and perform standard CRUD operations
- Universal JS application architecture sharing resources on server and client
- Unidirectional data flow using Flux architecture
- Gulp build tasks to run the server with automatic restarts and livereload
- Frontend resource bundling and sourcemaps
- Sourcecode linting to ensure code quality
- Test runner and test coverage reporting with Mocha and Istanbul
- ES6 transpilation using Babel

The purpose of this application skeleton is to empower developers to be able to start developing their Node.js + React easily but still maintaining enough wiggle room to not get constrained into heavy frameworks.


[You can find more information on the app from the wiki] (https://github.com/Xantier/nerd-stack/wiki)

## Installation ##


#### Environment ####
The tools of the trade for this application development stack are node.js, git and your preferred database implementation. 
You can [install node.js](
https://www.scaler.com/topics/javascript/install-node-js/) for Windows or Mac from https://nodejs.org/download/
For Linux you can follow instructions on https://github.com/joyent/node/wiki/Installation

To install git you can download it from http://git-scm.com/downloads or use your package manager to install it.

#### Databases ####
The application contains multiple implementations of databases. After you have decided which database to use you need to have it running on your local machine to be able to start developing your next big web application with NERD stack. Installation instructions for different databases:

- [PostgreSql](https://wiki.postgresql.org/wiki/Detailed_installation_guides)
- [MySql](https://dev.mysql.com/doc/refman/5.1/en/installing.html)
- [SQLite3](http://www.tutorialspoint.com/sqlite/sqlite_installation.htm)
- [CouchDB](http://docs.couchdb.org/en/latest/install/)
- [MongoDB](http://docs.mongodb.org/manual/installation/#installation-guides)
- [Neo4j](http://neo4j.com/docs/stable/server-installation.html) 
- [Redis (Windows not officially supported)](http://redis.io/download)
- [RethinkDB (Not available on Windows)](http://rethinkdb.com/docs/install/)

#### Dependencies ####
`package.json` contains all the dependencies that are required by the project, including the supported database clients, so it might be a good idea to remove the ones that you are not planning to use.

Install the dependencies by running `npm install`.

#### Configuration ####
You can select your database implementation by modifying configuration file called config.json in app/config/ folder. In the file replace the db attribute with your chosen implementation. Actual DB settings are listed below under their respective names. Please make sure to setup your system how you have configured your database itself. Good things to change are hostname, database name and user credentials.

##### PostgreSql, MySql and SQLite3 users #####
Please note that PostgreSql, MySql and SQLite3 are handled by the [Bookshelf.js](http://bookshelfjs.org/) module, therefore in the `app/config/config.json` you should select `bookshelf` as your db and depending on your actual database of choice, change `bookshelf.db` to one of the matching database configurations (under `bookshelf`).

To setup your database, run `gulp migrate`. It will execute migrations that are stored in `app/data/bookshelf/migrations`. In order to create your own migrations take a look at the existing files and [Knex.js schema builder API](http://knexjs.org/#Schema).

## Running ##

To run this application you can install this app with usual commands:
````
git clone git@github.com:Xantier/nerd-stack.git
cd nerd-stack
npm install
gulp dev
````
Your application will be accessible at `http://localhost:3000`

When you are happy with your application and plan to run it without development mode  you can invoke the following commands:
````
gulp build 
```` 
To build the latest frontend resources and
```` 
node /config/server.js 
```` 
To start the server.
It is recommended to use something like supervisor to run the application when uptime is important.



# Licence #


[The MIT License](http://opensource.org/licenses/mit-license.php)
