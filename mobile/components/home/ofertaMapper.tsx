import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { ProductoActivo } from '../../interfaces/productoActivo'
import OfertaCard from './ofertaCard'
import OfertaSkeleton from './ofertaSkeleton'

interface Props {
  ofertas: ProductoActivo[] | undefined
}

const OfertaMapper = ({ ofertas }: Props) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
      {
        ofertas ?
        ofertas.map((oferta) => (
          <OfertaCard key={oferta.id} oferta={oferta} />
        )) : <>
        <OfertaSkeleton />
        <OfertaSkeleton />
        </>
      }
    </ScrollView>
  )
}

export default OfertaMapper

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 24
  }
})