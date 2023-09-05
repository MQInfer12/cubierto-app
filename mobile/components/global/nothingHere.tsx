import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import FontedText from './fontedText'

interface Props {
  text: string
  subtext?: string
  type?: "sad" | "happy" | "loading"
}

const NothingHere = ({ text, subtext, type = "sad" }: Props) => {
  return (
    <View style={styles.nothingContainer}>
      {type === "loading" ?
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large"
            color={colors.primary500}
          />
        </View>
      : 
        <Image 
          source={
            type === "sad" ?
            require(`../../assets/images/sadMask.png`) :
            type === "happy" &&
            require(`../../assets/images/happyMask.png`)
          } 
          style={styles.image}
        />
      }
      <View style={styles.textContainer}>
        <FontedText weight={600} style={styles.nothingText}>{text}</FontedText>
        {subtext && <FontedText weight={400} style={styles.subtitle}>{subtext}</FontedText>}
      </View>
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
  subtitle: {
    fontSize: 16,
    color: colors.gray600
  },
  image: {
    width: 96,
    height: 96,
    opacity: 0.8
  },
  loadingContainer: {
    height: 96,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: "center",
    gap: 8
  }
})