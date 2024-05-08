import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function AddLocation({ navigation }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);

  const route = useRoute();
  const streetId = route.params?.streetId;
  
  useEffect(() => {
    if (streetId) {
      fetchLocations();
    }
  }, [streetId]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`http://192.168.1.11:5000/api/getLocations/${streetId}`);
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleAddLocation = async () => {
    try {
      await axios.post('http://192.168.1.11:5000/api/addLocation', { latitude, longitude, rueId: streetId });
      console.log('Location added successfully');
      
      fetchLocations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      await axios.delete(`http://192.168.1.11:5000/api/deleteLocation/${locationId}`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  const handleUpdateLocation = async (locationId) => {
    try {
      console.log(`Navigating to update location screen for location id: ${locationId}`);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationItem}>
      <Text style={styles.locationDetails}>
        {`Latitude: ${item.latitude}, Longitude: ${item.longitude}`}
      </Text>
      <Text style={{ color: item.state? 'green' : 'red' }}>
        {item.state? 'Activated' : 'Deactivated'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete"
          onPress={() => handleDeleteLocation(item._id)}
          color="red"
        />
        <Button
          title="Update"
          onPress={() => handleUpdateLocation(item._id)}
        />
      </View>
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
        <Button title="Add Location" onPress={handleAddLocation} style={styles.button} />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});