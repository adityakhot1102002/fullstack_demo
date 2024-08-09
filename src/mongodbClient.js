const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const uri = 'mongodb+srv://adityakhot:bighaat@cluster0.wnixd.mongodb.net/weatherDatabase?retryWrites=true&w=majority&appName=Cluster0'; 

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected with Mongoose');
  } catch (err) {
    console.error('MongoDB connection error with Mongoose:', err);
  }
};

// Close connection
const close = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  }
};

module.exports = { connect, close };