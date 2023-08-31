import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { Producto } from '../../interfaces/producto'
import FontedText from '../global/fontedText'
import Icon from '../global/icon'
import { sendRequest } from '../../utilities/sendRequest'
import { useUser } from '../../context/user'
import { router } from 'expo-router'

interface Props {
  producto: Producto
}

const ProductCard = ({ producto }: Props) => {
  const { removeProducto } = useUser();

  const handleDelete = async () => {
    const res = await sendRequest<Producto>(`producto/${producto.id}`, null, {
      method: "DELETE"
    });
    if(res) {
      removeProducto(res.data);
      Alert.alert("Se eliminó el producto correctamente");
    }
  }

  const handleAlertDelete = () => {
    Alert.alert("¿Estás seguro?", "Se eliminará este producto", [{
      text: "Cancelar",
      onPress: () => {
        return;
      }
    }, {
      text: "Continuar",
      onPress: handleDelete
    }]);
  }

  return (
    <View style={styles.productCard}>
      <View style={styles.productData}>
        <Image style={styles.productFoto} source={{ uri: producto.foto }} />
        <View style={styles.productTexts}>
          <FontedText numberOfLines={1} weight={700} style={styles.name}>{producto.nombre}</FontedText>
          <FontedText style={styles.description}>Bs. {producto.precio}</FontedText>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => router.push(`productForm/${producto.id}`)}>
          <Icon name='pencil-outline' color={colors.gray500} size={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAlertDelete}>
          <Icon name='trash-outline' color={colors.primary500} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  productCard: {
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
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 16
  },
  productTexts: {
    height: "100%",
    justifyContent: "space-evenly"
  },
  name: {
    color: colors.gray900,
    fontSize: 16,
    width: 192
  },
  description: {
    color: colors.gray600
  },
  buttons: {
    flexDirection: "row",
    gap: 12
  }
})