import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Enable CORS for all origins (you can restrict it to specific origins if needed)
app.use(cors());

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Array to store form data temporarily (you can replace this with a database later)
let contactFormData = [];

// POST endpoint to receive the contact form data
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Store the form data in the array
  contactFormData.push({ name, email, subject, message });

  // Respond with the stored data to show it on the frontend
  res.status(200).json({
    success: 'Message sent successfully!',
    data: { name, email, subject, message },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});