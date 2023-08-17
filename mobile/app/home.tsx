import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useUser } from '../context/user';
import { router } from 'expo-router'
import { UseLoggedUser } from '../hooks/useLoggedUser'

const Index = () => {
  const user = UseLoggedUser();
  const { setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user.foto }} />
      <Text>{user.nombre}</Text>
      <Text>{user.email}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 200,
    height: 200
  }
});