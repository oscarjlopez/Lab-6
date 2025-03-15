import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default to 3001

// Enable CORS (restrict to specific origins in production)
const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173", // Replace with your frontend's URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json()); // Enable JSON body parsing


// Create a connection to the database
const db = mysql.createConnection({
  host: "database-1.cnqe00p5d1ax.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Timndbpw10!",
  database: "oscardb",  // Change "YOUR_FIRSTNAME_db" to your actual database name
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// Define the endpoint for fetching employees
app.get("/employees", (req, res) => {
  db.query("SELECT employee_id, first_name, last_name, email, birthdate, salary FROM employees", (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ message: "Error fetching employees" });
    }
    res.json(results);
  });
});

// Define the endpoint for adding a new employee
app.post('/employees', (req, res) => {
  const { firstName, lastName, email, birthdate, salary } = req.body;

  // Insert the new employee into the database
  const query = 'INSERT INTO employees (first_name, last_name, email, birthdate, salary) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [firstName, lastName, email, birthdate, salary], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Error adding employee");
      } else {
          res.status(201).send("Employee added successfully");
      }
  });
});

// Define the endpoint for editing an existing employee
app.put('/employees/:id', (req, res) => {
  const { firstName, lastName, email, birthdate, salary } = req.body;
  const { id } = req.params;  // Get the employee ID from the URL

  // Update the employee record in the database
  const query = 'UPDATE employees SET first_name = ?, last_name = ?, email = ?, birthdate = ?, salary = ? WHERE employee_id = ?';
  db.query(query, [firstName, lastName, email, birthdate, salary, id], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Error updating employee");
      } else {
          res.status(200).send("Employee updated successfully");
      }
  });
});

// Define the endpoint for deleting an employee
app.delete("/employees/:id", (req, res) => {
  const query = "DELETE FROM employees WHERE employee_id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ message: "Error deleting employee" });
    }
    res.json({ message: "Employee deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
