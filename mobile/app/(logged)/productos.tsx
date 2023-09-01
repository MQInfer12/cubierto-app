import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSetRouteName } from '../../context/routeName';
import Tabs from '../../components/global/tabs';
import ProductTable from '../../components/productHome/productTable';
import { router } from 'expo-router';

export type Page = "productos" | "ofertas";

const ProductHome = () => {
  useSetRouteName('Productos');
  const data: Page[] = ["productos", "ofertas"];
  const page: Page = "productos";

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Tabs 
          page={page}
          setPage={router.replace}
          data={data}
        />
      </View>
      <ProductTable />
    </View>
  )
}

export default ProductHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingHorizontal: 20
  }
})