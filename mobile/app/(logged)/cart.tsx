import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontedText from '../../components/global/fontedText'
import { colors } from '../../styles/colors'
import NothingHere from '../../components/global/nothingHere'

const Cart = () => {
  return (
    <View style={styles.container}>
      <FontedText style={styles.title}>Mis pedidos</FontedText>
      <NothingHere text="¡Ups, no tienes pedidos!" />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    flex: 1
  },
  title: {
    fontSize: 12,
    color: colors.gray600
  },
})