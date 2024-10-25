const express = require('express');
const app = express();
const port = 3001; // The port your backend will run on

// Middleware to parse JSON bodies
app.use(express.json());

// AdminLogin route
app.post('/Adminlogin', (req, res) => {
  const { email, password } = req.body;

  // Basic login logic (replace this with actual validation)
  if (email === 'admin@gmail.com' && password === 'baby') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

