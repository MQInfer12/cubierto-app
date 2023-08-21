import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './icon'
import { colors } from '../../styles/colors'
import FontedText from './fontedText'

interface Props {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>,
  min: number
  max: number
}

const NumberInput = ({ setValue, value, max, min }: Props) => {
  return (
    <View style={styles.inputNumberContainer}>
      <TouchableOpacity 
        onPress={() => value >= min + 1 && setValue(value - 1)} 
        style={styles.sideIconContainer}
      >
        <Icon name="remove-outline" size={18} color={colors.primary500} />
      </TouchableOpacity>
      <FontedText style={styles.inputText}>{value}</FontedText>
      <TouchableOpacity 
        onPress={() => value <= max - 1 && setValue(value + 1)} 
        style={styles.sideIconContainer}
      >
        <Icon name="add" size={18} color={colors.primary500} />
      </TouchableOpacity>
    </View>
  )
}

export default NumberInput

const styles = StyleSheet.create({
  inputNumberContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 32,
    alignItems: "center",
    borderRadius: 8
  },
  sideIconContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: 32
  },
  inputText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins600",
    color: colors.gray500,
    fontSize: 16
  }
})