import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { ProductoActivo } from '../../interfaces/productoActivo'
import OfertaCard from '../home/ofertaCard'
import OfertaSkeleton from '../home/ofertaSkeleton'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import { Producto } from '../../interfaces/producto'
import ProductoCard from './productoCard'

interface Props {
  producto: Producto[]
  ofertas: ProductoActivo[]
}

const ProductoMapper = ({ producto, ofertas }: Props) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
      {
        ofertas?.length === 0 ?
        <View style={styles.nothingContainer}>
          <FontedText style={styles.nothingText} weight={600}>No encontramos productos aquí...</FontedText>
        </View>
        :
        producto.map((producto) => {
          const oferta = ofertas.find(oferta => oferta.productoId === producto.id);
          return (
            oferta ?
            <OfertaCard key={oferta.producto.id} oferta={oferta} showRestaurant={false} /> :
            <ProductoCard key={producto.id} producto={producto} />
          )
        })
      }
    </ScrollView>
  )
}

export default ProductoMapper

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