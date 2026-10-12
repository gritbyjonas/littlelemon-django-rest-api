# Little Lemon Restaurant – Django REST API Capstone

Project: littlelemon  
Django App: restaurant  
Database: MySQL  
Framework: Django REST Framework

## Project Description

This project implements a restaurant booking system and menu API using Django, Django REST Framework, MySQL, and Djoser.

Features include a booking form, JSON APIs, menu management, user registration, token authentication, and unit tests.

## Installation

1. Install Python, Pipenv, and MySQL Server.
2. Create a MySQL database named `littlelemon`.
3. Set the `MYSQL_PASSWORD` environment variable to your local MySQL password.
4. Open the project folder and run:

```text
py -m pipenv install
py -m pipenv run python manage.py migrate
py -m pipenv run python manage.py runserver
```

The database settings use MySQL on `127.0.0.1:3306` with username `root`. Adjust the settings for your own MySQL account if needed.

## Website

Homepage: `/`  
Book a Table: `/book/`  
Reservations: `/reservations/`

## REST API Endpoints

GET, POST: `/api/menu-items/`

GET, PUT, PATCH, DELETE: `/api/menu-items/1/`

GET, POST: `/api/bookings/`

GET, PUT, PATCH, DELETE: `/api/bookings/1/`

POST — User Registration: `/auth/users/`

POST — Token Login: `/auth/token/login/`

POST — Token Logout: `/auth/token/logout/`

## Authentication

Protected API requests use the HTTP header:

`Authorization: Token YOUR_TOKEN`

Obtain a token using `/auth/token/login/`.

Menu items can be viewed publicly. Editing menu items requires staff access. Booking endpoints require authentication, with editing and deletion restricted to staff.

## Testing

Run the automated tests:

`py -m pipenv run python manage.py test restaurant`

The project includes tests for menu APIs, bookings, authentication, permissions, and duplicate reservations.

API requests can also be tested with Insomnia.

## Important

Create your own MySQL database and login credentials before testing. This project does not include private passwords or an exported MySQL database.