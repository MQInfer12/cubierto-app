import React from 'react'
import GoogleLogin from '../components/login/googleLogin';
import { Image, StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
import FontedText from '../components/global/fontedText';

const win = Dimensions.get('window');
const ratio = win.width / 720;
const imgHeight = 788 * ratio;

const Login = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/loginBG.png')} />
      <View style={styles.buttonContainer}>
        <View style={styles.top}>
          <FontedText weight={700} style={styles.topText}>Bienvenido</FontedText>
        </View>
        <View style={styles.bottom}>
          <FontedText style={styles.text} weight={600}>Inicia sesión con tu cuenta de Google</FontedText>
          <GoogleLogin />
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: win.width,
    height: imgHeight
  },
  buttonContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  top: {
    height: imgHeight,
    justifyContent: 'center'
  },
  topText: {
    color: 'white',
    marginLeft: 32,
    fontSize: 40
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    opacity: 0.4,
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
    marginBottom: 24
  }
})