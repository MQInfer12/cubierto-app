import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { ProductoActivo } from '../../interfaces/productoActivo'
import OfertaCard from './ofertaCard'
import OfertaSkeleton from './ofertaSkeleton'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'

interface Props {
  ofertas: ProductoActivo[] | undefined
}

const OfertaMapper = ({ ofertas }: Props) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
      {
        ofertas?.length === 0 ?
        <View style={styles.nothingContainer}>
          <FontedText style={styles.nothingText} weight={600}>No encontramos productos aquí...</FontedText>
        </View>
        : ofertas ?
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
    paddingVertical: 24,
    flexGrow: 1
  },
  nothingContainer: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  nothingText: {
    fontSize: 14,
    color: colors.gray500
  }
})