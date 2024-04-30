import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';
import axios from 'axios';

export default function AddLocation({ navigation }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getLocations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleAddLocation = async () => {
    try {
      await axios.post('http://localhost:3000/api/addLocation', { latitude, longitude });
      console.log('Location added successfully');
      fetchLocations(); // Fetch locations again after adding new location
    } catch (err) {
      console.error(err);
    }
  };

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationItem}>
      <Text>{`Latitude: ${item.latitude}, Longitude: ${item.longitude}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Latitude"
          value={latitude.toString()}
          onChangeText={setLatitude}
          style={styles.input}
        />
        <TextInput
          placeholder="Longitude"
          value={longitude.toString()}
          onChangeText={setLongitude}
          style={styles.input}
        />
        <Button title="Add Location" onPress={handleAddLocation} />
      </View>
      
      <Text style={styles.locationsHeader}>Locations:</Text>
      <FlatList
        data={locations}
        renderItem={renderLocationItem}
        keyExtractor={(item) => item._id}
      />
      
      <Button title="Back to Signup" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  locationsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
