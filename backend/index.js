global.foodData = require('./db')(function call(err, data, CatData) {
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
});

const express = require('express');
const app = express();
const port = 5000;

// CORS configuration to allow requests from your frontend domain
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://goforfoodapp.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API endpoint to serve food data
app.get('/api/fooddata', (req, res) => {
  if (global.foodData && global.foodCategory) {
    res.json({
      foodItems: global.foodData,
      categories: global.foodCategory
    });
  } else {
    res.status(500).json({ error: 'Data not available' });
  }
});

// Other routes, e.g., for authentication
app.use('/api/auth', require('./Routes/Auth'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
