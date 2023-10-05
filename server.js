const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const connectionString = 'mongodb+srv://movietheater:mongodb123@cluster0.jt5vmvj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
console.log('Connecting to MongoDB');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
