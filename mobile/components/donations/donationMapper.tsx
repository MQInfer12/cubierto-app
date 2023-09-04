import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { ProductoActivo } from '../../interfaces/productoActivo'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import { useGet } from '../../hooks/useGet'
import DonacionCard from './donacionCard'

interface Props {
  cart: ProductoActivo[]
  addToCart: (productoActivo: ProductoActivo) => any
}

const DonationMapper = ({ cart, addToCart }: Props) => {
  const { res } = useGet<ProductoActivo[]>('donaciones');

  if(!res) return null;

  const thisData = cart.length ? res.data.filter(oferta => oferta.producto.usuarioId === cart[0].producto.usuarioId) : res.data;
  const data = [...thisData];
  data.reverse();

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
      {
        data.length === 0 ?
        <View style={styles.nothingContainer}>
          <FontedText style={styles.nothingText} weight={600}>No encontramos donaciones activas ahora mismo</FontedText>
        </View>
        :
        data.map((oferta) => (
          <DonacionCard 
            key={oferta.id}
            oferta={oferta}
            addToCart={addToCart}
            cart={cart}
          />
        ))
      }
    </ScrollView>
  )
}

export default DonationMapper

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 20,
    flexGrow: 1,
    paddingVertical: 24
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