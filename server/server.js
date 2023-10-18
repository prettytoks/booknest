require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
const bodyParser = require('body-parser'); // For parsing JSON requests
const app = express();
const cors = require("cors");

const books = require('./routes/api/books');

app.use(cors());

app.use(express.json());
// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('BookNest API'));

// use Routes
app.use('/api/books', books);

//app.use(require("./routes/api/books", books));


// Connect to MongoDB
mongoose.connect( process.env.DATABASE_URI, {
  useNewUrlParser: true
});


// Check the database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


// Start your Express server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
