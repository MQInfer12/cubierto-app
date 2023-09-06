import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontedText from '../global/fontedText'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Usuario from '../../interfaces/usuario'

interface Props {
  restaurante: Usuario
}

const RestauranteCard = ({ restaurante }: Props) => {
  return (
    <TouchableOpacity onPress={() => router.push(`restaurante/${restaurante.id}`)} style={styles.cardContainer}>
      <View>
        <Image style={styles.cardImage} source={{ uri: restaurante.foto }} />
        <LinearGradient 
          style={styles.gradient}
          colors={['rgba(0, 0, 0, 0)', colors.gray900]}
          locations={[0.5, 1]}
        />
      </View>
      <View style={styles.cardTextContainer}>
        <View style={styles.profileContainer}>
          <FontedText numberOfLines={1} style={styles.profileText} weight={600}>{restaurante.nombre}</FontedText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestauranteCard

const styles = StyleSheet.create({
  cardContainer: {
    width: "47.5%",
    backgroundColor: colors.white,
    borderRadius: 16,
    ...shadows.shadow400
  },
  cardImage: {
    aspectRatio: 1 / 1,
    borderRadius: 16
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.8,
    borderRadius: 16
  },
  profileContainer: {
    position: "absolute",
    left: 16,
    top: -32,
    gap: 8,
    flex: 1
  },
  profileText: {
    color: colors.white,
    fontSize: 12,
    paddingRight: 24,
  }
})