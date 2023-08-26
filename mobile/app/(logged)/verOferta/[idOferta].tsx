import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useSetRouteName } from '../../../context/routeName';
import { ProductoActivo } from '../../../interfaces/productoActivo';
import { useGet } from '../../../hooks/useGet';
import { colors } from '../../../styles/colors';
import FontedText from '../../../components/global/fontedText';
import { useCart } from '../../../context/cart';
import NumberInput from '../../../components/global/numberInput';
import { router } from 'expo-router';
import Button from '../../../components/global/button';
import { LinearGradient } from 'expo-linear-gradient'
import { useCola } from '../../../context/cola';
import { useHandleCola } from '../../../hooks/useHandleCola';

const MAXHEIGHT = Dimensions.get('window').height;

const VerOferta = () => {
  useSetRouteName('Ver producto');
  const { idOferta } = useLocalSearchParams();
  const { items, setNewItem } = useCart();
  const { res, setRes } = useGet<ProductoActivo>(`productoActivo/${idOferta}`);
  const { cola, loadingSalir } = useCola();
  const { myTurn, myPlace, hacerCola, handleSalirDeCola } = useHandleCola(data => {
    const thisProduct = data.find(producto => producto.id === res?.data.id);
    if(thisProduct) {
      setRes({
        message: "Se actualizó el producto",
        data: thisProduct
      });
    }
  });
  const [cantidad, setCantidad] = useState(1);

  const handleAddToCart = () => {
    if(!res) return; 
    setNewItem({
      cantidad: cantidad,
      productoActivo: res?.data
    });
    router.push("/cart");
  }

  const cantidadVendida = res?.data.detalleVentas.reduce((suma, detalle) => {
    suma += detalle.cantidad;
    return suma;
  }, 0);
  const cantidadEnCarrito = items.find(item => item.productoActivo.id === Number(idOferta))?.cantidad;
  const maxproducts = (res?.data.cantidad || 1) - (cantidadEnCarrito || 0) - (cantidadVendida || 0);

  return (
    res &&
    <>
    <View style={styles.imageContainer}>
      <View style={styles.imageRelative}>
        <Image style={styles.image} source={{ uri: res.data.producto.foto }} />
        <LinearGradient 
          style={styles.gradient}
          colors={['rgba(0, 0, 0, 0)', colors.gray900]}
          locations={[0.5, 1]}
        />
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {
          !cola ?
          <Button onPress={() => hacerCola(res.data.producto.usuario.id)}>Entrar a la cola</Button>
          : 
          !!maxproducts ?
            loadingSalir ?
            <View style={styles.noStockContainer}>
              <FontedText weight={700} style={styles.noStockText}>Saliendo de la cola...</FontedText>
            </View> 
            :
            !myTurn ?
            <>
              <View style={styles.noStockContainer}>
                <FontedText weight={700} style={styles.noStockText}>¡Estás en cola!</FontedText>
                <FontedText weight={600} style={styles.inMyCartText}>Tu lugar: {myPlace}</FontedText>
              </View> 
              <Button onPress={handleSalirDeCola}>Salir de la cola</Button>
            </>
            :
            <>
              <FontedText weight={600} style={styles.cantidadText}>Disponibles: {maxproducts}</FontedText>
              <NumberInput 
                value={cantidad}
                setValue={setCantidad}
                min={1}
                max={maxproducts}
              />
              <Button onPress={handleAddToCart}>Añadir al carrito</Button>
            </> 
          :
          <View style={styles.noStockContainer}>
            <FontedText weight={700} style={styles.noStockText}>¡Ya no hay stock!</FontedText>
            {cantidadEnCarrito ? <FontedText weight={600} style={styles.inMyCartText}>En tu carrito: {cantidadEnCarrito}</FontedText> : null}
          </View>
        }
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <FontedText style={styles.nameText} weight={700}>{res.data.producto.nombre}</FontedText>
        <FontedText style={styles.priceText} weight={600}>Bs. {res.data.precioDescontado}</FontedText>
        <FontedText style={styles.descriptionText}>{res.data.producto.descripcion}</FontedText>
      </ScrollView>
    </View>
    </>
  )
}

export default VerOferta

const styles = StyleSheet.create({
  imageContainer: {
    height: MAXHEIGHT - 236 - 106,
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  imageRelative: {
    height: "100%",
    width: "100%",
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  gradient: {
    flex: 1
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
  noStockText: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    color: colors.white,
    fontSize: 18
  },
  noStockContainer: {
    gap: -20,
  },
  inMyCartText: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    color: colors.white,
    fontSize: 14,
    alignSelf: "flex-end"
  },
  cantidadText: {
    borderRadius: 12,
    color: colors.white,
    fontSize: 14,
  }
})