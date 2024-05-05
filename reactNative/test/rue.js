import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 

const Rue = ({ street }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation(); 
  useEffect(() => {
    fetchData();
  }, []);
  const handlePress = () => {
    navigation.navigate('AddLocation', { streetId: street._id });
  };


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rues');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <TouchableOpacity>
    <View>
      {data.map((rue) => (
        <View key={rue._id}>
          <Text>Name: {rue.name}</Text>
          <Text>City: {rue.city}</Text>
        </View>
      ))}
    </View>
    </TouchableOpacity>
  );
};

export default Rue;
