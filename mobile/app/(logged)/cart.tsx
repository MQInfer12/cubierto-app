import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NothingHere from '../../components/global/nothingHere'
import { useSetRouteName } from '../../context/routeName'
import { useCart } from '../../context/cart'
import FontedText from '../../components/global/fontedText'
import ItemMapper from '../../components/cart/itemMapper'
import PedidosMapper from '../../components/cart/pedidosMapper'
import { colors } from '../../styles/colors'

type Pages = "carrito" | "misPedidos";

const Cart = () => {
  useSetRouteName('Mis pedidos');
  const [page, setPage] = useState<Pages>("carrito");
  
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabIndex(page === "carrito")} onPress={() => setPage("carrito")}>
          <FontedText weight={600} style={styles.tabIndexText(page === "carrito")}>Mi carrito</FontedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabIndex(page === "misPedidos")} onPress={() => setPage('misPedidos')}>
          <FontedText weight={600} style={styles.tabIndexText(page === "misPedidos")}>Mis pedidos</FontedText>
        </TouchableOpacity>
      </View>
      {
        page === "carrito" ? 
        <ItemMapper 
          irAMisVentas={() => setPage("misPedidos")} 
        /> :
        page === "misPedidos" && <PedidosMapper />
      }
    </View>
  )
}

export default Cart

const styles = StyleSheet.create<any>({
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
  tabContainer: { 
    flexDirection: "row"
  },
  tabIndex: (active: boolean) => ({
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: active ? colors.primary500 : colors.gray500,
    paddingVertical: 8,
  }),
  tabIndexText: (active: boolean) => ({
    textAlign: "center",
    color: active ? colors.primary500 : colors.gray500
  })
})