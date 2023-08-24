import { Image, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from '../../components/global/icon'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import FontedText from '../../components/global/fontedText'
import CategoriaMapper from '../../components/home/categoriaMapper'
import { useGet } from '../../hooks/useGet'
import { PedirResponse } from '../../interfaces/pages/pedir'
import OfertaMapper from '../../components/home/ofertaMapper'
import { useSetRouteName } from '../../context/routeName'
import { useCart } from '../../context/cart'
import { router } from 'expo-router'

const Home = () => {
  useSetRouteName('Home');
  const { res } = useGet<PedirResponse>('pedir');
  const { items } = useCart();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  const seleccionarCategoria = (id: number) => {
    if(categoriaSeleccionada === id) {
      setCategoriaSeleccionada(null);
    } else {
      setCategoriaSeleccionada(id);
    }
  }

  useEffect(() => {
    if(items.length) {
      const idRestaurante = items[0].productoActivo.producto.usuarioId;
      router.replace(`/restaurante/${idRestaurante}`)
    }
  }, [items]);
  
  if(items.length) return null;
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
      <CategoriaMapper 
        categorias={res?.data.categorias} 
        seleccionarCategoria={seleccionarCategoria}
        categoriaSeleccionada={categoriaSeleccionada}
      />
      <FontedText style={styles.ofertasText} weight={700}>Ofertas promocionales</FontedText>
      <OfertaMapper 
        ofertas={res?.data.ofertas.filter(oferta => 
          categoriaSeleccionada ? oferta.producto.categoriaId === categoriaSeleccionada : true
        )}
      />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  controlsContainer: {
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
    fontFamily: "Biko400",
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
  }
})