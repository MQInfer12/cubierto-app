import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NothingHere from '../global/nothingHere'
import { useGet } from '../../hooks/useGet'
import { useUser } from '../../context/user'
import { Venta } from '../../interfaces/venta'
import PendienteCard from './pendienteCard'

const PendientesMapper = () => {
  const { user } = useUser();
  const { res } = useGet<Venta[]>(`pendientes/${user?.id}`);
  
  if(!res) return null;

  if(res.data.length === 0) return <NothingHere text='No tienes pedidos pendientes...' />  
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    >
      {res.data.map(venta => (
        <PendienteCard key={venta.id} venta={venta} />
      ))}
    </ScrollView>
  )
}

export default PendientesMapper

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
})