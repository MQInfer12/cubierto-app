import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NothingHere from '../global/nothingHere'
import { useGet } from '../../hooks/useGet'
import { useUser } from '../../context/user'
import { Venta } from '../../interfaces/venta'
import PendienteCard from './pendienteCard'

const PendientesMapper = () => {
  const { user } = useUser();
  const { res, getData, loading } = useGet<Venta[]>(`pendientes/${user?.id}`);
  
  if(!res) return null;
  return (
    <ScrollView 
      contentContainerStyle={styles.container(!res.data.length)}
      refreshControl={
        <RefreshControl 
          refreshing={loading}
          onRefresh={getData}
        />
      }
    >
      {
        !res.data.length ?
        <NothingHere text='No tienes pedidos pendientes...' />  
        :
        res.data.map(venta => (
          <PendienteCard key={venta.id} venta={venta} />
        ))
      }
    </ScrollView>
  )
}

export default PendientesMapper

const styles = StyleSheet.create<any>({
  container: (fullscreen: boolean) => ({
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: fullscreen ? 1 : undefined
  }),
})