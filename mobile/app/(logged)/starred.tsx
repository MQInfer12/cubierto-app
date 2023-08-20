import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontedText from '../../components/global/fontedText'
import { colors } from '../../styles/colors'
import NothingHere from '../../components/global/nothingHere'
import { useSetRouteName } from '../../context/routeName'

const Starred = () => {
  useSetRouteName('Mis favoritos');

  return (
    <View style={styles.container}>
      <NothingHere text="¡No marcaste nada como favorito!" />
    </View>
  )
}

export default Starred

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
})