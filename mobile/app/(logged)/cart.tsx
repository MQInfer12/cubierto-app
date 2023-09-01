import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useSetRouteName } from '../../context/routeName'
import ItemMapper from '../../components/cart/itemMapper'
import PedidosMapper from '../../components/cart/pedidosMapper'
import Tabs from '../../components/global/tabs'

type Page = "Mi carrito" | "Mis pedidos" | "Pendientes";

const Cart = () => {
  useSetRouteName('Mis pedidos');
  const [page, setPage] = useState<Page>("Mi carrito");
  const data: Page[] = ["Mi carrito", "Mis pedidos", "Pendientes"];
  
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Tabs 
          page={page}
          setPage={setPage}
          data={data}
        />
      </View>
      {
        page === "Mi carrito" ? 
          <ItemMapper 
            irAMisVentas={() => setPage("Mis pedidos")} 
          /> 
        : page === "Mis pedidos" && <PedidosMapper />
      }
    </View>
  )
}

export default Cart

const styles = StyleSheet.create<any>({
  container: {
    flex: 1
  },
  tabsContainer: {
    paddingHorizontal: 20
  }
})