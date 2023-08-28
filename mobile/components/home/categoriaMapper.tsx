import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useGet } from '../../hooks/useGet'
import { Categoria } from '../../interfaces/categoria'
import CategoriaCard from './categoriaCard'
import CategoriaSkeleton from './categoriaSkeleton'

interface Props {
  categorias: Categoria[] | undefined
  categoriaSeleccionada: number | null
  seleccionarCategoria: (id: number) => void
}

const CategoriaMapper = ({ categorias, categoriaSeleccionada, seleccionarCategoria }: Props) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
      {
        categorias ?
        categorias.map(categoria => (
          <CategoriaCard 
            key={categoria.id} 
            categoria={categoria} 
            seleccionarCategoria={seleccionarCategoria} 
            active={categoriaSeleccionada === categoria.id}
          />
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
    gap: 32,
  }
})