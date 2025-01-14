console.log("Starting server...");

const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "Admin@123", 
  database: "todo_db", 
};

const SECRET_KEY = "your-secret-key"; // Replace with a secure key in production

// Function to initialize the database
async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: DB_CONFIG.host,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_CONFIG.database}`);
  await connection.end();

  const db = await mysql.createConnection(DB_CONFIG);

  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Database and table initialized.");
  return db;
}

// Middleware to connect to database
let db;
initializeDatabase().then((connection) => {
  db = connection;
});

// Middleware to authenticate JWTs
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token." });
    req.user = user; /* Attach decoded user data to request*/
    next();
  });
}

// Static credentials for login
const STATIC_CREDENTIALS = {
  username: "admin",
  password: "password123", /*Replace with a secure password in production*/
};

// Login endpoint to issue JWT tokens
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === STATIC_CREDENTIALS.username && password === STATIC_CREDENTIALS.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" }); // Generate JWT
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials." });
});

// Protect task endpoints with JWT middleware
app.use("/tasks", authenticateToken);


//Features of application:
// 1. Create a new task
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required." });
  }

  try {
    const [result] = await db.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description]);
    res.status(201).json({ id: result.insertId, title, description, status: "pending" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
});


// 2. Fetch all tasks
app.get("/tasks", async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks");
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});


// 3. Fetch a task by ID
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [tasks] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    if (tasks.length === 0) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json(tasks[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task." });
  }
});


// 4. Update task status
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "in-progress", "completed"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status. Valid statuses are: pending, in-progress, completed." });
  }

  try {
    const [result] = await db.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json({ id, status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task." });
  }
});


// 5. Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// Start the server
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
