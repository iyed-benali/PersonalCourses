import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import axios from 'axios'; // Import Axios
import app from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await axios.post('http://192.168.1.41:5000/api/signup', { email, password }); 
      console.log('User registered:', user);
      navigation.navigate('login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Move to Login" onPress={handleNavigate} />
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
