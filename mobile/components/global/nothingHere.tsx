import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import FontedText from './fontedText'

interface Props {
  text: string
}

const NothingHere = ({ text }: Props) => {
  return (
    <View style={styles.nothingContainer}>
      <Image source={require('../../assets/images/sadMask.png')} />
      <FontedText weight={600} style={styles.nothingText}>{text}</FontedText>
    </View>
  )
}

export default NothingHere

const styles = StyleSheet.create({
  nothingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },
  nothingText: {
    fontSize: 16,
    color: colors.primary500
  }
})