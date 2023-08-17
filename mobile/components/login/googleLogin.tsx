import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from '../../context/user'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from "expo-linking"

const REDIRECT_URI = process.env.EXPO_PUBLIC_BACKEND + "google";
const OAUTH_ID = process.env.EXPO_PUBLIC_OAUTH_ID;

const GoogleLogin = () => {
  const { setUser } = useUser();

  const getUserData = async (result: any) => {
    const { url } = result;
    if(url) {
      const params = Linking.parse(url) as any;
      const { userId } = params.queryParams;
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}usuario/${userId}`);
      if(res.ok) {
        const json = await res.json();
        console.log(json);
        setUser(json);
      }
    }
  }

  const handlePress = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${OAUTH_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent`,
      REDIRECT_URI
    );
    getUserData(result);
  }

  useEffect(() => {
    Linking.addEventListener("url", getUserData);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Logeate con Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GoogleLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})