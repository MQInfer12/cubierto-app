import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Notificacion } from '../../interfaces/notificacion'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import FontedText from '../global/fontedText'
import { TouchableOpacity } from 'react-native'
import Icon from '../global/icon'
import { sendRequest } from '../../utilities/sendRequest'
import { router } from 'expo-router'

interface Props {
  notificacion: Notificacion
  setNots: React.Dispatch<React.SetStateAction<Notificacion[] | null>>
}

const NotificationCard = ({ notificacion, setNots }: Props) => {
  const handleDelete = async () => {
    const res = await sendRequest(`notificacion/${notificacion.id}`, null, {
      method: "DELETE"
    });
    if(res) {
      setNots(old => {
        if(old) {
          return old.filter(not => not.id !== notificacion.id)
        }
        return old;
      })
    }
  }

  return (
    <TouchableOpacity style={styles.ofertaCard} onPress={() => router.push(notificacion.route)}>
      <View style={styles.productData}>
        <View style={styles.productFoto}>
          <Image style={styles.img} source={{ uri: notificacion.usuarioDe.foto }} />
          <View style={styles.iconContainer}>
            <Icon name={notificacion.ionicon} size={16} color={colors.primary500} />
          </View>
        </View>
        <View style={styles.productTexts}>
          <FontedText numberOfLines={1} weight={700} style={styles.name}>{notificacion.titulo}</FontedText>
          <FontedText numberOfLines={2}  style={styles.description}>{notificacion.descripcion}</FontedText>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleDelete}>
          <Icon name='trash-outline' color={colors.primary500} size={18} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  ofertaCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    ...shadows.shadow400
  },
  productData: {
    flexDirection: "row",
    flex: 1,
  },
  productFoto: {
    width: 48,
    height: 48,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    ...shadows.shadow400,
    borderRadius: 4,

  },
  productTexts: {
    height: "100%",
  },
  name: {
    color: colors.gray900,
    fontSize: 16,
    width: 224,
    marginBottom: 4
  },
  description: {
    color: colors.gray500,
    width: 224
  },
  buttons: {
    flexDirection: "row",
    gap: 12
  }
})