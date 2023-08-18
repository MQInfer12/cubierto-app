import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useUser } from '../../context/user';
import { UseLoggedUser } from '../../hooks/useLoggedUser'
import { colors } from '../../styles/colors';
import FontedText from '../../components/global/fontedText';
import Icon from '../../components/global/icon';

const Home = () => {
  const user = UseLoggedUser();
  const { logout } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image style={styles.foto} source={{ uri: user.foto }} />
        <FontedText style={styles.nombre} weight={700}>{user.nombre}</FontedText>
        <FontedText style={styles.email}>{user.email}</FontedText>
      </View>
      <View style={styles.bottom}>
        <FontedText style={styles.bottomTitle} weight={600}>Mi cuenta</FontedText>
        <TouchableOpacity style={styles.bottomButton}>
          <View style={styles.bottomIconContainer}>
            <Icon name='person-outline' size={16} color={colors.gray900} />
          </View>
          <FontedText style={styles.bottomButtonText} weight={600}>Información personal</FontedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <View style={styles.bottomIconContainer}>
            <Icon name='notifications-outline' size={16} color={colors.gray900} />
          </View>
          <FontedText style={styles.bottomButtonText} weight={600}>Notificaciones</FontedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <View style={styles.bottomIconContainer}>
            <Icon name='information-circle-outline' size={16} color={colors.gray900} />
          </View>
          <FontedText style={styles.bottomButtonText} weight={600}>Información legal</FontedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={logout}>
          <View style={styles.bottomIconContainer}>
            <Icon name='log-out-outline' size={16} color={colors.gray900} />
          </View>
          <FontedText style={styles.bottomButtonText} weight={600}>Cerrar sesión</FontedText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  foto: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 16
  },
  nombre: {
    fontSize: 20,
    color: colors.gray900,
    textAlign: "center"
  },
  email: {
    fontSize: 12,
    color: colors.gray600,
    textAlign: "center"
  },
  bottom: {
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    width: "100%",
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    paddingBottom: 64
  },
  bottomTitle: {
    fontSize: 16,
    color: colors.gray500,
    marginBottom: 8
  },
  bottomButton: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: colors.gray400,
    paddingVertical: 8,
    alignItems: "center",
    gap: 16
  },
  bottomIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.gray400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16
  },
  bottomButtonText: {
    color: colors.gray900
  }
});