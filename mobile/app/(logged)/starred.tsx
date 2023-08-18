import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontedText from '../../components/global/fontedText'
import { colors } from '../../styles/colors'
import NothingHere from '../../components/global/nothingHere'

const Starred = () => {
  return (
    <View style={styles.container}>
      <FontedText style={styles.title}>Mis favoritos</FontedText>
      <NothingHere text="¡No marcaste nada como favorito!" />
    </View>
  )
}

export default Starred

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    flex: 1
  },
  title: {
    fontSize: 12,
    color: colors.gray600
  },
})