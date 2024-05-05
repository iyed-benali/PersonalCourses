
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


mongoose.connect('mongodb://127.0.0.1/lightingStreet').then(()=>{
  console.log('database connected')
})
.catch((err)=>{
throw err
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


app.post('/api/signup', async (req, res) => {
  try {
    const { email, password  } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.get('/api/getLocations/:rueId', async (req, res) => {
  try {
    const rueId = req.params.rueId;
    const rue = await Rue.findById(rueId).populate('locations');
    if (!rue) {
      return res.status(404).json({ error: 'Rue not found' });
    }
    res.status(200).json(rue.locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});



const locationSchema = new mongoose.Schema({
    state : Boolean,
    latitude: Number,
    longitude: Number,
  });
  
  const Location = mongoose.model('Location', locationSchema);

  const rueSchema = new mongoose.Schema({
    name: String,
    city: String,
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
  });
  
  app.post('/addRue', async (req, res) => {
    try {
      const newRue = new Rue(req.body);
      const savedRue = await newRue.save();
      res.status(201).json(savedRue);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

const Rue = mongoose.model('Rue',rueSchema)

app.post('/api/addLocation', async (req, res) => {
  try {
    const {  latitude, longitude } = req.body;
    const location = new Location({ state: true, latitude, longitude });
    await location.save();
    const rueId = req.body.rueId; 
console.log(rueId);
    const rue = await Rue.findById(rueId);
    console.log(rue,"fffff")
    if (!rue) {
      return res.status(404).json({ error: 'Rue not found' });
    }
    rue.locations.push(location._id);
    await rue.save();
    res.status(201).json({ message: 'Location added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/api/deleteLocation/:id', async (req, res) => {
  try {
    const locationId = req.params.id;
    await Location.findByIdAndDelete(locationId);
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.put('/api/updateLocation/:id', async (req, res) => {
  try {
    const locationId = req.params.id;
    const { latitude, longitude } = req.body;
    const updatedFields = {};
    if (latitude) updatedFields.latitude = latitude;
    if (longitude) updatedFields.longitude = longitude;
    await Location.findByIdAndUpdate(locationId, updatedFields);
    res.status(200).json({ message: 'Location updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});
  

app.get('/rues', async (req, res) => {
  try {
    const rues = await Rue.find().populate('locations');
    res.json(rues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.get('/rues/:id', async (req, res) => {
  try {
    const rue = await Rue.findById(req.params.id);
    if (!rue) {
      return res.status(404).json({ message: 'Rue not found' });
    }
    res.json(rue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/rues/:id', async (req, res) => {
  try {
    const { name, city } = req.body;
    const updatedRue = await Rue.findByIdAndUpdate(req.params.id, { name, city }, { new: true });
    if (!updatedRue) {
      return res.status(404).json({ message: 'Rue not found' });
    }
    res.json(updatedRue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/rues/:id', async (req, res) => {
  try {
    const deletedRue = await Rue.findByIdAndDelete(req.params.id);
    if (!deletedRue) {
      return res.status(404).json({ message: 'Rue not found' });
    }
    res.json({ message: 'Rue deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
