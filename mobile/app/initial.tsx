import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FontedText from '../components/global/fontedText';
import Button from '../components/global/button';
import { colors } from '../styles/colors';
import { router } from 'expo-router';

const Initial = () => {
  const [page, setPage] = useState(0);

  const handleLeft = () => {
    setPage(page - 1);
  }
  
  const handleRight = () => {
    if(page === 2) {
      router.push("/login");
    } else {
      setPage(page + 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageContainer}>
        {
          page === 0 ? <Image style={[styles.image, styles.image0]} source={require('../assets/images/initial0.png')} /> :
          page === 1 ? <Image style={[styles.image, styles.image1]} source={require('../assets/images/initial1.png')} /> :
          page === 2 && <Image style={[styles.image, styles.image1]} source={require('../assets/images/initial2.png')} />
        }
        <FontedText style={styles.title} weight={700}>
          {
            page === 0 ? "¡Bienvenido a Cubierto!" :
            page === 1 ? "¡Obtén grandes ofertas!" :
            page === 2 && "¡Colabora con nosotros!"
          }
        </FontedText>
        <FontedText style={styles.description}>
          {
            page === 0 ? "Disfruta de la mejor aplicación de descuentos de Cochabamba" :
            page === 1 ? "Pide tus manjares preferidos y ve a recogerlos de nuestros restaurantes asociados" :
            page === 2 && "Ayúdanos a no desperdiciar comida mientras disfrutas de tus platos preferidos"
          }
        </FontedText>
      </View>
      <View style={styles.pointsContainer}>
        <View style={dynamicStyles.point(page === 0)} />
        <View style={dynamicStyles.point(page === 1)} />
        <View style={dynamicStyles.point(page === 2)} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button disabled={page === 0} icon='arrow-back-outline' onPress={handleLeft}>{""}</Button>
        <Button icon='arrow-forward-outline' onPress={handleRight}>{""}</Button>
      </View>
    </View>
  )
}

export default Initial

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: "24%",
    paddingHorizontal: 40
  },
  pageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  image: {
    height: 240,
    marginBottom: 40
  },
  image0: {
    aspectRatio: 770 / 728
  },
  image1: {
    aspectRatio: 661 / 514
  },
  image2: {
    aspectRatio: 1000 / 664
  },
  title: {
    color: colors.gray900,
    fontSize: 24,
    marginBottom: 12
  },
  description: {
    color: colors.gray600,
    fontSize: 16,
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 40
  },
  pointsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16
  },
})

const dynamicStyles = StyleSheet.create<any>({
  point: (active: boolean) => ({
    width: active ? 32 : 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: active ? colors.primary500 : colors.gray500
  })
})