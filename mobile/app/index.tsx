import { useUser } from '../context/user'
import { router } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Usuario from '../interfaces/usuario'
import { registerForPushNotificationsAsync } from '../utilities/notifications'
import { usePushToken } from '../context/pushToken'

const Index = () => {
  const { user, setUser } = useUser();
  const [userLoaded, setUserLoaded] = useState(false);
  const { setPushToken } = usePushToken();

  const [fontsLoaded] = useFonts({
    "Biko400": require('../assets/fonts/Biko_Regular.otf'),
    "Biko600": require('../assets/fonts/Biko_Bold.otf'),
    "Biko700": require('../assets/fonts/Biko_Black.otf')
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
      setUser(localUser ? JSON.parse(localUser) as Usuario : null);
      setUserLoaded(true);
    }
    getLocalUser();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if(!token) return;
      setPushToken(token.data)
    });
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