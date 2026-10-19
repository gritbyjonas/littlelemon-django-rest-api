
# Little Lemon Restaurant – React Front-End Capstone

## Project Overview

Little Lemon is a responsive restaurant web application developed
for the Meta Front-End Developer Capstone project.

The application provides a modern restaurant website with a
functional table reservation system, client-side validation,
accessible forms, and a booking confirmation page.

The frontend is developed using React and Vite, while the
backend uses Django REST Framework and MySQL.

## Technologies Used

### Frontend
- React
- JavaScript (ES6+)
- Vite
- React Router
- HTML5 and CSS3
- Vitest
- React Testing Library

### Backend
- Python
- Django
- Django REST Framework
- MySQL
- django-cors-headers

## Features

### Restaurant Homepage
- Little Lemon restaurant branding
- Responsive navigation
- Restaurant introduction
- Featured Mediterranean dishes
- Reservation navigation

### Table Reservation System
- Customer name
- Reservation date
- Reservation time
- Number of guests
- Occasion selection
- Client-side form validation
- Django REST API integration
- MySQL reservation storage
- Duplicate reservation prevention
- Meaningful validation and API error messages

### Booking Confirmation
After a successful reservation, customers are redirected
to a confirmation page displaying:

- Booking ID
- Customer name
- Reservation date
- Reservation time
- Number of guests
- Occasion

## Project Structure

```text
littlelemon/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── BookingForm.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   └── ConfirmedBooking.jsx
│   │   ├── services/
│   │   │   └── bookingApi.js
│   │   ├── tests/
│   │   │   └── BookingForm.test.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── setupTests.js
│   ├── package.json
│   └── vite.config.js
├── littlelemon/
│   ├── settings.py
│   └── urls.py
├── restaurant/
│   ├── models.py
│   ├── serializers.py
│   ├── api_views.py
│   └── api_urls.py
├── manage.py
├── Pipfile
└── README.md
```

## Installation and Setup

### Prerequisites

Install the following:

- Node.js and npm
- Python
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/gritbyjonas/littlelemon-django-rest-api.git
cd littlelemon-django-rest-api
```

### 2. Configure the Django Backend

Create and activate a Python virtual environment:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the backend dependencies using Pipenv:

```bash
python -m pip install pipenv
python -m pipenv install
```

Ensure MySQL Server is running and create a database
named `littlelemon` if it does not already exist.

Configure the MySQL credentials through the environment
variable used in Django settings.

Windows PowerShell:

```powershell
$securePassword = Read-Host "MySQL password" -AsSecureString
$env:MYSQL_PASSWORD = [System.Net.NetworkCredential]::new("", $securePassword).Password
```

The development database settings expect:

- Database: `littlelemon`
- Host: `127.0.0.1`
- Port: `3306`
- User: `root`

For production, use a dedicated database user with
appropriate permissions instead of the MySQL root account.

Apply database migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

Backend URL:

http://127.0.0.1:8000/

### 3. Configure the React Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

http://localhost:5173/

The React application sends booking requests to:

http://127.0.0.1:8000/api/bookings/

Both Django and React must be running to test
the complete reservation workflow.

## Running Unit Tests

From the `frontend` directory:

```bash
npm run test:run
```

The project includes six booking form unit tests:

1. Rendering all reservation fields
2. Required-field validation
3. Past-date validation
4. Guest-count validation
5. Successful booking submission
6. API error handling

Latest local test result:

- Test files: 1 passed
- Tests: 6 passed

## Production Build

Run:

```bash
npm run build
```

This creates the production frontend files in `dist/`.

The production build completed successfully during
local development.

## Accessibility and Responsive Design

The application includes:

- Semantic HTML elements
- Accessible navigation labels
- Associated form labels
- Required-field validation
- ARIA attributes for invalid fields
- Keyboard focus indicators
- Responsive layouts using CSS media queries
- User-friendly form error messages

The interface is designed for desktop, tablet,
and mobile screen sizes.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/menu-items/ | Retrieve menu items |
| POST | /api/bookings/ | Create a reservation |
| GET | /api/bookings/ | View bookings (staff only) |

Booking management operations require appropriate
authentication and permissions.

## Limitations

- The React booking system requires a running Django backend
  and configured MySQL database.
- The current booking model allows one reservation per
  date and time slot.
- Confirmation details are passed through React Router
  navigation state and may not persist after a full refresh.
- The homepage currently uses sample featured dishes.

## Author

Developed as part of the Meta Front-End Developer
Professional Certificate Capstone Project.

## License

Created for educational and portfolio purposes.
```
