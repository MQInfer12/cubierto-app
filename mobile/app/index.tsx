import { useUser } from '../context/user'
import { Redirect, router } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Usuario from '../interfaces/usuario'

const Index = () => {
  const { user, setUser } = useUser();
  const [userLoaded, setUserLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins100": require('../assets/fonts/Poppins-ExtraLight.ttf'),
    "Poppins200": require('../assets/fonts/Poppins-Light.ttf'),
    "Poppins300": require('../assets/fonts/Poppins-Thin.ttf'),
    "Poppins400": require('../assets/fonts/Poppins-Regular.ttf'),
    "Poppins500": require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins600": require('../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins700": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins800": require('../assets/fonts/Poppins-ExtraBold.ttf'),
    "Poppins900": require('../assets/fonts/Poppins-Black.ttf')
  }) 

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    const getLocalUser = async () => {
      const localUser = await AsyncStorage.getItem("user");
      await setUser(localUser ? JSON.parse(localUser) as Usuario : null);
      setUserLoaded(true);
    }
    getLocalUser();
  }, []);

  useEffect(() => {
    const hideSS = async () => {
      await SplashScreen.hideAsync();
      router.replace(user ? '/home' : '/login')
    }
    if(fontsLoaded && userLoaded) {
      hideSS();
    }
  }, [fontsLoaded, userLoaded]);

  return null;
}

export default Index