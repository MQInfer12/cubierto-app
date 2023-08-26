import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ProductoActivo } from '../../interfaces/productoActivo'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { router } from 'expo-router'

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
      <Image style={styles.cardImage} source={{ uri: oferta.producto.foto }} />
      <View style={styles.cardTextContainer}>
        <FontedText weight={700} style={styles.cardName}>{oferta.producto.nombre}</FontedText>
        <FontedText weight={600} style={styles.cardPrice}>Bs. {oferta.precioDescontado}</FontedText>
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
  }
})