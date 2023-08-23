import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { useCart } from '../../context/cart'
import ItemCard from './itemCard';
import Button from '../global/button';
import { router } from 'expo-router';

const ItemMapper = () => {
  const { items } = useCart();

  const handlePedir = () => {
    console.log(items);
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.buttons}>
        <Button type="secondary" onPress={() => router.push("/home")}>Añadir más productos</Button>
        <Button onPress={handlePedir}>Pedir</Button>
      </View>
      {items.map((item, i) => (
        <ItemCard key={i} item={item} />
      ))}
    </ScrollView>
  )
}

export default ItemMapper

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 20,
    alignItems: "center"
  },
  buttons: {
    flexDirection: "row",
    gap: 16
  }
})