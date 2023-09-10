import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { shadows } from '../../styles/shadows'
import { Donacion } from '../../interfaces/donacion'
import { colors } from '../../styles/colors'
import DonacionSkeleton from './donacionSkeleton'
import Icon from '../global/icon'
import FontedText from '../global/fontedText'
import { router } from 'expo-router'

interface Props {
  donation: Donacion | undefined
}

const DonationCard = ({ donation }: Props) => {
  if(!donation) return <DonacionSkeleton />

  let max = -Infinity;
  let indexOfMax = -1;
  donation.detalles.forEach((detalle, i) => {
    if(detalle.cantidad > max) {
      max = detalle.cantidad;
      indexOfMax = i;
    }
  })
  const maxItem = donation.detalles[indexOfMax];
  const manyItems = donation.detalles.length > 1;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: donation.donador.portada }} />
      <View style={[styles.bg, { opacity: 0.8, backgroundColor: colors.primary500 }]} />
      <View style={styles.bg}>
        <View style={styles.fotosContainer}>
          <TouchableOpacity onPress={() => router.push(`restaurante/${donation.donador.id}`)}>
            <Image style={styles.foto} source={{ uri: donation.donador.foto }} />
          </TouchableOpacity>
          <Icon color={colors.white} size={32} name='heart' />
          <Image style={styles.foto} source={{ uri: donation.beneficiario.foto }} />
        </View>
        <View style={styles.textsContainer}>
          <FontedText weight={700} style={styles.thanks}>¡Muchas gracias!</FontedText>
          <FontedText numberOfLines={3} style={styles.description}>
            Agradecemos a <FontedText weight={600}>{donation.donador.nombre}</FontedText> por su donación de <FontedText weight={600}>{maxItem.cantidad} {maxItem.producto.nombre} {manyItems && "y más"}</FontedText> a <FontedText weight={600}>{donation.beneficiario.nombre}</FontedText>
          </FontedText>
        </View>
      </View>
    </View>
  )
}

export default DonationCard

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 12,
    backgroundColor: colors.gray400,
    ...shadows.shadow400
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12
  },
  bg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 40
  },
  fotosContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  },
  foto: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  textsContainer: {
    gap: 8
  },
  thanks: {
    color: colors.white,
    fontSize: Platform.OS === "ios" ? 24 : 16,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  description: {
    color: colors.white,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    textAlign: "center"
  }
})