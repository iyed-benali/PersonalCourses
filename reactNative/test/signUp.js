
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React ,{useState} from 'react';
import app from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
export default function SignUp() {
    
  const [email,setEmail] = useState('')
  const [password , setPassword] = useState('')
  const auth = getAuth()
const handleRegister = async ()=>{
try{
  const userCred = await createUserWithEmailAndPassword(auth,email,password)
var user =  userCred.user
console.log(user,'gggg')
}
catch(err){
  console.log(err)
}
}
  return (
    <View style={styles.container}>
     <TextInput placeholder='email' value={email} onChangeText={setEmail} >
     </TextInput>
     <TextInput placeholder='password' value={password} onChangeText={setPassword}  secureTextEntry>
     </TextInput>
     <Button title = 'register' onPress={handleRegister}></Button>
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
});
