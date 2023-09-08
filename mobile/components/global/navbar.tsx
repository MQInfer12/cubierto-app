import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './icon'
import { colors } from '../../styles/colors'
import { usePathname } from 'expo-router'
import { router } from 'expo-router'
import { useUser } from '../../context/user'
import { UserRol } from '../../interfaces/usuario'
import FontedText from './fontedText'

const Navbar = () => {
  const { user } = useUser();
  const currentRoute = usePathname();

  const donationRoles: UserRol[] = ["beneficiario", 'restaurante', 'proveedor'];
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.button}>
        <Icon name='home' color={currentRoute === "/home" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/cart')} style={styles.button}>
        <Icon name='cart' color={currentRoute === "/cart" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      {
        (user && donationRoles.includes(user?.rol)) &&
        <TouchableOpacity onPress={() => router.push('/donations')} style={styles.button}>
          <Icon name='fitness-outline' color={currentRoute === "/donations" ? colors.primary500 : colors.gray500} size={24} />
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => router.push('/starred')} style={styles.button}>
        <Icon name='heart' color={currentRoute === "/starred" ? colors.primary500 : colors.gray500} size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile')} style={styles.button}>
        <Icon name='person' color={currentRoute === "/profile" ? colors.primary500 : colors.gray500} size={24} />
        {
          !!user?.notificacionesPendientes &&
          <View style={styles.redPoint}>
            <FontedText weight={700} style={styles.redPointText}>{user?.notificacionesPendientes}</FontedText>
          </View>
        }
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
  },
  redPoint: {
    position: "absolute",
    top: 8,
    left: 32,
    width: 16,
    height: 16,
    backgroundColor: colors.primary500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  redPointText: {
    color: colors.white,
    fontSize: 10
  }
})