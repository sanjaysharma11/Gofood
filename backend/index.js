const express = require('express');
const app = express();
const port = 5000;

// CORS configuration to allow requests from the deployment URL
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://gofoodapp.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use this route for authentication
app.use('/api/auth', require('./Routes/Auth'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
