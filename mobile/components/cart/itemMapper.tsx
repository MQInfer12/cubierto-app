import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useCart } from '../../context/cart'
import ItemCard from './itemCard';

const ItemMapper = () => {
  const { items } = useCart();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
    paddingBottom: 20
  }
})