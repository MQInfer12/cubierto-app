import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSetRouteName } from '../../../context/routeName';
import { router, useLocalSearchParams } from 'expo-router';
import { useGet } from '../../../hooks/useGet';
import FontedText from '../../../components/global/fontedText';
import Usuario from '../../../interfaces/usuario';

const VerRestaurante = () => {
  useSetRouteName('Ver restaurante');
  const { idRestaurante } = useLocalSearchParams();
  const { res } = useGet<Usuario>(`usuario/${idRestaurante}`);

  return (
    <View>
      <FontedText>Restaurante: {res?.data.nombre}</FontedText>
      {res?.data.productos.map(producto => (
        <TouchableOpacity onPress={() => router.push(`/verOferta`)}>
          <FontedText>{producto.nombre}</FontedText>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default VerRestaurante

const styles = StyleSheet.create({})