import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Page } from '../../app/(logged)/donations'
import { useGet } from '../../hooks/useGet'
import { useUser } from '../../context/user'
import ProductoCard from './productoCard'
import { colors } from '../../styles/colors'
import FontedText from '../global/fontedText'
import { Producto } from '../../interfaces/producto'
import CartRestaurante from './cartRestaurante'
import Usuario from '../../interfaces/usuario'
import NothingHere from '../global/nothingHere'

export interface CartItem {
  cantidad: number,
  producto: Producto
}

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

const DonacionRestaurante = ({ setPage }: Props) => {
  const { user } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { res } = useGet<Usuario[]>('beneficiarios');

  const addToCart = (item: CartItem) => {
    setCart(old => [...old, item]);
  }

  const removeFromCart = (item: CartItem) => {
    setCart(old => old.filter(i => i.producto.id !== item.producto.id));
  }

  if(!user?.productos.length) return <NothingHere text='No tienes productos para donar...' />
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    >
      <FontedText style={styles.ofertasText} weight={700}>Mis productos</FontedText>
      <ScrollView horizontal={true} contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
        {user?.productos.map(producto => (
          <ProductoCard 
            key={producto.id}
            cart={cart}
            producto={producto}
            addToCart={addToCart}
          />
        ))}
      </ScrollView>
      {
        !!cart.length &&
        <>
        <FontedText style={styles.ofertasText} weight={700}>Donar</FontedText>
        <CartRestaurante 
          cart={cart} 
          removeFromCart={removeFromCart} 
          setPage={setPage} 
          beneficiarios={res?.data}
        />
        </>
      }
    </ScrollView>
  )
}

export default DonacionRestaurante

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24
  },
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 24,
    flexGrow: 1
  },
})