const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const weatherRoute = require('./routes/weather');
const aboutRoute = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = 'mongodb+srv://adityakhot:bighaat@cluster0.wnixd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB and start the server if the connection is successful
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'public')));

    // API routes
    app.use('/weather', weatherRoute);
    app.use('/about', aboutRoute);

    // Catch-all handler for any request that doesn't match an API route
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  });
