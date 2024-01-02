import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View , Text,StyleSheet } from 'react-native';
import SignUp from './signUp';
import Login from './login';
import Upload from './upload';

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signUp">
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="login"  component={Login} />
      <Stack.Screen name="upload" component={Upload} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
 };

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

 
