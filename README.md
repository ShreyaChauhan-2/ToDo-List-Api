# Todo API

This is a simple REST API built with Node.js, Express, and MySQL. The API allows users to manage tasks with operations like creating, reading, updating, and deleting tasks.

---

## Features
- **Create a Task**: Create a new task with a title and description.
- **Fetch All Tasks**: Retrieve all tasks in the database.
- **Fetch a Single Task**: Get details of a task by its ID.
- **Update Task Status**: Update the status of a task.
- **Delete a Task**: Delete a task by its ID.

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
       user: ""/*enter your username*/,
       password: ""/*user password same as sql server*/, 
       database: "todo_db",
     };
     ```

### Step 4: Run the Application
Start the application by running:
```bash
node index.js
```

You should see the following message:
```
Server is running on http://localhost:3000
Database and table initialized.
```

### Step 5: Interact with the API
Use tools like [Postman](https://www.postman.com/) or `curl` to interact with the API.

#### Endpoints:
1. **Create a Task**
   - `POST /tasks`
   - Body: `{ "title": "Task Title", "description": "Task Description" }`

2. **Fetch All Tasks**
   - `GET /tasks`

3. **Fetch a Task by ID**
   - `GET /tasks/:id`

4. **Update Task Status**
   - `PUT /tasks/:id`
   - Body: `{ "status": "in-progress" }`

5. **Delete a Task**
   - `DELETE /tasks/:id`

---

## Notes
- Ensure your MySQL user has permissions to create databases and tables.
- The default database (`todo_db`) and table (`tasks`) will be created automatically on the first run.

---

## Troubleshooting
1. **Cannot Connect to MySQL**:
   - Verify MySQL credentials in the `DB_CONFIG` object.
   - Check if the MySQL service is running.

2. **Dependencies Not Installed**:
   - Run `npm install` again to ensure all dependencies are installed.
