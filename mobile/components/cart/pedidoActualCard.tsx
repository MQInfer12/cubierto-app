import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Venta } from '../../interfaces/venta'
import FontedText from '../global/fontedText'

interface Props {
  venta: Venta
}

const PedidoActualCard = ({ venta }: Props) => {
  let hours = new Date().getTime() - new Date(venta.fecha).getTime();
  hours /= 1000;
  hours /= 60;
  hours /= 60;
  const nombreRestaurante = venta.detalles[0].productoActivo.producto.usuario.nombre;
  return (
    <View key={venta.id}>
      <FontedText>Hace: {hours} horas de {nombreRestaurante}</FontedText>
      <FontedText>Con:</FontedText>
      {venta.detalles.map(detalle => (
        <FontedText key={detalle.id}>{detalle.cantidad} {detalle.productoActivo.producto.nombre}</FontedText>
      ))}
    </View>
  )
}

export default PedidoActualCard

const styles = StyleSheet.create({})