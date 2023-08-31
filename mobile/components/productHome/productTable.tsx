import { ScrollView, StyleSheet,  View } from 'react-native'
import React from 'react'
import Button from '../global/button'
import { useUser } from '../../context/user'
import { router } from 'expo-router'
import ProductCard from './productCard'

const ProductTable = () => {
  const { user } = useUser();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button onPress={() => router.push("productForm")}>Añadir</Button>
      <View style={styles.products}>
        {user?.productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </View>
    </ScrollView>
  )
}

export default ProductTable

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 20,
    paddingHorizontal: 20
  },
  products: {
    width: "100%",
    gap: 20,
  },
})