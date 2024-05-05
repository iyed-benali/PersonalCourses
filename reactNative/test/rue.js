import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Rue = ({street}) => {
  const [data, setData] = useState([]);
  const [formState, setFormState] = useState({
    name: '',
    city: '',
    
  });
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.navigate('upload', { streetId:id});
  };

  const handleChangeText = (text, field) => {
    setFormState({
     ...formState,
      [field]: text,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.16:5000/addRue', formState);
      console.log(response.data,'dbhazfvazjfhjafz');
      fetchData()
    } catch (error) {
      console.error('Error submitting form:', error);

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.16:5000/rues');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      
      
      <View>
        {data.map((rue) => (
          <TouchableOpacity onPress={()=>handlePress(rue._id)} >
          <View key={rue._id}>
            <Text>Name: {rue.name}</Text>
            <Text>City: {rue.city}</Text>
          </View>
            </TouchableOpacity>
        ))}
      </View>
   
      <View>
        <TextInput
          placeholder="Name"
          value={formState.name}
          onChangeText={(text) => handleChangeText(text, 'name')}
          />
        <TextInput
          placeholder="City"
          value={formState.city}
          onChangeText={(text) => handleChangeText(text, 'city')}
        />
        {/* Add more TextInput components as needed */}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Rue;
