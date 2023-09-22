import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Venta } from '../../interfaces/venta'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import Icon from '../global/icon'
import { shadows } from '../../styles/shadows'
import { useCronometer } from '../../hooks/useCronometer'

interface Props {
  venta: Venta
}

const PedidoActualCard = ({ venta }: Props) => {
  const [open, setOpen] = useState(false);
  
  const { restanteString, isActive } = useCronometer(venta.fecha, venta.estado === "pendiente" ? 20 : 120);

  const total = venta.detalles.reduce((suma, detalle) => {
    suma += detalle.cantidad * detalle.precioUnitario;
    return suma;
  }, 0);
  const { nombre, foto, rol } = venta.detalles[0].productoActivo.producto.usuario;
  let hours = new Date().getTime() - new Date(venta.fecha).getTime();
  hours /= (1000 * 60 * 60);

  let estado = venta.estado;
  estado = !isActive && estado === "pendiente" ? "sin respuesta" : estado
  const showEstado = estado.charAt(0).toUpperCase() + estado.slice(1)

  return (
    <View style={styles.container} key={venta.id}>
      <View style={styles.allContainer}>
        <View style={styles.topContainer}>
          <Image style={styles.foto} source={{ uri: foto }} />
          <View style={styles.textsContainer}>
            <FontedText numberOfLines={1} weight={700} style={styles.nameText}>{nombre}</FontedText>
            <View style={styles.bottomTextContainer}>
              <FontedText 
                weight={600}
                style={styles.estadoText((venta.estado === "aceptado" || venta.estado === "recogido") ? colors.success : colors.primary500)}
              >{showEstado}</FontedText>
              <FontedText style={styles.horasText}>Precio total: Bs. {total}</FontedText>
            </View>
          </View>
        </View>
        <FontedText style={styles.totalText}>
          {
            isActive ? 
              venta.estado === "recogido" ?
              `¡Muchas gracias, disfruta tu pedido!`
              : venta.estado === "aceptado" ?
                rol === "restaurante" ? 
                <View style={styles.totalView}>
                  <FontedText style={styles.totalText}>¡Pedido aceptado, pasa a recogerlo al restaurante!</FontedText>
                  <TouchableOpacity
                    onPress={() => {
                      const { latitud, longitud } = venta.detalles[0].productoActivo.producto.usuario.ubicacionActual
                      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitud}%2C${longitud}`)
                    }}
                  >
                    <FontedText style={styles.buttonText}>¿Cómo llegar?</FontedText>
                  </TouchableOpacity>
                </View> : 
                <Text>¡El proveedor aceptó tu pedido correctamente!</Text>
              : venta.estado === "rechazado" ?
              `Lo lamentamos, el restaurante rechazó tu pedido...`
              : 
              `Gracias, atenderemos tu pedido en menos de ${restanteString}` 
            : hours < 1 ? `Hace menos de una hora` : `Hace ${Math.floor(hours)} horas`
          }
        </FontedText>
      </View>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.verDetallesContainer}>
        <FontedText weight={600} style={styles.verDetallesText}>{open ? "Ocultar" : "Ver"} detalles {!open && `(${venta.detalles.length})`}</FontedText>
        <Icon name={`chevron-${open ? "up" : "down"}-outline`} size={12} color={colors.gray900} />
      </TouchableOpacity>
      {
        open && 
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={styles.detallesContainer}
          nestedScrollEnabled={true} 
        >
          {venta.detalles.map(detalle => (
            <View key={detalle.id} style={styles.allContainer}>
              <View style={styles.topContainer}>
                <Image style={styles.foto} source={{ uri: detalle.productoActivo.producto.foto }} />
                <View style={styles.textsContainer}>
                  <FontedText numberOfLines={1} weight={700} style={styles.nameText}>{detalle.productoActivo.producto.nombre}</FontedText>
                  <View style={styles.bottomTextContainer}>
                    <FontedText style={styles.horasText}>{detalle.cantidad} Unidades</FontedText>
                    <FontedText style={styles.horasText}>Total: Bs. {detalle.precioUnitario * detalle.cantidad}</FontedText>
                  </View>
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

const styles = StyleSheet.create<any>({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    ...shadows.shadow400
  },
  allContainer: {
    padding: 16,
    gap: 12
  },
  topContainer: {
    flexDirection: "row",
    gap: 16,
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
  estadoText: (color: string) => ({
    color: color
  }),
  horasText: {
    color: colors.gray500
  },
  totalView: {
    flexDirection: "row",
    alignItems: "center"
  },
  totalText: {
    color: colors.gray500,
    fontSize: 14
  },
  buttonText: {
    color: colors.primary500,
    fontSize: 14
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
    maxHeight: 120
  }
})