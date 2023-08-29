import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontedText from '../global/fontedText'
import Icon from '../global/icon'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { Favorito } from '../../interfaces/favorito'
import { router } from 'expo-router'
import { sendRequest } from '../../utilities/sendRequest'
import { useUser } from '../../context/user'

interface Props {
  favorito: Favorito
}

const StarredCard = ({ favorito }: Props) => {
  const { removeFavorito } = useUser();

  const quitarDeFavoritos = async () => {
    const res = await sendRequest<Favorito>(`liketo`, {
      favoritoId: favorito.id
    }, {
      method: "PUT"
    });
    if(res) {
      removeFavorito(res.data);
    }
  }

  const alertQuitar = () => {
    Alert.alert("¿Estás seguro?", "Se quitará este restaurante de tus favoritos", [{
      text: "Cancelar",
      onPress: () => {
        return;
      }
    }, {
      text: "Continuar",
      onPress: quitarDeFavoritos
    }])
  }

  const restaurante = favorito.restaurante;
  return (
    <TouchableOpacity onPress={() => router.push(`restaurante/${restaurante.id}`)} style={styles.container}>
      <Image style={styles.foto} source={{ uri: restaurante.foto }} />
      <View style={styles.textContainer}>
        <FontedText numberOfLines={1} style={styles.nameText} weight={700}>{restaurante.nombre}</FontedText>
        <FontedText numberOfLines={2} style={styles.descriptionText}>{restaurante.descripcion}</FontedText>
      </View>
      <TouchableOpacity onPress={alertQuitar}>
        <Icon name='heart' size={16} color={colors.primary500} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default StarredCard

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 16,
    gap: 20,
    borderRadius: 8,
    ...shadows.shadow400
  },
  foto: {
    height: 56,
    width: 56,
    borderRadius: 28
  },
  textContainer:{
    flex: 1,
    gap: 8
  },
  nameText: {
    color: colors.gray900
  },
  descriptionText: {
    color: colors.gray500
  }
})