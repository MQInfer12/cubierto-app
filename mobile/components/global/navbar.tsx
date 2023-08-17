import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './icon'
import { colors } from '../../styles/colors'
import { usePathname, useRouter } from 'expo-router'
import { router } from 'expo-router'

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
        <Icon name='home' color={currentRoute === "/home" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name='cart' color={colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name='heart' color={colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/profile')}>
        <Icon name='person' color={currentRoute === "/profile" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  container: {
    height: 106,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingBottom: 34,
  },
  button: {
    padding: 12
  }
})