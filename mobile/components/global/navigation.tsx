import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Icon from './icon'
import { colors } from '../../styles/colors'
import FontedText from './fontedText'
import { useRouteName } from '../../context/routeName'
import { useCola } from '../../context/cola'
import { useHandleCola } from '../../hooks/useHandleCola'

const Navigation = () => {
  const { route } = useRouteName();
  const { cola, loadingSalir, timer } = useCola();
  const { myTurn, handleSalirDeCola } = useHandleCola();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {
          router.canGoBack() &&
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name='chevron-back-outline' size={24} color={colors.gray500} />
          </TouchableOpacity> 
        }
        <FontedText weight={700} style={styles.backText}>{ route }</FontedText>
      </View>
      {
        cola ?
        <View style={styles.buttonContainer}>
          <FontedText weight={700} style={styles.colaColor}>
            {
              loadingSalir ?
              "Saliendo de la cola..."
              : myTurn ?
              `¡Tienes ${timer}s para pedir!` :
              `Estás en cola: ${cola.length}` 
            }
          </FontedText>
          <TouchableOpacity onPress={handleSalirDeCola}>
            <Icon name='close-outline' size={24} color={colors.primary500} />
          </TouchableOpacity> 
        </View> :
        <View style={styles.logoContainer}>
          <FontedText weight={600} style={styles.logoText}>Cubierto</FontedText>
          <Image style={styles.logo} source={require('../../assets/images/CubiertoIsotipo.png')} />
        </View>
      }
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: 'center',
    height: 96,
    zIndex: 5,
    backgroundColor: colors.bgTransparent,
    justifyContent: "space-between"
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: "100%",
    paddingVertical: 12
  },
  logoText: {
    color: colors.gray600
  },
  logo: {
    height: "100%",
    width: 24
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 10,
  },
  backText: {
    color: colors.navTextColor,
    opacity: 0.25
  },
  colaColor: {
    color: colors.primary500,
  }
})