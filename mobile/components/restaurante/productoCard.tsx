import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { LinearGradient } from 'expo-linear-gradient'
import { Producto } from '../../interfaces/producto'

interface Props {
  producto: Producto
}

const ProductoCard = ({ producto }: Props) => {
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
        <View style={styles.pricesContainer}>
          <FontedText weight={600} style={styles.cardPrice}>Bs. {producto.precio}</FontedText>
        </View>
      </View>
    </View>
  )
}

export default ProductoCard

const styles = StyleSheet.create({
  cardContainer: {
    height: 240,
    width: 260,
    backgroundColor: colors.white,
    borderRadius: 16,
    opacity: 0.6,
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
  }
})