import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { VentaEstado } from '../../interfaces/venta'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import Icon from '../global/icon'
import { shadows } from '../../styles/shadows'
import { Dropdown } from 'react-native-element-dropdown'
import { Donacion, DonacionEstado } from '../../interfaces/donacion'
import { formatFecha } from '../../utilities/formatDate'
import { sendRequest } from '../../utilities/sendRequest'
import { useUser } from '../../context/user'

interface Props {
  donacion: Donacion
}

interface Data {
  label: string,
  value: DonacionEstado
}

const MiDonacionCard = ({ donacion }: Props) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [estado, setEstado] = useState(user?.rol === "beneficiario" ? donacion.estadoBeneficiario : donacion.estadoDonador);
  const otherEstado = user?.rol === "beneficiario" ? donacion.estadoDonador : donacion.estadoBeneficiario;
  const data: Data[] = [{
    label: "Aceptado",
    value: "aceptado"
  }]

  const handleAceptar = async () => {
    const res = await sendRequest(`donacion/${user?.rol}/${donacion.id}`, null, {
      method: "PATCH"
    });
    if(res) {
      setEstado("aceptado");
    }
  }

  const showEstado = estado.charAt(0).toUpperCase() + estado.slice(1);
  const getColor = (estado: DonacionEstado) => {
    return estado === "aceptado" ? colors.success : colors.primary500;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.allContainer}>
        <View style={styles.topContainer}>
          <Image style={styles.foto} source={{ 
            uri: user?.rol === "beneficiario" ? donacion.donador.foto : donacion.beneficiario.foto
          }} />
          <View style={styles.textsContainer}>
            <FontedText numberOfLines={1} weight={700} style={styles.nameText}>
              {
                user?.rol === "beneficiario" ?
                `De: ${donacion.donador.nombre}` :
                `Para: ${donacion.beneficiario.nombre}`
              }
              
            </FontedText>
            <View style={styles.bottomTextContainer}>
              <FontedText style={styles.horasText}>{formatFecha(donacion.fecha)}</FontedText>
              <FontedText 
                style={styles.estadoText(getColor(user?.rol === "beneficiario" ? otherEstado : estado))}
              >
                Estado del donador: {user?.rol === "beneficiario" ? otherEstado : estado}
              </FontedText>
              <FontedText 
                style={styles.estadoText(getColor(user?.rol === "beneficiario" ? estado : otherEstado))}
              >
                Estado del beneficiario: {user?.rol === "beneficiario" ? estado : otherEstado}
              </FontedText>
            </View>
          </View>
        </View>
        {
          (estado === "aceptado" && otherEstado === "aceptado") &&
          <FontedText style={styles.totalText} weight={600}>
            ¡Muchas gracias! 
          </FontedText>
        }
        {
          estado === "pendiente" &&
          <Dropdown
            data={data}
            style={styles.dropdown}
            labelField="label"
            valueField="value"
            onChange={handleAceptar}
            placeholder={showEstado}
            fontFamily='Biko400'
          />
        }
      </View>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.verDetallesContainer}>
        <FontedText weight={600} style={styles.verDetallesText}>{open ? "Ocultar" : "Ver"} detalles {!open && `(${donacion.detalles.length})`}</FontedText>
        <Icon name={`chevron-${open ? "up" : "down"}-outline`} size={12} color={colors.gray900} />
      </TouchableOpacity>
      {
        open && 
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={styles.detallesContainer}
          nestedScrollEnabled={true} 
        >
          {donacion.detalles.map(detalle => (
            <View key={detalle.id} style={styles.allContainer}>
              <View style={styles.topContainer}>
                <Image style={styles.foto} source={{ uri: detalle.producto.foto }} />
                <View style={styles.textsContainer}>
                  <FontedText numberOfLines={1} weight={700} style={styles.nameText}>{detalle.producto.nombre}</FontedText>
                  <View style={styles.bottomTextContainer}>
                    <FontedText style={styles.horasText}>{detalle.cantidad} Unidades</FontedText>
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

export default MiDonacionCard

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
    fontSize: 16,
    marginBottom: 4
  },
  bottomTextContainer: {
    justifyContent: "space-between",
    gap: 4
  },
  estadoText: (color: string) => ({
    color: color
  }),
  horasText: {
    color: colors.gray500
  },
  totalText: {
    color: colors.gray500,
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