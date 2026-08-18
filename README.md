# BlogSpace — Blog Management System

A full-stack Blog Management System built with the MERN stack.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Lucide React
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## Features

### Authentication

- User registration
- User login
- JWT authentication
- Secure password hashing
- Logout
- Protected routes

### Blog Management

- Create blog posts
- View all posts
- View individual posts
- Edit posts
- Delete posts
- Categories
- Search
- Author information

### Authorization

Regular users can:

- Create posts
- Edit their own posts
- Delete their own posts

Administrators can:

- View all users
- Change user roles
- Delete users
- View all posts
- Edit any post
- Delete any post
- View platform statistics

### UI

- Modern responsive design
- Responsive navigation
- Authentication pages
- Blog listing
- Blog details
- User dashboard
- Admin dashboard
- Loading states
- Error states
- Mobile-friendly layout

---

# Project Structure

```text
blog-management-system/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   └── package.json
│
├── API-DOCUMENTATION.md
├── .gitignore
└── README.md
````

---

# Requirements

Install:

* Node.js
* MongoDB Atlas account
* Git

Recommended Node.js version:

```text
Node.js 20+
```

---

# Installation

## 1. Clone repository

```bash
git clone https://github.com/Jidnyesha11/blog-management-system.git
cd blog-management-system
```

## 2. Backend

```bash
cd Backend
npm install
```

Create:

```text
.env
```

Copy the values from:

```text
.env.example
```

Configure:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

# 3. Frontend

Open another terminal:

```bash
cd Frontend
npm install
```

Create:

```text
.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# API

Base URL:

```text
http://localhost:5000/api
```

## Authentication

```text
POST /auth/register
POST /auth/login
```

## Posts

```text
GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

## Admin

```text
GET    /admin/stats
GET    /admin/users
PUT    /admin/users/:id/role
DELETE /admin/users/:id
GET    /admin/posts
```

Protected endpoints require:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Full API documentation:

```text
API-DOCUMENTATION.md
```

---

# User Roles

## User

Users can:

* Register
* Login
* Create posts
* Edit their own posts
* Delete their own posts
* View posts

## Admin

Administrators can:

* Manage users
* Change user roles
* Delete users
* Manage all posts
* View statistics

---

# Database

The application uses MongoDB.

Main collections:

```text
users
posts
```

User passwords are hashed using bcryptjs.

JWT tokens are used for authentication and role-based authorization.

---

## Local Development

Backend

cd Backend
npm install
npm run dev

Backend runs on:

http://localhost:5000
Frontend

Open another terminal:

cd Frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
Environment Variables
Backend

## Create:

Backend/.env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
Frontend

## Create:

Frontend/.env
VITE_API_URL=http://localhost:5000/api
Production

The application is deployed using Render.

Frontend
https://blog-management-frontend-kaly.onrender.com


        ↓


Backend API
https://blog-management-system-5jhi.onrender.com


        ↓


MongoDB Atlas
Production API

The backend API base URL is:

https://blog-management-system-5jhi.onrender.com/api

Health check:

https://blog-management-system-5jhi.onrender.com/api/health
Authentication

The application uses JWT-based authentication.

Authenticated requests use:

Authorization: Bearer <JWT_TOKEN>

## Roles:

user
admin

Admin-only functionality is protected using role-based authorization middleware.

## Main API Routes
POST   /api/auth/register
POST   /api/auth/login


GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id


GET    /api/profile
PUT    /api/profile
PUT    /api/profile/password


GET    /api/comments/post/:postId
POST   /api/comments/post/:postId
DELETE /api/comments/:id


POST   /api/likes/:postId
GET    /api/likes/:postId


Admin:
GET    /api/admin/users
PUT    /api/admin/users/:id/role
DELETE /api/admin/users/:id
Deployment

The project is deployed as two Render services:

Backend
Service Type: Web Service
Root Directory: Backend
Build Command: npm install
Start Command: npm start

Frontend
Service Type: Static Site
Root Directory: Frontend
Build Command: npm install && npm run build
Publish Directory: dist
---

# Security

The application includes:

* Password hashing
* JWT authentication
* Role-based authorization
* Protected API routes
* Protected frontend routes
* Environment variables
* `.gitignore` protection for secrets
* Request body limits
* Disabled Express fingerprinting

---

# License

This project is created for educational and project-development purposes.

````