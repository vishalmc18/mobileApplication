import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Text,Button} from 'react-native-elements';

const SignupScreen = ({navigation}) => {
  return (
    <>
  {/* <Text style={{ fontSize: 48 }}>SignupScreen</Text> */}
  <Text h1>Signup Screen</Text>
  <Button title='Go to SignIn Screen'type="outline" onPress={()=>navigation.navigate("Signin")}></Button>
  <Button title='Go to mainFlow'type="outline" color="warning" onPress={()=>navigation.navigate("mainFlow")}></Button>
    </>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({});

export default SignupScreen;
