import React, { useState } from 'react'
import { Button, StyleSheet, Text,TextInput,View } from 'react-native';
import app from './firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

    export default function Login ({navigation}) {
      const [password,setPassword] = useState('')
      const [email,setEmail] = useState('')
      const auth = getAuth()

      const handleLogin = async () =>{
        try{
          await signInWithEmailAndPassword(auth,email,password)
          navigation.navigate('Rue')
        }
        catch(err){
          console.log(err)
        }
      }
  
        return (
         <View style={styles.container } >
      <TextInput placeholder='email' value={email} onChangeText={setEmail} />
      <TextInput placeholder='password' value={password} onChangeText={setPassword} />
      <Button title='login' onPress={handleLogin} />
         </View>
        );
}

const styles  = StyleSheet.create({
  container : {
    flex :1 ,
    backgroundColor : " #fff",
    alignItems : 'center',
    justifyContent : 'center'
  }
})

    