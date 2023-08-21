import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useSetRouteName } from '../../../context/routeName';
import { ProductoActivo } from '../../../interfaces/productoActivo';
import { useGet } from '../../../hooks/useGet';
import { colors } from '../../../styles/colors';
import FontedText from '../../../components/global/fontedText';

const MAXHEIGHT = Dimensions.get('window').height;

const VerOferta = () => {
  useSetRouteName('Ver producto');
  const { idOferta } = useLocalSearchParams();
  const { res } = useGet<ProductoActivo>(`productoActivo/${idOferta}`);

  return (
    <>
    {
      res &&
      <>
      <Image style={styles.image} source={{ uri: res.data.producto.foto }} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <FontedText style={styles.nameText} weight={700}>{res.data.producto.nombre}</FontedText>
          <FontedText style={styles.priceText} weight={600}>Bs. {res.data.precioDescontado}</FontedText>
          <FontedText style={styles.descriptionText}>{res.data.producto.descripcion}</FontedText>
        </ScrollView>
      </View>
      </>
    }
    </>
  )
}

export default VerOferta

const styles = StyleSheet.create({
  image: {
    height: MAXHEIGHT - 236 - 106,
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    objectFit: 'cover'
  },
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingTop: 32,
    backgroundColor: colors.white,
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    height: 260
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  nameText: {
    fontSize: 20,
    color: colors.gray900,
    marginBottom: 10
  },
  priceText: {
    fontSize: 16,
    color: colors.primary500,
    marginBottom: 32
  },
  descriptionText: {
    textAlign: 'justify',
    fontSize: 14,
    color: colors.gray500,
    lineHeight: 28
  }
})