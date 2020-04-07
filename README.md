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

**Response (500 - Internal Server Error)~Failed Read to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## POST /googleSignIn
> register by OAuth Google when the email has not been registered in the database
> login by OAuth Google when the email is registered in the database

**Request Header**
```
no needed
```
**Request Body**
```
{
    "idToken": "<token from google>"
}
```

**Response (201 - Created)~register**
```
{
  "access_token": "<access token user>",
  "name": "<name user>"
}
```

**Response (200 - Ok)~login**
```
{
  "access_token": "<access token user>",
  "name": "<name user>"
}
```

**Response (500 - Internal Server Error)~Failed Read/Save to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## GET /tasks/
> get all task (only same organization task)

**Request Header**
```
{
    "access_token": "<access token user>"
}
```

**Request Body**
```
no needed
```

**Response (200 - Ok)**
```
[
  {
    "id": <id task>,
    "title": "<title task>",
    "category": "<category task>",
    "UserId": <id user task>,
    "createdAt": "<date created task>",
    "isOwner": <is owner task or not>
  }
]
```

**Response (500 - Internal Server Error)~Failed Read to Database**
```
{
  "message": [
    "Internal server error"
  ]
}
```
---

## POST /tasks
> create new task

**Request Header**
```
{
    "access_token": "<access token user>"
}
```
**Request Body**
```
{
    "title": "<title new task>",
    "category": "<category new task>"
}
```

**Response (200 - Ok)**
```
{
  "id": <id task>,
  "title": "<title task>",
  "category": "<category task>",
  "createdAt": "<date created task>",
  "UserId": <id creator>
}
```

**Response (400 - Bad Request)~Validation Error**
```
{
  "message": [
    "The task is required!",
    "The category is required!"
  ]
}
```

**Response (403 -Forbidden)~Don't have token**
```
{
  "message": [
    "Don't have access"
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

## PUT /tasks/:id
> update tasks (only owner tasks can update the task)

**Request Header**
```
{
    "access_token": "<access token user>"
}
```

**Request Params**
```
/:id
```

**Request Body**
```
{
    "title": "<title task update>",
    "category": "<category task update>"
}
```

**Response (200 - Ok)**
```
{
  "title": "<title task updated>",
  "category": "<category task updated>"
}
```

**Response (400 - Bad Request)~Validation Error**
```
{
  "message": [
    "The title is required!",
    "The category is required!"
  ]
}
```

**Response (404 - Not Found)~Task not found**
```
{
  "message": [
    "Task not found"
  ]
}
```

**Response (401 - Not Authorized)~Other user task**
```
{
  "message": [
    "Not Authorized!"
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

## DELETE /tasks/:id
> delete tasks (only owner tasks can delete the task)

**Request Header**
```
{
    "access_token": "<access token user>"
}
```

**Request Params**
```
/:id
```

**Request Body**
```
no needed
```

**Response (200 - Ok)**
```
{
  "message": "Deleted successfully!"
}
```

**Response (404 - Not Found)~Task not found**
```
{
  "message": [
    "Task not found"
  ]
}
```

**Response (401 - Not Authorized)~Other user task**
```
{
  "message": [
    "Not Authorized!"
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