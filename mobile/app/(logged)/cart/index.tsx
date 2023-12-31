import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useSetRouteName } from '../../../context/routeName'
import ItemMapper from '../../../components/cart/itemMapper'
import PedidosMapper from '../../../components/cart/pedidosMapper'
import Tabs from '../../../components/global/tabs'
import PendientesMapper from '../../../components/cart/pendientesMapper'
import { useUser } from '../../../context/user'

type Page = "Mi carrito" | "Mis pedidos" | "Pendientes";

interface Props {
  initialPage?: Page
}

const Cart = ({ initialPage = "Mi carrito" }: Props) => {
  useSetRouteName('Mis pedidos');
  const { user } = useUser();
  const [page, setPage] = useState<Page>(initialPage);
  const data: Page[] = ["Mi carrito", "Mis pedidos"];
  if(user?.rol === "restaurante" || user?.rol === "proveedor") {
    data.push("Pendientes");
  }
  
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
        : page === "Mis pedidos" ? <PedidosMapper /> :
        <PendientesMapper />
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