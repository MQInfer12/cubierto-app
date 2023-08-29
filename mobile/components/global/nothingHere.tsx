import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import FontedText from './fontedText'

interface Props {
  text: string
  type?: "sad" | "happy"
}

const NothingHere = ({ text, type = "sad" }: Props) => {
  return (
    <View style={styles.nothingContainer}>
      <Image source={
        type === "sad" ?
        require(`../../assets/images/sadMask.png`) :
        type === "happy" &&
        require(`../../assets/images/happyMask.png`)
      } style={styles.image}/>
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
  },
  image: {
    width: 96,
    height: 96,
    opacity: 0.8
  }
})