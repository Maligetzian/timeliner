// timeliner-backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Example endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  // Handle the form data (e.g., save to a database)
  res.status(200).send('Form data received');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
