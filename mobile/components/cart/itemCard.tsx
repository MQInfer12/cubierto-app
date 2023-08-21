import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CartItem } from '../../context/cart'
import { colors } from '../../styles/colors'
import FontedText from '../global/fontedText'
import NumberInput from '../global/numberInput'

interface Props {
  item: CartItem
}

const ItemCard = ({ item }: Props) => {
  const [cantidad, setCantidad] = useState(item.cantidad);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.productoActivo.producto.foto }} />
      <View style={styles.rightContainer}>
        <View style={styles.upTextContainer}>
          <FontedText style={styles.nameText} weight={700}>{item.productoActivo.producto.nombre}</FontedText>
          <FontedText style={styles.priceText}>Bs. {item.productoActivo.precioDescontado * cantidad}</FontedText>
        </View>
        <View style={styles.bottomContainer}>
          <FontedText style={styles.editarText}>Editar</FontedText>
          <View style={styles.inputNumberContainer}>
            <NumberInput 
              value={cantidad}
              setValue={setCantidad}
              min={1}
              max={item.productoActivo.cantidad}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    gap: 12,
    flexDirection: "row"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8
  },
  rightContainer: {
    justifyContent: "space-between",
    flex: 1
  },
  upTextContainer: {
    width: "100%",
    gap: 2
  },
  nameText: {
    color: colors.gray900,
    fontSize: 18
  },
  priceText: {
    color: colors.gray600,
    fontSize: 16,
    alignSelf: "flex-end"
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  inputNumberContainer: {
    width: 128
  },
  editarText: {
    color: colors.gray500
  }
})