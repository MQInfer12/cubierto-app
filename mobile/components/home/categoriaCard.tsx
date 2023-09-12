import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../global/icon'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import FontedText from '../global/fontedText'
import { Categoria } from '../../interfaces/categoria'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface Props {
  categoria: Categoria
  seleccionarCategoria: (id: number) => void
  active: Boolean
}

const CategoriaCard = ({ categoria, seleccionarCategoria, active }: Props) => {
  return (
    <View 
      style={styles.categorieContainer}
    >
      <TouchableOpacity style={styles.categorieButton(active)} onPress={() => seleccionarCategoria(categoria.id)}>
        <FontAwesome5 size={18} color={active ? colors.white : colors.primary500} name={categoria.ionicon}  />
      </TouchableOpacity>
      <FontedText style={styles.categorieText}>{categoria.nombre}</FontedText>
    </View>
  )
}

export default CategoriaCard

const styles = StyleSheet.create<any>({
  categorieContainer: {
    alignItems: "center",
    gap: 8
  },
  categorieButton: (active: Boolean) => ({
    backgroundColor: active ? colors.primary500 : colors.white,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...shadows.shadow400,
  }),
  categorieText: {
    fontSize: 12,
    color: colors.gray500
  },
})