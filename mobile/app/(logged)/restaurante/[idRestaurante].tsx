import { StyleSheet, View, TouchableOpacity, Image, Linking, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { useSetRouteName } from '../../../context/routeName';
import { useLocalSearchParams } from 'expo-router';
import { useGet } from '../../../hooks/useGet';
import FontedText from '../../../components/global/fontedText';
import { RestauranteResponse } from '../../../interfaces/pages/restaurante';
import { colors } from '../../../styles/colors';
import Icon from '../../../components/global/icon';
import CategoriaMapper from '../../../components/home/categoriaMapper';
import OfertaMapper from '../../../components/home/ofertaMapper';
import ProductoMapper from '../../../components/restaurante/productoMapper';
import { useUser } from '../../../context/user';
import { Favorito } from '../../../interfaces/favorito';
import { sendRequest } from '../../../utilities/sendRequest';

const VerRestaurante = () => {
  useSetRouteName('Ver restaurante');
  const { idRestaurante } = useLocalSearchParams();
  const { res, loading, getData } = useGet<RestauranteResponse>(`restaurante/${idRestaurante}`);
  const { user, addFavorito, removeFavorito } = useUser();
  const [favoritoLoading, setFavoritoLoading] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  const seleccionarCategoria = (id: number) => {
    if(categoriaSeleccionada === id) {
      setCategoriaSeleccionada(null);
    } else {
      setCategoriaSeleccionada(id);
    }
  }

  const handleLike = async () => {
    setFavoritoLoading(true);
    const favoritoExistente = user?.favoritos.find(favorito => favorito.restauranteId === res?.data.restaurante.id) || null;
    const response = await sendRequest<Favorito>('liketo', {
      usuarioId: user?.id,
      restauranteId: res?.data.restaurante.id,
      favoritoId: favoritoExistente?.id
    }, {
      method: "PUT"
    });
    if(response) {
      if(response.message === "Se añadio un favorito correctamente") {
        addFavorito(response.data);
      } else if (response.message === "Se quito un favorito correctamente") {
        removeFavorito(response.data);
      }
    }
    setFavoritoLoading(false);
  }

  if(!res) return null;
  return (
    <View style={styles.container}>
      <View style={styles.datosContainer}>
        <Image style={styles.portada} source={{ uri: res.data.restaurante.portada }} />
        <View style={styles.background} />
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
          <View style={[styles.iconsContainer, { flex: 1.5 }]}>
            {
              res.data.restaurante.ubicacionActual &&
              <TouchableOpacity 
                onPress={() => {
                  const { latitud, longitud } = res.data.restaurante.ubicacionActual;
                  Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitud}%2C${longitud}`)
                }}
              >
                <View style={styles.iconContainer}>
                  <Icon size={24} color={colors.white} name='location-outline' />
                  <FontedText numberOfLines={1} style={styles.iconText} weight={600}>{res.data.restaurante.ubicacionActual.nombre}</FontedText>
                </View>
              </TouchableOpacity>
            }
            <TouchableOpacity 
              onPress={() => {
                Linking.openURL(`mailto:${res.data.restaurante.email}`)
              }}
            >
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.white} name='mail-outline' />
                <FontedText numberOfLines={1} style={styles.iconText} weight={600}>{res.data.restaurante.email}</FontedText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconsContainer, { flex: 1 }]}>
            {
              res.data.restaurante.telefono &&
              <TouchableOpacity 
                onPress={() => {
                  Linking.openURL(`https://wa.me/${res.data.restaurante.telefono}`)
                }}
              >
                <View style={styles.iconContainer}>
                  <Icon size={24} color={colors.white} name='call-outline' />
                  <FontedText style={styles.iconText} weight={600}>{res.data.restaurante.telefono}</FontedText>
                </View>
              </TouchableOpacity>
            }
            <TouchableOpacity 
              onPress={handleLike}
              disabled={favoritoLoading}
            >
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.white} 
                  name={user?.favoritos.find(fav => fav.restauranteId === res.data.restaurante.id) ? "heart" : 'heart-outline'} 
                />
                <FontedText style={styles.iconText} weight={600}>
                  {user?.favoritos.find(fav => fav.restauranteId === res.data.restaurante.id) ? "Quitar de favoritos" : 'Añadir a favoritos'} 
                </FontedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView 
          contentContainerStyle={styles.productsContainer} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={loading}
              onRefresh={getData}
            />
          }
        >
          <View style={styles.upBottomContainer}>
            <CategoriaMapper 
              categorias={res.data.categorias}
              categoriaSeleccionada={categoriaSeleccionada}
              seleccionarCategoria={seleccionarCategoria}
            />
          </View>
          <FontedText weight={700} style={styles.ofertasText}>Todos los productos</FontedText>
          <ProductoMapper 
            productos={res.data.restaurante.productos.filter(producto => categoriaSeleccionada ? producto.categoriaId === categoriaSeleccionada : true)}
            ofertas={res.data.ofertasActivas}
          />
          <FontedText weight={700} style={styles.ofertasText}>Ofertas activas</FontedText>
          <OfertaMapper 
            ofertas={res.data.ofertasActivas.filter(oferta => categoriaSeleccionada ? oferta.producto.categoriaId === categoriaSeleccionada : true)}
            showRestaurant={false}
          />
        </ScrollView>
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
    paddingTop: 96,
  },
  datosContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
    zIndex: 1
  },
  portada: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  background: {
    backgroundColor: colors.primary500,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8
  },
  nameText: {
    fontSize: 24,
    color: colors.white,
  },
  descripcionContainer: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
  },
  descriptionTextContainer: {
    flex: 1,
    justifyContent: "center"
  },
  descripcionText: {
    fontSize: 14,
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
    color: colors.white,
    fontSize: 12
  },
  bottomContainer: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    overflow: "hidden"
  },
  upBottomContainer: {
    flexDirection: "row"
  },
  productsContainer: {
    paddingVertical: 8,
  },
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
    paddingHorizontal: 20
  }
})