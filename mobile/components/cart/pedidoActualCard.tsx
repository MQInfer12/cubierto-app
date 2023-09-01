import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Venta } from '../../interfaces/venta'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import Icon from '../global/icon'
import { shadows } from '../../styles/shadows'

interface Props {
  venta: Venta
}

const PedidoActualCard = ({ venta }: Props) => {
  const [open, setOpen] = useState(false);
  let hours = new Date().getTime() - new Date(venta.fecha).getTime();
  hours /= 1000;
  hours /= 60;
  hours /= 60;
  const { nombre, foto } = venta.detalles[0].productoActivo.producto.usuario;

  return (
    <View style={styles.container} key={venta.id}>
      <View style={styles.topContainer}>
        <Image style={styles.foto} source={{ uri: foto }} />
        <View style={styles.textsContainer}>
          <FontedText numberOfLines={1} weight={700} style={styles.nameText}>{nombre}</FontedText>
          <View style={styles.bottomTextContainer}>
            <FontedText style={styles.estadoText}>{venta.estado}</FontedText>
            <FontedText style={styles.horasText}>hace {Math.floor(hours)} horas</FontedText>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.verDetallesContainer}>
        <FontedText weight={600} style={styles.verDetallesText}>Ver detalles</FontedText>
        <Icon name='chevron-down-outline' size={12} color={colors.gray900} />
      </TouchableOpacity>
      {
        open && 
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={styles.detallesContainer}
          nestedScrollEnabled={true} 
        >
          {venta.detalles.map(detalle => (
            <View style={styles.topContainer}>
              <Image style={styles.foto} source={{ uri: detalle.productoActivo.producto.foto }} />
              <View style={styles.textsContainer}>
                <FontedText numberOfLines={1} weight={700} style={styles.nameText}>{detalle.productoActivo.producto.nombre}</FontedText>
                <View style={styles.bottomTextContainer}>
                  <FontedText style={styles.horasText}>{detalle.cantidad} Unidades</FontedText>
                  <FontedText style={styles.horasText}>Total: {detalle.precioUnitario * detalle.cantidad}</FontedText>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      }
    </View>
  )
}

export default PedidoActualCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    ...shadows.shadow400
  },
  topContainer: {
    padding: 16,
    flexDirection: "row",
    gap: 16,
    borderBottomColor: colors.gray400,
    borderBottomWidth: 1
  },
  foto: {
    height: 56,
    width: 56,
    borderRadius: 8
  },
  textsContainer: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  nameText: {
    color: colors.gray900,
    fontSize: 16
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  estadoText: {
    color: colors.primary500
  },
  horasText: {
    color: colors.gray500
  },
  verDetallesContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    gap: 8,
    flexDirection: "row",
    backgroundColor: colors.gray300
  },
  verDetallesText: {
    color: colors.gray900
  },
  detallesContainer: {
    borderTopColor: colors.gray400,
    borderTopWidth: 1,
    height: 120
  }
})