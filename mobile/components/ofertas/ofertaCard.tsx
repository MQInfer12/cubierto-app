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

interface Props {
  oferta: ProductoActivo
}

const OfertaCard = ({ oferta }: Props) => {
  const { removeProducto } = useUser();
  const [tiempoRestante, setTiempoRestante] = useState<null | number>(() => {
    const ahora = new Date();
    const fecha = new Date(oferta.fecha);
    const diff = ahora.getTime() - fecha.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const segundosRestantes = (oferta.tiempo - minutes) * 60;
    const redondear = Math.floor(segundosRestantes);
    return redondear;
  });

  useEffect(() => {
    let interval: any;
    if(tiempoRestante !== null) {
      interval = setInterval(() => {
        setTiempoRestante(old => {
          if(old !== null) {
            return old - 1
          } 
          return old;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    }
  }, [tiempoRestante]);

  let horas = 0;
  let minutos = 0;
  let segundos = 0;
  let restanteString = "--:--:--";
  let isActive = false;
  if(tiempoRestante) {
    horas = Math.floor(tiempoRestante / 3600);
    minutos = Math.floor((tiempoRestante / 60) % 60);
    const minutosConCero = minutos < 10 ? "0" + minutos : minutos;
    segundos = tiempoRestante % 60;
    const segundosConCero = segundos < 10 ? "0" + segundos : segundos;
    restanteString = horas + ":" + minutosConCero + ":" + segundosConCero;
    isActive = tiempoRestante > 0;
  }
  
  const handleDelete = async () => {
    const res = await sendRequest<Producto>(`productoActivo/${oferta.id}`, null, {
      method: "DELETE"
    });
    if(res) {
      removeProducto(res.data);
      Alert.alert("Se eliminó el producto correctamente");
    }
  }

  const handleAlertDelete = () => {
    Alert.alert("¿Estás seguro?", "Se eliminará este producto", [{
      text: "Cancelar",
      onPress: () => {
        return;
      }
    }, {
      text: "Continuar",
      onPress: handleDelete
    }]);
  }

  return (
    <View style={styles.ofertaCard}>
      <View style={styles.productData}>
        <Image style={styles.productFoto} source={{ uri: oferta.producto.foto }} />
        <View style={styles.productTexts}>
          <FontedText numberOfLines={1} weight={700} style={styles.name}>{oferta.producto.nombre}</FontedText>
          <FontedText style={styles.description}>{oferta.cantidad} Unidades - {restanteString}</FontedText>
        </View>
      </View>
      <View style={styles.buttons}>
        {/* <TouchableOpacity onPress={() => router.push(`productForm/${producto.id}`)}>
          <Icon name='pencil-outline' color={colors.gray500} size={18} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => {}}>
          <Icon name='trash-outline' color={colors.primary500} size={18} />
        </TouchableOpacity> */}
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
  },
  buttons: {
    flexDirection: "row",
    gap: 12
  }
})