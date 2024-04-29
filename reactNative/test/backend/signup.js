
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  id : Number
});

const User = mongoose.model('User', userSchema);


app.post('/api/signup', async (req, res) => {
  try {
    const { email, password  } = req.body;
    const user = new User({ email, password , id: Math.random()* 1000000 });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});


const locationSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    latitude: Number,
    longitude: Number,
  });


  
  
  const Location = mongoose.model('Location', locationSchema);
  app.post('/api/addLocation', async (req, res) => {
    try {
      const { userId, latitude, longitude } = req.body;
      const location = new Location({ userId, latitude, longitude });
      await location.save();
      res.status(201).json({ message: 'Location added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
