import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "HAWKXD4520E",
  database: "employees_data"
});

app.get('/api/employees', (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, results) => {
    if (err) throw err;
    const employeesWithImages = results.map(employee => {
      if (employee.dob) {
        const dob = new Date(employee.dob);
        employee.dob = dob.toISOString().split('T')[0];
      }      
      if (employee.image) {
        const base64String = Buffer.from(employee.image, 'array').toString('base64');
        employee.image = base64String;
      }      
      return employee;
    });
    return res.json(employeesWithImages);
  });
});



// app.get('/api/employees', (req, res) => {
//   const sql = "SELECT * FROM employees";
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     return res.json(results);
//   });
// });






app.get('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const employee = results[0];
    if (employee.dob) {
      const dob = new Date(employee.dob);
      employee.dob = dob.toISOString().split('T')[0];
    }    
    if (employee.image) {
      employee.image = Buffer.from(employee.image, 'binary').toString('base64');
    }
    return res.json(employee);
  });
});


app.put('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const { name, sex, dob, salary, department, image } = req.body;

  const sql = "UPDATE employees SET name=?, sex=?, dob=?, salary=?, department=?, image=? WHERE id=?";
  const values = [name, sex, dob, salary, department, image, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
    } else {
      console.log('Employee updated successfully');
      res.status(200).send('Employee updated successfully');
    }
  });
});


app.post("/api/employees", (req, res) => {
  const { name, sex, dob, salary, department, image } = req.body;
  const sql = `INSERT INTO employees (name, sex, dob, salary, department, image) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [name, sex, dob, salary, department, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving user:", err);
      res.status(500).send("Error saving user");
    } else {
      console.log("User saved successfully");
      res.status(200).send("User saved successfully");
    }
  });
});

app.delete('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  const sql = 'DELETE FROM employees WHERE id = ?';
  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).send('Error deleting employee');
    } else {
      console.log('Employee deleted successfully');
      res.status(200).send('Employee deleted successfully');
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const user = results[0];

    if (user && user.password === password) {
      console.log("Login Successful");
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

app.post('/api/signup', (req, res) => {
  const user = req.body;
  const sql = "INSERT INTO users SET ?";
  db.query(sql, user, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    user.id = result.insertId;
    return res.json(user);
  });
});

app.post('/api/checkemail', (req, res) => {
  const { email } = req.body;
  
  const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    const count = results[0].count;
    
    if (count > 0) {
      return res.json('Email verified');
    } else {
      return res.status(404).json('Email not found');
    }
  });
});

app.post('/api/updatepassword', (req, res) => {
  const { email, newPassword } = req.body;

  const sql = "UPDATE users SET password = ? WHERE email = ?";
  db.query(sql, [newPassword, email], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    if (result.affectedRows > 0) {
      return res.json('Password updated successfully');
    } else {
      return res.status(500).json('Failed to update password');
    }
  });
});

app.listen(8080, () => {
  console.log("Server started");
});
