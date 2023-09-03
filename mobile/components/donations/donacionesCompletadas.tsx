import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import FontedText from '../global/fontedText'
import { useGet } from '../../hooks/useGet'
import { useUser } from '../../context/user'
import { Donacion } from '../../interfaces/donacion'
import NothingHere from '../global/nothingHere'
import MiDonacionCard from './miDonacionCard'

const DonacionesCompletadas = () => {
  const { user } = useUser();
  const { res } = useGet<Donacion[]>(`donaciones/${user?.rol}/${user?.id}`);

  const filterCompleted = (donaciones: Donacion[]) => {
    return donaciones.filter(donacion => donacion.estadoDonador === "aceptado" && donacion.estadoBeneficiario === "aceptado");
  }

  if(!res) return null;
  if(!filterCompleted(res.data).length) return <NothingHere text='No completaste ninguna donación' />
  const data = [...filterCompleted(res.data)];
  data.reverse();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FontedText style={styles.ofertasText} weight={700}>Completadas</FontedText>
      <View style={styles.donacionesContainer}>
        {data.map(donacion => (
          <MiDonacionCard key={donacion.id} donacion={donacion} />
        ))}
      </View>
    </ScrollView>
  )
}

export default DonacionesCompletadas

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
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