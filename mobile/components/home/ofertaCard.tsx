import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ProductoActivo } from '../../interfaces/productoActivo'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

interface Props {
  oferta: ProductoActivo
}

const OfertaCard = ({ oferta }: Props) => {
  const cantidadVendida = oferta.detalleVentas.reduce((suma, detalle) => {
    suma += detalle.cantidad;
    return suma;
  }, 0);
  const maxproducts = oferta.cantidad - cantidadVendida;

  if(maxproducts <= 0) return null; 
  return (
    <TouchableOpacity onPress={() => router.push(`verOferta/${oferta.id}`)} style={styles.cardContainer}>
      <View>
        <Image style={styles.cardImage} source={{ uri: oferta.producto.foto }} />
        <LinearGradient 
          style={styles.gradient}
          colors={['rgba(0, 0, 0, 0)', colors.gray900]}
          locations={[0.5, 1]}
        />
      </View>
      <View style={styles.cardTextContainer}>
        <TouchableOpacity onPress={() => router.push(`restaurante/${oferta.producto.usuario.id}`)}>
          <View style={styles.profileContainer}>
            <Image style={styles.profilePic} source={{ uri: oferta.producto.usuario.foto }} />
            <FontedText numberOfLines={1} style={styles.profileText} weight={600}>{oferta.producto.usuario.nombre}</FontedText>
          </View>
        </TouchableOpacity>
        <FontedText weight={700} style={styles.cardName} numberOfLines={1}>{oferta.producto.nombre}</FontedText>
        <View style={styles.pricesContainer}>
          <FontedText weight={600} style={styles.cardPrice}>Bs. {oferta.precioDescontado}</FontedText>
          <FontedText weight={400} style={styles.oldPriceText}>Bs. {oferta.producto.precio}</FontedText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default OfertaCard

const styles = StyleSheet.create({
  cardContainer: {
    height: 240,
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
  }
})