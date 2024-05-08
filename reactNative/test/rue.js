import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Rue = ({ street }) => {
  const [data, setData] = useState([]);
  const [formState, setFormState] = useState({
    name: '',
    city: '',
  });
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.navigate('upload', { streetId: id });
  };

  const handleChangeText = (text, field) => {
    setFormState({
      ...formState,
      [field]: text,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.11:5000/addRue', formState);
      console.log(response.data, 'dbhazfvazjfhjafz');
      fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.11:5000/rues');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


    return (
      <ScrollView style={styles.container}>
        <View style={styles.ruesContainer}>
          {data.map((rue) => (
            <TouchableOpacity onPress={() => handlePress(rue._id)} key={rue._id}>
              <View style={styles.rueContainer}>
                <Text style={styles.rueText}>Name: {rue.name}</Text>
                <Text style={styles.rueText}>City: {rue.city}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
  
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Name"
            value={formState.name}
            onChangeText={(text) => handleChangeText(text, 'name')}
            style={styles.input}
          />
          <TextInput
            placeholder="City"
            value={formState.city}
            onChangeText={(text) => handleChangeText(text, 'city')}
            style={styles.input}
          />
          <Button title="Submit" onPress={handleSubmit} style={styles.button} />
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: 20,
    },
    ruesContainer: {
      marginBottom: 20,
    },
    rueContainer: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
    },
    rueText: {
      fontSize: 16,
      marginBottom: 5,
    },
    formContainer: {
      marginBottom: 20,
    },
    input: {
      width: '100%',
      marginBottom: 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      fontSize: 16,
    },
    button: {
      width: '100%',
      paddingVertical: 15,
      backgroundColor: '#007bff',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 18,
    },
  });
  
  export default Rue;
  