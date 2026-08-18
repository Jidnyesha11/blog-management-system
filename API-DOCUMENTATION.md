# Blog Management System API Documentation

Base URL:

http://localhost:5000/api

---

## Authentication

### Register

POST `/auth/register`

Request:

```json
{
    "name": "Jidnyesha",
    "email": "jidnyesha@example.com",
    "password": "password123"
}
````

Response:

```json
{
    "success": true,
    "message": "User registered successfully",
    "token": "JWT_TOKEN",
    "user": {
        "id": "USER_ID",
        "name": "Jidnyesha",
        "email": "jidnyesha@example.com",
        "role": "user"
    }
}
```

---

### Login

POST `/auth/login`

Request:

```json
{
    "email": "jidnyesha@example.com",
    "password": "password123"
}
```

Response:

```json
{
    "success": true,
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "user": {
        "id": "USER_ID",
        "name": "Jidnyesha",
        "email": "jidnyesha@example.com",
        "role": "user"
    }
}
```

---

# Posts

## Get all posts

GET `/posts`

Authentication: Not required.

---

## Get single post

GET `/posts/:id`

Authentication: Not required.

---

## Create post

POST `/posts`

Authentication: Required.

Header:

```text
Authorization: Bearer JWT_TOKEN
```

Request:

```json
{
    "title": "Learning React",
    "content": "React is a JavaScript library...",
    "image": "https://example.com/image.jpg",
    "category": "Technology"
}
```

---

## Update post

PUT `/posts/:id`

Authentication: Required.

The authenticated user must be the post owner or an admin.

Request:

```json
{
    "title": "Updated React Guide",
    "content": "Updated content",
    "category": "Technology"
}
```

---

## Delete post

DELETE `/posts/:id`

Authentication: Required.

The authenticated user must be the post owner or an admin.

---

# Admin

All admin endpoints require:

```text
Authorization: Bearer ADMIN_JWT_TOKEN
```

---

## Get statistics

GET `/admin/stats`

Returns:

* Total users
* Total posts
* Total administrators

---

## Get all users

GET `/admin/users`

Returns all registered users without passwords.

---

## Update user role

PUT `/admin/users/:id/role`

Request:

```json
{
    "role": "admin"
}
```

Allowed roles:

```text
user
admin
```

---

## Delete user

DELETE `/admin/users/:id`

Admin authentication required.

An administrator cannot delete their own account.

---

## Get all posts for admin

GET `/admin/posts`

Returns all blog posts with author information.

---

# Authorization

The API uses JWT Bearer authentication.

Format:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Roles:

```text
user
admin
```

Regular users can:

* Create posts
* Edit their own posts
* Delete their own posts

Administrators can:

* Create posts
* Edit any post
* Delete any post
* View all users
* Change user roles
* Delete users
* View admin statistics

---

# HTTP Status Codes

| Status | Meaning                 |
| ------ | ----------------------- |
| 200    | Success                 |
| 201    | Created                 |
| 400    | Bad Request             |
| 401    | Authentication Required |
| 403    | Access Denied           |
| 404    | Resource Not Found      |
| 409    | Conflict                |
| 500    | Server Error            |

````