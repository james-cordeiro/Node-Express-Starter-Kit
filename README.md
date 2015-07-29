Node.js + Express Starter Kit
----

## Introduction

This is my personal starter kit for getting a quick barebones Node & Express app running on a local machine, local or publically accesible server. It is an opinionated directory structure, approach and methodology that will quickly get you up and running with your own build process, usage of the right set of tools, facilitate writing your own testing programs & routing middlewares as well as demonstrate some example files to help describe the coding style and get you started.

This starter-kit can also fairly quickly get you up and running in building the next globally popular Uber APP, a simple hobby app or build the latest and greatest REST API - it is agnostic and not overly dependent on boxing you into usages of certain tools and methods/approaches. The chose is completely yours.

The starter-kit is also ready to accept DB migrations and deploy different environments.

*This starter-kit is simply my own helpful starter tool that I use. It is in now way as elloborate or encompassing as starter-kit tools and deployment tools such as Yeoman*

### Tech Stack & Core Packages

- NodeJS
- ExpressJS

- Gulp - to build and run the app. Can deploy different build environments
- BrowserSync - to help sychronise development across devices in real-time without refresh
- Nodemon - to run the node app and watch for file changes. 

- SASS - For help building out OOCSS (recommendation would be to follow the BEM approach)

- Mocha - For TDD & BDD Unit Testing
- Sinon - For Spying/Mocking
- Chai - For Assertions

- Handlebars for HTML templating

### Dependencies

Ensure Gulp is installed globally on your system to run/build the app.
Ensure Mocha is installed globally on your system to run tests.
Ensure NPM is installed globally on your system (should come standard with Node).
Ensure db-migrate is insttaled globally on your system to run your DB migration builds.

## Getting Started

Before you begin you will need to ensure that the dependencies are installed along with NodeJS.

### Installation

Once you have cloned this repo and/or copied over the files into your own directory make sure to navigate yourself to that directory if you are not already there. Then issue the following commands to install the starter-kit.

```
	$	npm install
```

### Commands

#### Gulp

By default Gulp will run the production environment set-up which will minify CSS & JS files. The development environment will initialise Nodemon and BrowserSync. No sourcemaps are generated but the CSS and JS are not minified. 

Run the default build:

```
	$	gulp
```

Run the production build:

```
	$	gulp start
```


##### Gulp Options

	> *--env [option]* Set the environment of the running node build. e.g. --env dev
	>	Available options: prod - production, stag - staging, dev - development.


#### db-migrate

Please see `https://github.com/db-migrate/node-db-migrate` for more information

#### Mocha

Please see `http://mochajs.org/` for more information


#### npm test

By default this command runs `mocha -R spec`

#### npm start

Runs the gulp production build process and starts up the node app to listen to request events

#### mocha

Run any/all tests defined in the tests directory

## Directory Structure Description

From the root directory the core folders to mention are:

### /my_modules

Here you would place any node modules you could build and want to include in your own projects

### /migrations

Here you would include your database migration files which 

### /middleware

Here you would include separated middleware components

### /routes

Here you would include the logically separated routes (REST routes) to your app

### /src

Here you would store your source files for the build step of images, CSS (SCSS) and JS

The directory structure within this is `/images`, `/scripts` and `/styles`. Shoud you change this structure and/or add deeper level folder structures do remember to adjust your gulpfile to account for these changes.

### /test

Here you would store test files and in a folder your `fixtures`

### /views 

This is were you define your HTML templates and web page structures

### /dist

This folder is where the gulp build stores the processed files and folder structures from the `src` folder

### /config

In this folder you will see files containing options, options that change the environment settings should you wish.

