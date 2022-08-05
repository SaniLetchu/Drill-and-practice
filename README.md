# Project 2: Drill and practice

## Description

Web application built with Deno and PostgreSQL. The application uses a
three-tier architecture (client, server, database) and a layered architecture
with four layers (views, controllers, services, database).

The application can create topics with multiple questions and answer options.
Then you can take quizzes on them.

The application comes with an API that gives random questions with possible
answers and the API can also check if answer is correct if sent JSON document is
formulated correctly.

Example: { "questionId": 1, "optionId": 3, }

## Usage

You can login using the admin credentials:

email: admin@admin.com, password: 123456

Or by registering a new account, which does not have adming rights.

## Deployment

The application has been deployed using
[Heroku](https://drill-and-practice1.herokuapp.com/)

## Local Deployment

To run the application locally you need to have installed Deno and
Docker-compose.

Running the application: **docker-compose up**

Accessing the application: **http://localhost:7777/**

## Testing

Some of the tests require some data to exists in the database to work.

Running all the tests:

**docker-compose run --rm drill-and-practice deno test --allow-all**
