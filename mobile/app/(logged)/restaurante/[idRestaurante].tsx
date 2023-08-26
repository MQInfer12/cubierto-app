import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSetRouteName } from '../../../context/routeName';
import { router, useLocalSearchParams } from 'expo-router';
import { useGet } from '../../../hooks/useGet';
import FontedText from '../../../components/global/fontedText';
import { RestauranteResponse } from '../../../interfaces/pages/restaurante';

const VerRestaurante = () => {
  useSetRouteName('Ver restaurante');
  const { idRestaurante } = useLocalSearchParams();
  const { res } = useGet<RestauranteResponse>(`restaurante/${idRestaurante}`);

  return (
    <View>
      <FontedText>Restaurante: {res?.data.restaurante.nombre}</FontedText>
      <FontedText>Productos:</FontedText>
      {res?.data.restaurante.productos.map(producto => {
        const oferta = res.data.ofertasActivas.find(oferta => oferta.productoId === producto.id);
        return (
          oferta ?
          <TouchableOpacity key={producto.id} onPress={() => router.push(`/verOferta/${oferta.id}`)}>
            <FontedText style={styles.text(true)}>{producto.nombre}</FontedText>
          </TouchableOpacity> :
          <FontedText style={styles.text(false)} key={producto.id}>{producto.nombre}</FontedText>
        )
      })}
    </View>
  )
}

export default VerRestaurante

const styles = StyleSheet.create<any>({
  text: (active: boolean) => ({
    opacity: active ? 1 : 0.5
  })
})