import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import FontedText from '../global/fontedText'
import { useGet } from '../../hooks/useGet'
import { useUser } from '../../context/user'
import { Donacion } from '../../interfaces/donacion'
import NothingHere from '../global/nothingHere'
import MiDonacionCard from './miDonacionCard'

const MisDonaciones = () => {
  const { user } = useUser();
  const { res, loading, getData } = useGet<Donacion[]>(`donaciones/${user?.rol}/${user?.id}`);

  const filterNoCompleted = (donaciones: Donacion[]) => {
    return donaciones.filter(donacion => donacion.estadoDonador !== "aceptado" || donacion.estadoBeneficiario !== "aceptado");
  }

  if(!res) return <NothingHere type='loading' text='Cargando pendientes...' />;
  const data = [...filterNoCompleted(res.data)];
  data.reverse();
  return (
    <ScrollView 
      contentContainerStyle={styles.container(!filterNoCompleted(res.data).length)}
      refreshControl={
        <RefreshControl 
          refreshing={loading}
          onRefresh={getData}
        />
      }
    >
      {
        !filterNoCompleted(res.data).length ?
        <NothingHere text='No tienes donaciones pendientes' /> :
        <>
        <FontedText style={styles.ofertasText} weight={700}>Peticiones</FontedText>
        <View style={styles.donacionesContainer}>
          {data.map(donacion => (
            <MiDonacionCard key={donacion.id} donacion={donacion} />
          ))}
        </View>
        </>
      }
    </ScrollView>
  )
}

export default MisDonaciones

const styles = StyleSheet.create<any>({
  container: (fullscreen: boolean) => ({
    paddingVertical: 24,
    paddingHorizontal: 20,
    flex: fullscreen ? 1 : undefined
  }),
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
    paddingBottom: 24
  },
  donacionesContainer: {
    gap: 20,
    paddingBottom: 24
  }
})