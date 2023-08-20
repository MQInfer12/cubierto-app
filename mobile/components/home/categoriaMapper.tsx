import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useGet } from '../../hooks/useGet'
import { Categoria } from '../../interfaces/categoria'
import CategoriaCard from './categoriaCard'
import CategoriaSkeleton from './categoriaSkeleton'

const CategoriaMapper = () => {
  const { res } = useGet<Categoria[]>('categoria');

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
      {
        res ?
        res?.data.map(categoria => (
          <CategoriaCard key={categoria.id} categoria={categoria} />
        )) :
        new Array(5).fill("skeleton").map((v, i) => (
          <CategoriaSkeleton key={i} />
        ))
      }
    </ScrollView>
  )
}

export default CategoriaMapper

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 32
  }
})