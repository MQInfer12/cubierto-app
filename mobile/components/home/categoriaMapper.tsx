import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { useGet } from '../../hooks/useGet'
import { Categoria } from '../../interfaces/categoria'
import Icon from '../global/icon'
import FontedText from '../global/fontedText'

const CategoriaMapper = () => {
  const { res } = useGet<Categoria[]>('categoria');

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
      {res?.data.map(categoria => (
        <View key={categoria.id} style={styles.categorieContainer}>
          <TouchableOpacity style={styles.categorieButton}>
            <Icon color={colors.primary500} size={24} name={categoria.ionicon} />
          </TouchableOpacity>
          <FontedText style={styles.categorieText}>{categoria.nombre}</FontedText>
        </View>
      ))}
    </ScrollView>
  )
}

export default CategoriaMapper

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 32
  },
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