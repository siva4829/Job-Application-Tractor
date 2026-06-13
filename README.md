# Job Application Tracker

A full-stack web application that helps users manage and track their job applications in one place. Users can register, log in securely, add job applications, update application statuses, and monitor their application progress through a dashboard.

## Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT-based Authentication

### Job Management

* Add New Job Applications
* View All Applications
* Update Application Details
* Delete Applications
* Track Application Status

### Dashboard

* Total Applications Count
* Applied Count
* Interview Scheduled Count
* Rejected Count
* Offer Count

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* HTML5
* CSS3

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Token)
* bcrypt

## Project Structure

```text
job-application-tracker/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── components/
│   │   └── JobForm.jsx
│   │
│   ├── Pages/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

## Database Schema

### Users Table

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

### Applications Table

```sql
CREATE TABLE applications(
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100),
    job_title VARCHAR(100),
    location VARCHAR(100),
    salary NUMERIC,
    application_date DATE,
    status VARCHAR(20),
    notes TEXT,
    user_id INT REFERENCES users(id)
);
```

## API Endpoints

### Authentication

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | /register | Register User |
| POST   | /login    | Login User    |

### Applications

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| GET    | /jobs     | Get All Applications |
| POST   | /jobs     | Add Application      |
| PUT    | /jobs/:id | Update Application   |
| DELETE | /jobs/:id | Delete Application   |

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm start
```

### Frontend Setup

```bash
npm install
npm run dev
```

## Future Enhancements

* Search Applications
* Filter by Status
* User-specific Dashboard
* Email Notifications
* Resume Upload
* Interview Reminder System
* AI-powered Job Application Insights

## Learning Outcomes

This project demonstrates:

* React Fundamentals
* React Router
* REST API Integration
* Express.js Backend Development
* PostgreSQL Database Operations
* JWT Authentication
* Password Security with bcrypt
* CRUD Operations
* Full-Stack Application Development

## Author

Sivanesan L

Built as a learning project to strengthen full-stack web development skills using React, Node.js, Express, and PostgreSQL.
