
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React ,{useState} from 'react';
import app from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
export default function SignUp({navigation}) {
    
  const [email,setEmail] = useState('')
  const [password , setPassword] = useState('')
  const auth = getAuth()
const handleRegister = async ()=>{
try{
  const userCred = await createUserWithEmailAndPassword(auth,email,password)
var user =  userCred.user
console.log(user,'gggg')
navigation.navigate('login')
}
catch(err){
  console.log(err)
}
}
const hadnleNavigate = ( )=>{
  navigation.navigate('login')
}
  return (
    <View style={styles.container}>
     <TextInput placeholder='email' value={email} onChangeText={setEmail} >
     </TextInput>
     <TextInput placeholder='password' value={password} onChangeText={setPassword}  secureTextEntry>
     </TextInput>
     <Button title = 'register' onPress={handleRegister}></Button>
     <Button title= 'move to login' onPress={hadnleNavigate}>
     </Button>
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
