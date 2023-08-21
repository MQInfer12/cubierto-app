import { StyleSheet, View, ScrollView, Image, Dimensions, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useSetRouteName } from '../../../context/routeName';
import { ProductoActivo } from '../../../interfaces/productoActivo';
import { useGet } from '../../../hooks/useGet';
import { colors } from '../../../styles/colors';
import FontedText from '../../../components/global/fontedText';
import Icon from '../../../components/global/icon';
import { useCart } from '../../../context/cart';
import NumberInput from '../../../components/global/numberInput';

const MAXHEIGHT = Dimensions.get('window').height;

const VerOferta = () => {
  useSetRouteName('Ver producto');
  const { idOferta } = useLocalSearchParams();
  const { setNewItem } = useCart();
  const { res } = useGet<ProductoActivo>(`productoActivo/${idOferta}`);
  const [cantidad, setCantidad] = useState(1);

  const handleAddToCart = () => {
    if(!res) return; 
    setNewItem({
      cantidad: cantidad,
      productoActivo: res?.data
    })
  }

  return (
    <>
    {
      res &&
      <>
      <Image style={styles.image} source={{ uri: res.data.producto.foto }} />
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <NumberInput 
            value={cantidad}
            setValue={setCantidad}
            min={1}
            max={res.data.cantidad}
          />
          <TouchableOpacity onPress={handleAddToCart} style={styles.buttonAdd}>
            <FontedText weight={700} style={styles.buttonAddText}>Añadir al carrito</FontedText>
          </TouchableOpacity>
        </View>
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
  },
  buttonsContainer: {
    position: "absolute",
    bottom: "114%",
    right: 20,
    marginBottom: 20,
    gap: 8
  },
  buttonAdd: {
    backgroundColor: colors.primary500,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  buttonAddText: {
    color: colors.white
  },
})