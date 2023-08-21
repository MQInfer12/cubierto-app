import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSetRouteName } from '../../../context/routeName';
import { useLocalSearchParams } from 'expo-router';
import { useGet } from '../../../hooks/useGet';

const VerRestaurante = () => {
  useSetRouteName('Ver producto');
  const { idRestaurante } = useLocalSearchParams();
  const { res } = useGet(`usuario/${idRestaurante}`);

  return (
    <View>
      <Text>VerRestaurante</Text>
    </View>
  )
}

export default VerRestaurante

const styles = StyleSheet.create({})