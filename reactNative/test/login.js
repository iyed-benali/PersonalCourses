import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import app from './firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Rue');
    } catch (err) {
      console.log(err);
    }
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
      <Button title="Login" onPress={handleLogin} style={styles.button} />
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
    backgroundColor: '#007bff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
