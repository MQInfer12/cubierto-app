import React from 'react'
import GoogleLogin from '../components/login/googleLogin';
import { StyleSheet, View } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <GoogleLogin />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})