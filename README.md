# Kanban
---

## POST /register
> create new user

**Request Header**
```
no needed
```
**Request Body**
```
{
    "name": "<name new user>",
    "email": "<email new user>",
    "password": "<password new user>"
}
```

**Response (201 - Created)**
```
{
  "access_token": "<access token user>",
  "name": "<name user>"
}
```

**Response (400 - Bad Request)~Validation Error**
```
{
  "message": [
    "The name is required!",
    "The email is required!",
    "The email must be in email format!",
    "The password is required!"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Save to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## POST /login
> login user by email and password

**Request Header**
```
no needed
```
**Request Body**
```
{
    "email": "<email user>",
    "password": "<password user>"
}
```

**Response (200 - Ok)**
```
{
  "access_token": "<access token user>",
  "name": "<name user>"
}
```

**Response (400 - Bad Request)~Validation Error**
```
{
  "message": [
    "The email is required!",
    "The password is required!"
  ]
}
```

**Response (404 - Not Found)~Email not found**
```
{
  "message": [
    "Email not found!"
  ]
}
```

**Response (401 - Not Authorized)~Password wrong**
```
{
  "message": [
    "Wrong Password!"
  ]
}
```

**Response (500 - Internal Server Error)~Failed Save to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---