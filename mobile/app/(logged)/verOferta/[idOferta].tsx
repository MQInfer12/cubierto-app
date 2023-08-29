import { StyleSheet, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
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
  const [tiempoRestante, setTiempoRestante] = useState<null | number>(null);

  useEffect(() => {
    if(res) {
      const ahora = new Date();
      const fecha = new Date(res.data.fecha);
      const diff = ahora.getTime() - fecha.getTime();
      const seconds = diff / 1000;
      const minutes = seconds / 60;
      const segundosRestantes = (res.data.tiempo - minutes) * 60;
      const redondear = Math.floor(segundosRestantes);
      setTiempoRestante(redondear);
    }
  }, [res]);

  useEffect(() => {
    let interval: any;
    if(tiempoRestante !== null) {
      interval = setInterval(() => {
        setTiempoRestante(old => {
          if(old !== null) {
            return old - 1
          } 
          return old;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    }
  }, [tiempoRestante]);

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

  let horas = 0;
  let minutos = 0;
  let segundos = 0;
  let restanteString = "--:--:--";
  let isActive = false;
  if(tiempoRestante) {
    horas = Math.floor(tiempoRestante / 3600);
    minutos = Math.floor((tiempoRestante / 60) % 60);
    const minutosConCero = minutos < 10 ? "0" + minutos : minutos;
    segundos = tiempoRestante % 60;
    const segundosConCero = segundos < 10 ? "0" + segundos : segundos;
    restanteString = horas + ":" + minutosConCero + ":" + segundosConCero;
    isActive = tiempoRestante > 0;
  }

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
      <TouchableOpacity onPress={() => router.push(`restaurante/${res.data.producto.usuario.id}`)} style={styles.profileContainer}>
        <Image style={styles.fotoPerfil} source={{ uri: res.data.producto.usuario.foto }} />
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        {
          !isActive ?
            <View style={styles.noStockContainer}>
              <FontedText weight={700} style={styles.noStockText}>Esta oferta ya no está activa</FontedText>
            </View> 
          : !cola ?
            <Button onPress={() => hacerCola(res.data.producto.usuario.id)}>Entrar a la cola</Button>
          : !!maxproducts ?
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
        <View style={styles.priceContainer}>
          <FontedText style={styles.priceText} weight={600}>Bs. {res.data.precioDescontado}</FontedText>
          <FontedText style={styles.realPriceText}>Bs. {res.data.producto.precio}</FontedText>
        </View>
        {isActive && <FontedText style={styles.restanteText}>Oferta disponible durante: {restanteString}</FontedText>}
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
  profileContainer: {
    position: "absolute",
    top: -92,
    left: 20
  },
  fotoPerfil: {
    width: 72,
    height: 72,
    borderRadius: 36
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  nameText: {
    fontSize: 24,
    color: colors.gray900,
    marginBottom: 10
  },
  priceContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8
  },
  priceText: {
    fontSize: 24,
    color: colors.primary500,
  },
  realPriceText: {
    fontSize: 14,
    color: colors.gray500,
    textDecorationLine: "line-through",
    textDecorationColor: colors.gray500
  },
  restanteText: {
    color: colors.gray500,
  },
  descriptionText: {
    marginTop: 24,
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