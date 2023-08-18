import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './icon'
import { colors } from '../../styles/colors'
import { usePathname } from 'expo-router'
import { router } from 'expo-router'
import { shadows } from '../../styles/shadows'

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
        <Icon name='home' color={currentRoute === "/home" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/cart')}>
        <Icon name='cart' color={currentRoute === "/cart" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/starred')}>
        <Icon name='heart' color={currentRoute === "/starred" ? colors.primary500 : colors.gray500} size={24} />
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
    ...shadows.shadow900
  },
  button: {
    padding: 12
  }
})