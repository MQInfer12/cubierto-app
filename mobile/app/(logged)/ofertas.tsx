import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSetRouteName } from '../../context/routeName';
import Tabs from '../../components/global/tabs';
import { router } from 'expo-router';
import { Page } from './productos';
import OfertasTable from '../../components/ofertas/ofertasTable';

const ProductHome = () => {
  useSetRouteName('Ofertas');
  const data: Page[] = ["productos", "ofertas"];
  const page: Page = "ofertas";

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Tabs 
          page={page}
          setPage={router.replace}
          data={data}
        />
      </View>
      <OfertasTable />
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