import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import axios from 'axios'; // Import Axios

export default function AddLocation({ navigation }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleAddLocation = async () => {
    try {
      // Send location data to your Express server
      await axios.post('http://localhost:3000/api/addLocation', { latitude, longitude });
      console.log('Location added successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Back to Signup" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
