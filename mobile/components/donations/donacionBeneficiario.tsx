import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontedText from '../global/fontedText'
import DonationMapper from './donationMapper'
import { colors } from '../../styles/colors'
import { ProductoActivo } from '../../interfaces/productoActivo'
import Cart from './cart'
import { Page } from '../../app/(logged)/donations'
import { useGet } from '../../hooks/useGet'
import { useHandleColaBeneficiario } from '../../hooks/useHandleColaBeneficiario'
import NothingHere from '../global/nothingHere'
import ViewDonation from './viewDonations'
import Button from '../global/button'

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

const DonacionBeneficiario = ({ setPage }: Props) => {
  const { cola, myTurn, myPos, volverAIngresar, entrarCola } = useHandleColaBeneficiario();

  if(myTurn) return <ViewDonation setPage={setPage} />
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    >
      {
        volverAIngresar ?
        <View style={{ alignSelf: "center" }}>
          <Button onPress={entrarCola}>Volver a entrar a la cola</Button>
        </View>
        :
        <NothingHere 
          type={cola ? 'happy' : "loading"}
          text={cola ? "Estás en cola para pedir donaciones" : "Estamos buscando la cola..."}
          subtext={cola ? `Aguarda aquí por favor, tu posición es: ${myPos + 1}` : undefined}
        />
      }
    </ScrollView>
  )
}

export default DonacionBeneficiario

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flex: 1
  }
})