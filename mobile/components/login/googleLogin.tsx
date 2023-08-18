import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from '../../context/user'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from "expo-linking"
import { router } from 'expo-router'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'

const REDIRECT_URI = process.env.EXPO_PUBLIC_BACKEND + "google";
const OAUTH_ID = process.env.EXPO_PUBLIC_OAUTH_ID;

const GoogleLogin = () => {
  const appUrl = Linking.createURL("");
  const { user, setUser } = useUser();

  const getUserData = async (result: any) => {
    const { url } = result;
    if(url) {
      const params = Linking.parse(url) as any;
      const { userId } = params.queryParams;
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}usuario/${userId}`);
      if(res.ok) {
        const json = await res.json();
        setUser(json.data);
      }
    }
  }

  const handlePress = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${OAUTH_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent&state=${appUrl}`,
      REDIRECT_URI
    );
    getUserData(result);
  }

  useEffect(() => {
    Linking.addEventListener("url", getUserData);
  }, []);

  useEffect(() => {
    if(user) {
      router.replace("/home");
    }
  }, [user]);

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image style={styles.logo} source={require('../../assets/images/GoogleLogo.png')} />
      <FontedText weight={600} style={styles.text}>Continúa con Google</FontedText>
    </TouchableOpacity>
  )
}

export default GoogleLogin

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 56,
    borderColor: colors.gray500
  },
  text: {
    fontSize: 18,
    color: colors.gray500
  },
  logo: {
    width: 40,
    aspectRatio: 2008 / 2048
  }
})
