import express from 'express';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// Start server
const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
