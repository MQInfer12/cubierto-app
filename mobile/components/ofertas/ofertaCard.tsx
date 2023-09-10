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
import { formatFecha } from '../../utilities/formatDate'

interface Props {
  oferta: ProductoActivo
  getData: () => void
}

const OfertaCard = ({ oferta, getData }: Props) => {
  const { restanteString, isActive } = useCronometer(oferta.fecha, oferta.tiempo);

  const handleDelete = async () => {
    const res = await sendRequest<Producto>(`productoActivo/${oferta.id}`, null, {
      method: "DELETE"
    });
    if(res) {
      getData();
      Alert.alert("Se eliminó el producto correctamente");
    }
  }

  const handleAlertDelete = () => {
    Alert.alert("¿Estás seguro?", "Se eliminará esta oferta de las donaciones", [{
      text: "Cancelar",
      onPress: () => {
        return;
      }
    }, {
      text: "Continuar",
      onPress: handleDelete
    }]);
  }

  const cantidadVendida = oferta.detalleVentas.reduce((suma, detalle) => {
    suma += detalle.cantidad;
    return suma;
  }, 0);
  const maxproducts = (oferta.cantidad || 1) - (cantidadVendida || 0);
  const agotado = maxproducts <= 0;

  if(agotado) return null;
  return (
    <View style={styles.ofertaCard}>
      <View style={styles.productData}>
        <Image style={styles.productFoto} source={{ uri: oferta.producto.foto }} />
        <View style={styles.productTexts}>
          <FontedText style={styles.fecha}>{formatFecha(oferta.fecha)}</FontedText>
          <FontedText numberOfLines={1} weight={700} style={styles.name}>{oferta.producto.nombre}</FontedText>
          <FontedText style={styles.description}>{maxproducts} Restantes  - {isActive ? restanteString : "En donaciones..."}</FontedText>
        </View>
      </View>
      {
        !isActive &&
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleAlertDelete}>
            <Icon name='trash-outline' color={colors.primary500} size={18} />
          </TouchableOpacity>
        </View>
      }
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
    justifyContent: "space-between"
  },
  name: {
    color: colors.gray900,
    fontSize: 16,
    width: 192
  },
  description: {
    color: colors.gray600
  },
  fecha: {
    color: colors.gray600,
    fontSize: 10
  },
  buttons: {
    flexDirection: "row",
    gap: 12
  }
})