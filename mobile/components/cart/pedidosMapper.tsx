import { ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useUser } from '../../context/user'
import NothingHere from '../global/nothingHere';
import PedidoActualCard from './pedidoActualCard';

const PedidosMapper = () => {
  const { user } = useUser();

  if(!user?.ventas.length) return <NothingHere text='¡Ups... no tienes pedidos!' />
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {user.ventas.filter(venta => venta.estado === "pendiente").map(venta => (
        <PedidoActualCard 
          key={venta.id} 
          venta={venta}
        />
      ))}
    </ScrollView>
  )
}

export default PedidosMapper

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
})