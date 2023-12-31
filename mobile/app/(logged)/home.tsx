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
import Button from '../../components/global/button'
import { useProtectCola } from '../../hooks/useProtectCola'
import { useUser } from '../../context/user'

const Home = () => {
  useSetRouteName('Inicio');
  const { user } = useUser();
  const { res, loading, getData, firstRender } = useGet<PedirResponse>(user?.rol === "usuario" ? 'pedir/user' : 'pedir');
  const { cola } = useCola();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  useProtectCola();

  const seleccionarCategoria = (id: number) => {
    setCategoriaSeleccionada(id);
  }
  
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
        <View style={{ flex: 1 }}>
          <Button onPress={() => router.push('restaurantes')}>Ver restaurantes afiliados</Button>
        </View>
        <TouchableOpacity onPress={() => router.push('notification')} style={styles.notificationsContainer}>
          {
            !!user?.notificacionesPendientes &&
            <FontedText style={styles.floatingPending}>{user?.notificacionesPendientes}</FontedText>
          }
          <Icon color={colors.primary500} size={20} name="notifications-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('info')} style={styles.notificationsContainer}>
          <Icon color={colors.primary500} size={20} name="information-outline" />
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
  floatingPending: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    fontSize: 12,
    borderRadius: 8,
    backgroundColor: colors.primary500,
    textAlign: "center",
    color: colors.white
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
  },
})