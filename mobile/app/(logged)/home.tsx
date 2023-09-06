import { Image, Platform, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
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
import { router } from 'expo-router'
import { useCola } from '../../context/cola'
import DonationCard from '../../components/home/donationCard'
import { Donacion } from '../../interfaces/donacion'

const Home = () => {
  useSetRouteName('Home');
  const { res, loading, getData, firstRender } = useGet<PedirResponse>('pedir');
  const { cola } = useCola();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  const seleccionarCategoria = (id: number) => {
    if(categoriaSeleccionada === id) {
      setCategoriaSeleccionada(null);
    } else {
      setCategoriaSeleccionada(id);
    }
  }

  useEffect(() => {
    if(cola) {
      const idRestaurante = cola[0].restauranteId;
      router.push(`/restaurante/${idRestaurante}`)
    }
  }, []);
  
  const ofertas = res?.data.ofertas.filter(oferta => {
    const cantidadVendida = oferta.detalleVentas.reduce((suma, detalle) => {
      suma += detalle.cantidad;
      return suma;
    }, 0);
    const maxproducts = oferta.cantidad - cantidadVendida;
    return maxproducts > 0;
  });

  if(cola) return null;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl 
          refreshing={loading && !firstRender}
          onRefresh={getData}
        />
      }
    >
      <DonationCard donation={res?.data.donacion} />
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
      <CategoriaMapper 
        categorias={res?.data.categorias} 
        seleccionarCategoria={seleccionarCategoria}
        categoriaSeleccionada={categoriaSeleccionada}
      />
      <FontedText style={styles.ofertasText} weight={700}>Ofertas promocionales</FontedText>
      <OfertaMapper 
        ofertas={ofertas?.filter(oferta => 
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
    paddingBottom: 16
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
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
    paddingHorizontal: 20
  }
})