import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './icon'
import { colors } from '../../styles/colors'
import { usePathname } from 'expo-router'
import { router } from 'expo-router'
import { useUser } from '../../context/user'

const Navbar = () => {
  const { user } = useUser();
  const currentRoute = usePathname();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.button}>
        <Icon name='home' color={currentRoute === "/home" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      {
        /* user?.rol === "beneficiario" && */
        <TouchableOpacity onPress={() => router.push('/donations')} style={styles.button}>
          <Icon name='fitness-outline' color={currentRoute === "/donations" ? colors.primary500 : colors.gray500} size={24} />
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => router.push('/cart')} style={styles.button}>
        <Icon name='cart' color={currentRoute === "/cart" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/starred')} style={styles.button}>
        <Icon name='heart' color={currentRoute === "/starred" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile')} style={styles.button}>
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
    borderTopWidth: 1,
    borderColor: colors.gray400
  },
  button: {
    padding: 12
  }
})