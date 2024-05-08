import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text } from 'react-native';
import axios from 'axios'; 
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

      await axios.post('http://192.168.1.11:5000/api/signup', { email, password }); 
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
      <Button title="Register" onPress={handleRegister} style={styles.button} />
      <Button
        title="Move to Login"
        onPress={handleNavigate}
        style={[styles.button, styles.moveToLoginButton]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveToLoginButton: {
    marginTop: 20,
  },
});