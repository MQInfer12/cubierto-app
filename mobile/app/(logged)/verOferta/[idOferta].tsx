import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useSetRouteName } from '../../../context/routeName';

const VerOferta = () => {
  useSetRouteName('Ver producto');
  const { idOferta } = useLocalSearchParams();

  return (
    <View>
      <Text>{idOferta}</Text>
    </View>
  )
}

export default VerOferta

const styles = StyleSheet.create({})