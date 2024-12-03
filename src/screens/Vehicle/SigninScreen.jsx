import React from 'react';
import { View, StyleSheet,Button, Text } from 'react-native';

const SigninScreen = ({navigation}) => {
  return (
  <>
  <Text style={{ fontSize: 48 }}>SigninScreen</Text>
  <Button title='Go to SignUp Screen' onPress={()=>navigation.navigate("Signup")}></Button>
  </>
  
  );
};

const styles = StyleSheet.create({});

export default SigninScreen;
