import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../global/icon'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import FontedText from '../global/fontedText'
import { Categoria } from '../../interfaces/categoria'

interface Props {
  categoria: Categoria
}

const CategoriaCard = ({ categoria }: Props) => {
  return (
    <View 
      style={styles.categorieContainer}
    >
      <TouchableOpacity style={styles.categorieButton}>
        <Icon color={colors.primary500} size={24} name={categoria.ionicon} />
      </TouchableOpacity>
      <FontedText style={styles.categorieText}>{categoria.nombre}</FontedText>
    </View>
  )
}

export default CategoriaCard

const styles = StyleSheet.create({
  categorieContainer: {
    alignItems: "center",
    gap: 8
  },
  categorieButton: {
    backgroundColor: colors.white,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...shadows.shadow400,
  },
  categorieText: {
    fontSize: 12,
    color: colors.gray500
  },
})