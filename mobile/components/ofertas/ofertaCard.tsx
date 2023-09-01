import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { Producto } from '../../interfaces/producto'
import FontedText from '../global/fontedText'
import Icon from '../global/icon'
import { sendRequest } from '../../utilities/sendRequest'
import { useUser } from '../../context/user'
import { ProductoActivo } from '../../interfaces/productoActivo'
import { useGet } from '../../hooks/useGet'
import { useCronometer } from '../../hooks/useCronometer'

interface Props {
  oferta: ProductoActivo
}

const OfertaCard = ({ oferta }: Props) => {
  const { restanteString } = useCronometer(oferta.fecha, oferta.tiempo);

  return (
    <View style={styles.ofertaCard}>
      <View style={styles.productData}>
        <Image style={styles.productFoto} source={{ uri: oferta.producto.foto }} />
        <View style={styles.productTexts}>
          <FontedText numberOfLines={1} weight={700} style={styles.name}>{oferta.producto.nombre}</FontedText>
          <FontedText style={styles.description}>{oferta.cantidad} Unidades - {restanteString}</FontedText>
        </View>
      </View>
    </View>
  )
}

export default OfertaCard

const styles = StyleSheet.create({
  ofertaCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    ...shadows.shadow400
  },
  productData: {
    flexDirection: "row",
    flex: 1,
  },
  productFoto: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 16
  },
  productTexts: {
    height: "100%",
    justifyContent: "space-evenly"
  },
  name: {
    color: colors.gray900,
    fontSize: 16,
    width: 192
  },
  description: {
    color: colors.gray600
  }
})