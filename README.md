# Todo API with JWT Authentication

This API provides a simple task management system using **Node.js**, **Express**, **MySQL**, and **JWT (JSON Web Tokens)**. The API allows users to manage tasks with features like creating, reading, updating, and deleting tasks. JWT is used to authenticate users and secure the task management endpoints.

---

## Features
- **Create a Task**: Create a new task with a title and description.
- **Fetch All Tasks**: Retrieve all tasks from the database.
- **Fetch a Single Task**: Get details of a task by its ID.
- **Update Task Status**: Update the status of a task.
- **Delete a Task**: Delete a task by its ID.
- **Login**: Authenticate users and issue a JWT for secure access to the API.

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MySQL**: [Download MySQL](https://www.mysql.com/)

---

## Setup and Run Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/ShreyaChauhan-2/ToDo-List-Api.git
cd ToDo-List-Api
```

### Step 2: Install Dependencies
Run the following command to install required packages:
```bash
npm install
```

### Step 3: Configure MySQL
1. **Start MySQL Server**:
   Ensure that your MySQL server is running.

2. **Database Configuration**:
   - Update the database credentials in the `DB_CONFIG` object in `index.js`:
     ```javascript
     const DB_CONFIG = {
       host: "localhost",
       user: "",/*Enter username here*/
       password: "", /*Enter password same as sql server*/
       database: "todo_db",
     };
     ```
   
3. **Generate JWT Secret Key**:
   - Replace the `SECRET_KEY` in the `index.js` with a secure key for your application:
     ```javascript
     const SECRET_KEY = "your-secure-jwt-secret"; // Replace this with a strong key in production
     ```

### Step 4: Run the Application
Start the application by running:
```bash
node index.js
```

You should see the following message:
```
Server is running on http://localhost:4002
Database and table initialized.
```

### Step 5: Interact with the API
Use tools like [Postman](https://www.postman.com/) or `curl` to interact with the API.

---

## API Endpoints

### 1. **Login** – Get a JWT token to authenticate
- **POST /login**
  - **Body**:
    ```json
    {
      "username": "admin",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "your-jwt-token"
    }
    ```
  - Use the returned JWT token for authenticating requests to other endpoints.

---

### 2. **Create a Task**
- **POST /tasks**
  - **Headers**: `Authorization: Bearer <JWT_TOKEN>`
  - **Body**:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description"
    }
    ```
  - **Response**:
    ```json
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
    ```

---

### 3. **Fetch a Task by ID**
- **GET /tasks/:id**
  - **Headers**: `Authorization: Bearer <JWT_TOKEN>`
  - **Response**:
    ```json
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending",
      "created_at": "2025-01-01T00:00:00.000Z"
    }
    ```

---

### 4. **Update Task Status**
- **PUT /tasks/:id**
  - **Headers**: `Authorization: Bearer <JWT_TOKEN>`
  - **Body**:
    ```json
    {
      "status": "completed"
    }
    ```
  - **Response**:
    ```json
    {
      "id": 1,
      "status": "completed"
    }
    ```

---

### 6. **Delete a Task by ID**
- **DELETE /tasks/:id**
  - **Headers**: `Authorization: Bearer <JWT_TOKEN>`
  - **Response**:
    - **Status**: `204 No Content` (if successful)

---

## Notes

- **JWT Authentication**:
  - All task-related endpoints (`/tasks/*`) require the `Authorization` header with a Bearer token.
  - Tokens expire after 1 hour (can be adjusted in the `expiresIn` option during token creation).

- **Login**:
  - Use the `/login` endpoint to authenticate with the username and password (`admin`, `password123` for demo purposes). Upon successful login, a JWT token will be returned, which is needed for all subsequent requests.

---

## Troubleshooting

1. **Cannot Connect to MySQL**:
   - Verify MySQL credentials in the `DB_CONFIG` object.
   - Check if the MySQL service is running.

2. **Invalid JWT Token**:
   - Ensure that the `Authorization` header includes the correct Bearer token for protected endpoints.
   - If the token is expired or invalid, you need to log in again to get a new token.

3. **Dependencies Not Installed**:
   - Run `npm install` again to ensure all dependencies are installed.

----