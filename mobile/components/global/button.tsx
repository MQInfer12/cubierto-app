import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontedText from './fontedText'
import { colors } from '../../styles/colors'

interface Props {
  onPress: () => any
  children: string
  type?: "primary" | "secondary"
  disabled?: boolean
}

const Button = ({ onPress, children, type = "primary", disabled = false }: Props) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.button(type, disabled)}>
      <FontedText weight={700} style={styles.buttonText(type)}>{children}</FontedText>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create<any>({
  button: (type: "primary" | "secondary", disabled: boolean) => ({
    backgroundColor: disabled ? colors.gray400 : type === "primary" ? colors.primary500 : colors.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: type === "secondary" ? 1 : undefined,
    borderColor: type === "secondary" ? colors.gray400 : undefined
  }),
  buttonText:  (type: "primary" | "secondary") => ({
    color: type === "primary" ? colors.white : colors.primary500
  })
})