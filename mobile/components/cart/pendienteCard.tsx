import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Venta, VentaEstado } from '../../interfaces/venta'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import Icon from '../global/icon'
import { shadows } from '../../styles/shadows'
import { useCronometer } from '../../hooks/useCronometer'
import { Dropdown } from 'react-native-element-dropdown'
import { sendRequest } from '../../utilities/sendRequest'

interface Props {
  venta: Venta
}

interface Data {
  label: string,
  value: VentaEstado
}

const PendienteCard = ({ venta }: Props) => {
  const [open, setOpen] = useState(false);
  const { restanteString, isActive } = useCronometer(venta.fecha, 20);
  const [estado, setEstado] = useState<VentaEstado>(venta.estado);

  const total = venta.detalles.reduce((suma, detalle) => {
    suma += detalle.cantidad * detalle.precioUnitario;
    return suma;
  }, 0);
  let hours = new Date().getTime() - new Date(venta.fecha).getTime();
  hours /= (1000 * 60 * 60);

  const cambiarEstado = async (nuevoEstado: VentaEstado) => {
    const res = await sendRequest(`venta/estado/${venta.id}`, {
      estado: nuevoEstado
    }, {
      method: "PATCH"
    });
    if(res) {
      setEstado(nuevoEstado);
    }
  }

  const handleChangeState = (value: VentaEstado) => {
    Alert.alert("¿Estás seguro?", `No podrás cambiar tu decisión (${value})`, [{
      text: "Cancelar",
      onPress: () => {
        return;
      }
    }, {
      text: "Continuar",
      onPress: () => {
        cambiarEstado(value);
      }
    }]);
  }

  let data: Data[] = [];
  if(estado === "pendiente") {
    data = [{
      label: "Aceptado",
      value: "aceptado"
    },{
      label: "Rechazado",
      value: "rechazado"
    }]
  } else if (estado === "aceptado") {
    data = [{
      label: "Recogido",
      value: "recogido"
    }]
  }

  return (
    <View style={styles.container} key={venta.id}>
      <View style={styles.allContainer}>
        <View style={styles.topContainer}>
          <Image style={styles.foto} source={{ uri: venta.usuario.foto }} />
          <View style={styles.textsContainer}>
            <FontedText numberOfLines={1} weight={700} style={styles.nameText}>Para: {venta.usuario.nombre}</FontedText>
            <View style={styles.bottomTextContainer}>
              <FontedText style={styles.horasText}>Precio total: Bs. {total}</FontedText>
            </View>
          </View>
        </View>
        <FontedText style={styles.totalText} weight={600}>
          {
            estado === "aceptado" ?
            `¡Pedido aceptado! espera contento a tu cliente, pronto llegará`
            : estado === "recogido" ?
            <View style={styles.totalView}>
              <FontedText weight={600} style={styles.totalText}>¡Pedido recogido! mira tus detalles en nuestra </FontedText>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`https://cubierto.cidtec-uc.com`)
                }}
              >
                <FontedText style={styles.buttonText} weight={600}>aplicación web</FontedText>
              </TouchableOpacity>
            </View>
            : estado === "rechazado" ?
            `Pedido rechazado, se borrará de la lista`
            : isActive ? 
            `Tienes ${restanteString} para atender este pedido` 
            : 
            `Pedido sin responder, se borrará de la lista`
          }
        </FontedText>
        {
          (isActive && (estado !== "rechazado" && estado !== "recogido")) &&
          <Dropdown
            data={data}
            style={styles.dropdown}
            labelField="label"
            valueField="value"
            onChange={item => handleChangeState(item.value)}
            placeholder={estado.charAt(0).toUpperCase() + estado.slice(1)}
            fontFamily='Biko400'
          />
        }
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

export default PendienteCard

const styles = StyleSheet.create({
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
  estadoText: {
    color: colors.primary500
  },
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
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: colors.gray900,
    borderColor: colors.gray500,
    borderRadius: 8,
    height: 46
  }
})