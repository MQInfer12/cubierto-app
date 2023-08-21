import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NothingHere from '../../components/global/nothingHere'
import { useSetRouteName } from '../../context/routeName'
import { useCart } from '../../context/cart'
import ItemMapper from '../../components/cart/itemMapper'

const Cart = () => {
  const { items } = useCart();
  useSetRouteName('Mis pedidos');
  
  return (
    <View style={styles.container}>
      {
        items.length ?
        <ItemMapper />
        :
        <NothingHere text="¡Ups, no tienes pedidos!" />
      }
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