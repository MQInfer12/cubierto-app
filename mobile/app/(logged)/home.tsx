import { Image, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../../components/global/icon'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import FontedText from '../../components/global/fontedText'
import CategoriaMapper from '../../components/home/categoriaMapper'

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.controlsContainer}>
        <View style={styles.textInputContainer}>
          <Icon color={colors.primary500} size={16} name='search' />
          <TextInput 
            style={styles.textInput} 
            placeholder='Buscar' 
            placeholderTextColor={colors.gray400} 
          />
        </View>
        <TouchableOpacity style={styles.notificationsContainer}>
          <Icon color={colors.primary500} size={20} name="notifications-outline" />
        </TouchableOpacity>
      </View>
      <Image style={styles.image} source={require('../../assets/images/homeImage.png')} />
      <CategoriaMapper />
      <FontedText style={styles.ofertasText} weight={700}>Ofertas promocionales</FontedText>
      <ScrollView horizontal={true} contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.cardContainer}>
          <Image style={styles.cardImage} source={{ uri: "https://i0.wp.com/elcalderoviajero.com/wp-content/uploads/2018/12/pique-a-lo-macho-12.jpg?fit=750%2C498&ssl=1" }} />
          <View style={styles.cardTextContainer}>
            <FontedText weight={700} style={styles.cardName}>Pique Macho</FontedText>
            <FontedText weight={600} style={styles.cardPrice}>Bs. 25</FontedText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  controlsContainer: {
    marginTop: 24,
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 20,
    marginBottom: 32
  },
  textInputContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    paddingLeft: 24,
    height: 40,
    flex: 1,
    borderRadius: 20,
    ...shadows.shadow400
  },
  textInput: {
    fontSize: 14,
    fontFamily: "Poppins400",
    color: colors.gray600,
    flex: 1,
    paddingRight: 24,
    paddingLeft: 16,
    paddingTop: Platform.OS === "android" ? 4 : 0,
  },
  notificationsContainer: {
    backgroundColor: colors.white,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...shadows.shadow400,
  },
  image: {
    minWidth: "100%",
    aspectRatio: 360 / 183
  },
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
    paddingHorizontal: 20
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 24
  },
  cardContainer: {
    height: 240,
    width: 260,
    backgroundColor: colors.white,
    borderRadius: 16,
    ...shadows.shadow400
  },
  cardImage: {
    height: 160,
    borderRadius: 16
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
    padding: 14
  },
  cardName: {
    color: colors.gray900,
    fontSize: 18
  },
  cardPrice: {
    color: colors.gray500,
    fontSize: 14
  }
})