import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSetRouteName } from '../../../context/routeName';
import { router, useLocalSearchParams } from 'expo-router';
import { useGet } from '../../../hooks/useGet';
import FontedText from '../../../components/global/fontedText';
import { RestauranteResponse } from '../../../interfaces/pages/restaurante';
import { colors } from '../../../styles/colors';
import Icon from '../../../components/global/icon';

const VerRestaurante = () => {
  useSetRouteName('Ver restaurante');
  const { idRestaurante } = useLocalSearchParams();
  const { res } = useGet<RestauranteResponse>(`restaurante/${idRestaurante}`);

  if(!res) return null;
  return (
    <View style={styles.container}>
      <View style={styles.datosContainer}>
        <FontedText weight={700} style={styles.nameText} numberOfLines={1}>{res.data.restaurante.nombre}</FontedText>
        <View style={styles.descripcionContainer}>
          {
            res.data.restaurante.descripcion &&
            <View style={styles.descriptionTextContainer}>
              <FontedText numberOfLines={5} weight={600} style={styles.descripcionText}>{res.data.restaurante.descripcion}</FontedText>
            </View>
          }
          <Image style={styles.foto} source={{ uri: res.data.restaurante.foto }} />
        </View>
        <View style={styles.dataContainer}>
          <View style={[styles.iconsContainer, { flex: 3 }]}>
            {
              res.data.restaurante.ubicacionActual &&
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.white} name='location-outline' />
                <FontedText style={styles.iconText} weight={600}>{res.data.restaurante.ubicacionActual.nombre}</FontedText>
              </View>
            }
            <View style={styles.iconContainer}>
              <Icon size={24} color={colors.white} name='mail-outline' />
              <FontedText style={styles.iconText} weight={600}>{res.data.restaurante.email}</FontedText>
            </View>
          </View>
          <View style={[styles.iconsContainer, { flex: 1 }]}>
            {
              res.data.restaurante.telefono &&
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.white} name='call-outline' />
                <FontedText style={styles.iconText} weight={600}>{res.data.restaurante.telefono}</FontedText>
              </View>
            }
          </View>
        </View>
      </View>
      <View style={styles.productsContainer}>
        {res?.data.restaurante.productos.map(producto => {
          const oferta = res.data.ofertasActivas.find(oferta => oferta.productoId === producto.id);
          return (
            oferta ?
            <TouchableOpacity key={producto.id} onPress={() => router.push(`/verOferta/${oferta.id}`)}>
              <FontedText>{producto.nombre}</FontedText>
            </TouchableOpacity> :
            <FontedText key={producto.id}>{producto.nombre}</FontedText>
          )
        })}
      </View>
    </View>
  )
}

export default VerRestaurante

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary500,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingTop: 116,
  },
  datosContainer: {
    paddingHorizontal: 20
  },
  nameText: {
    fontSize: 32,
    color: colors.white,
    marginBottom: 8
  },
  descripcionContainer: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    marginBottom: 8
  },
  descriptionTextContainer: {
    flex: 1,
    justifyContent: "center"
  },
  descripcionText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "justify"
  },
  foto: {
    width: 92,
    height: 92,
    borderRadius: 92
  },
  dataContainer: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 12
  },
  iconsContainer: {
    gap: 6
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  iconText: {
    color: colors.white
  },
  productsContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    flex: 1,
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24
  }
})