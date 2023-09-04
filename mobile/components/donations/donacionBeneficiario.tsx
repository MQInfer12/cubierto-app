import { ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import FontedText from '../global/fontedText'
import DonationMapper from './donationMapper'
import { colors } from '../../styles/colors'
import { ProductoActivo } from '../../interfaces/productoActivo'
import Cart from './cart'
import { Page } from '../../app/(logged)/donations'

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

const DonacionBeneficiario = ({ setPage }: Props) => {
  const [cart, setCart] = useState<ProductoActivo[]>([]);

  const addToCart = (productoActivo: ProductoActivo) => {
    setCart(old => [...old, productoActivo]);
  }

  const removeFromCart = (productoActivo: ProductoActivo) => {
    setCart(old => old.filter(pa => pa.id !== productoActivo.id));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FontedText style={styles.ofertasText} weight={700}>Donaciones activas</FontedText>
      <DonationMapper cart={cart} addToCart={addToCart} />
      {
        !!cart.length &&
        <>
        <FontedText style={styles.ofertasText} weight={700}>Pedido</FontedText>
        <Cart 
          cart={cart}
          removeFromCart={removeFromCart}
          setPage={setPage}
        />
        </>
      }
    </ScrollView>
  )
}

export default DonacionBeneficiario

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24
  },
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
    paddingHorizontal: 20,
  },
})