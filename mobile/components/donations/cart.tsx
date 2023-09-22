import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ProductoActivo } from '../../interfaces/productoActivo'
import FontedText from '../global/fontedText'
import Button from '../global/button'
import { colors } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import Icon from '../global/icon'
import { sendRequest } from '../../utilities/sendRequest'
import { useUser } from '../../context/user'
import { Page } from '../../app/(logged)/donations'

interface Props {
  cart: ProductoActivo[]
  removeFromCart: (productoActivo: ProductoActivo) => void
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

const Cart = ({ cart, removeFromCart, setPage }: Props) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handlePedirDonacion = async () => {
    setLoading(true);
    const body = {
      donadorId: cart[0].producto.usuarioId,
      items: cart.map(item => ({
        cantidad: item.cantidad,
        productoActivo: item
      }))
    };
    const res = await sendRequest(`donacion/pedir/${user?.id}`, body);
    if(res) {
      Alert.alert("Se pidió la donación correctamente");
      setPage("Pendientes");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {cart.map(pedido => (
        <View style={styles.card} key={pedido.id}>
          <FontedText style={styles.cardText} numberOfLines={1}>{pedido.cantidad} unidades - {pedido.producto.nombre}</FontedText>
          <TouchableOpacity onPress={() => removeFromCart(pedido)}>
            <Icon name='trash-outline' size={16} color={colors.primary500} />
          </TouchableOpacity>
        </View>
      ))}
      <Button onPress={handlePedirDonacion} disabled={loading}>{loading ? "Cargando..." : "Pedir"}</Button>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 20
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    ...shadows.shadow400,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardText: {
    fontSize: 16,
    color: colors.gray900,
    width: 240
  }
})