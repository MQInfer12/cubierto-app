import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontedText from '../../components/global/fontedText'
import { colors } from '../../styles/colors'
import NothingHere from '../../components/global/nothingHere'
import { useSetRouteName } from '../../context/routeName'

const Cart = () => {
  useSetRouteName('Mis pedidos');
  
  return (
    <View style={styles.container}>
      <NothingHere text="¡Ups, no tienes pedidos!" />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1
  }
})