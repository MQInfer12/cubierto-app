import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
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

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

const DonacionBeneficiario = ({ setPage }: Props) => {
  const { cola, myTurn, myPos, salirCola } = useHandleColaBeneficiario();

  if(myTurn) return <ViewDonation salirCola={salirCola} setPage={setPage} />
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    >
      <NothingHere 
        type={cola ? 'happy' : "loading"}
        text={cola ? "Estás en cola para pedir donaciones" : "Estamos buscando la cola..."}
        subtext={cola ? `Aguarda aquí por favor, tu posición es: ${myPos + 1}` : undefined}
      />
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