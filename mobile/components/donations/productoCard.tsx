import { StyleSheet, View, Image } from 'react-native'
import React, { useState } from 'react'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { LinearGradient } from 'expo-linear-gradient'
import { Producto } from '../../interfaces/producto'
import NumberInput from '../global/numberInput'
import Button from '../global/button'
import { CartItem } from './donacionRestaurante'

interface Props {
  producto: Producto
  cart: CartItem[]
  addToCart: (item: CartItem) => void
}

const ProductoCard = ({ producto, cart, addToCart }: Props) => {
  const [contador, setContador] = useState(1);

  if(!producto) return null;
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image style={styles.cardImage} source={{ uri: producto.foto }} />
        <LinearGradient 
          style={styles.gradient}
          colors={['rgba(0, 0, 0, 0)', colors.gray900]}
          locations={[0.5, 1]}
        />
      </View>
      <View style={styles.cardTextContainer}>
        <FontedText weight={700} style={styles.cardName} numberOfLines={1}>{producto.nombre}</FontedText>
        <View style={styles.controlsContainer}>
          <NumberInput 
            min={1}
            value={contador}
            setValue={setContador}
            max={1000}
            disabled={!!cart.find(item => item.producto.id === producto.id)}
          />
          <Button 
            disabled={!!cart.find(item => item.producto.id === producto.id)}
            onPress={() => addToCart({
              cantidad: contador,
              producto: producto
            })}
          >Añadir</Button>
        </View>
      </View>
    </View>
  )
}

export default ProductoCard

const styles = StyleSheet.create({
  cardContainer: {
    width: 260,
    backgroundColor: colors.white,
    borderRadius: 16,
    ...shadows.shadow400
  },
  cardImage: {
    height: 160,
    borderRadius: 16
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
    padding: 14
  },
  cardName: {
    color: colors.gray900,
    fontSize: 18
  },
  cardPrice: {
    color: colors.gray500,
    fontSize: 14
  },
  pricesContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },
  oldPriceText: {
    color: colors.gray500,
    fontSize: 10,
    textDecorationLine: "line-through"
  },
  profilePic: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.8
  },
  profileContainer: {
    position: "absolute",
    left: -8,
    top: -48,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    width: 200
  },
  profileText: {
    color: colors.white,
    fontSize: 12
  },
  controlsContainer: {
    width: 150,
    alignSelf: "center",
    gap: 8
  }
})