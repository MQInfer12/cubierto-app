import { Image, StyleSheet, View } from 'react-native'
import React, { forwardRef, useEffect, useState } from 'react'
import { CartItem, useCart } from '../../context/cart'
import { colors } from '../../styles/colors'
import FontedText from '../global/fontedText'
import NumberInput from '../global/numberInput'

interface Props {
  item: CartItem
}

const ItemCard = ({ item }: Props) => {
  const [cantidad, setCantidad] = useState(item.cantidad);
  const { removeItem, changeQuantity } = useCart();

  useEffect(() => {
    setCantidad(item.cantidad);
  }, [item.cantidad]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.productoActivo.producto.foto }} />
      <View style={styles.rightContainer}>
        <View style={styles.upTextContainer}>
          <FontedText numberOfLines={1} style={styles.nameText} weight={700}>{item.productoActivo.producto.nombre}</FontedText>
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
              handleRemove={() => removeItem(item.productoActivo.id)}
              handleAdd={() => changeQuantity(item.productoActivo.id, 1)}
              handleSubstract={() => changeQuantity(item.productoActivo.id, -1)}
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
    fontSize: 14,
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