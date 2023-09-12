import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/global/button';
import { router } from 'expo-router';
import Dot from '../components/initial/dot';
import Page from '../components/initial/page';

const Initial = () => {
  const [page, setPage] = useState(0);

  const pageData = [{
    image: <Image style={[styles.image, styles.image0]} source={require('../assets/images/initial0.png')} />,
    title: "¡Bienvenido a Cubierto!",
    description: "Disfruta de la mejor aplicación de descuentos de Cochabamba"
  },{
    image: <Image style={[styles.image, styles.image1]} source={require('../assets/images/initial1.png')} />,
    title: "¡Obtén grandes ofertas!",
    description: "Pide tus manjares preferidos y ve a recogerlos de nuestros restaurantes asociados"
  },{
    image: <Image style={[styles.image, styles.image1]} source={require('../assets/images/initial2.png')} />,
    title: "¡Colabora con nosotros!",
    description: "Ayúdanos a no desperdiciar comida mientras disfrutas de tus platos favoritos"
  }];

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
      <Page key={page} data={pageData[page]} />
      <View style={styles.pointsContainer}>
        {pageData.map((item, index) => (
          <Dot key={index} active={page === index} />
        ))}
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
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 40
  },
  pointsContainer: {
    flexDirection: "row",
    marginBottom: 16
  },
})