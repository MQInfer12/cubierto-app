import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSetRouteName } from '../../context/routeName';
import Tabs from '../../components/global/tabs';
import ProductTable from '../../components/productHome/productTable';

type Page = "Productos" | "Ofertas";

const ProductHome = () => {
  useSetRouteName('Productos');
  const [page, setPage] = useState<Page>("Productos");
  const data: Page[] = ["Productos", "Ofertas"];

  return (
    <View style={styles.container}>
      <Tabs 
        page={page}
        setPage={setPage}
        data={data}
      />
      {
        page === "Productos" &&
        <ProductTable />
      }
    </View>
  )
}

export default ProductHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})