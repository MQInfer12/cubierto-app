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
import { CartItem } from './donacionRestaurante'
import Usuario from '../../interfaces/usuario'
import { Dropdown } from 'react-native-element-dropdown'

interface Props {
  cart: CartItem[]
  removeFromCart: (item: CartItem) => void
  setPage: React.Dispatch<React.SetStateAction<Page>>
  beneficiarios?: Usuario[]
}

const CartRestaurante = ({ cart, removeFromCart, setPage, beneficiarios = [] }: Props) => {
  const { user } = useUser();
  const [selected, setSelected] = useState<string | null>(null);

  const handlePedirDonacion = async () => {
    const res = await sendRequest(`donacion/ofrecer/${user?.id}`, {
      beneficiarioId: selected,
      items: cart
    });
    if(res) {
      alert("Se ofreció la donación correctamente");
      setPage("Pendientes");
    }
  }

  const handleAlert = () => {
    if(!selected) return Alert.alert("Selecciona un beneficiario");
    Alert.alert("¿Estás seguro?", "Ofrecerás estos productos a el beneficiario", [{
      text: "Cancelar",
      onPress: () => {
        return;
      }
    }, {
      text: "Continuar",
      onPress: handlePedirDonacion
    }])
  }

  return (
    <View style={styles.container}>
      <Dropdown
        data={beneficiarios.map(benef => ({
          label: benef.nombre,
          value: String(benef.id)
        }))}
        value={selected}
        style={styles.dropdown}
        onChange={item => setSelected(item.value)}
        labelField="label"
        valueField="value"
        placeholder="Selecciona beneficiario"
        fontFamily='Biko400'
      />
      {cart.map(pedido => (
        <View style={styles.card} key={pedido.producto.id}>
          <FontedText style={styles.cardText} numberOfLines={1}>{pedido.cantidad} unidades - {pedido.producto.nombre}</FontedText>
          <TouchableOpacity onPress={() => removeFromCart(pedido)}>
            <Icon name='trash-outline' size={16} color={colors.primary500} />
          </TouchableOpacity>
        </View>
      ))}
      <Button onPress={handleAlert}>Donar</Button>
    </View>
  )
}

export default CartRestaurante

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
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: colors.gray900,
    borderColor: colors.gray500,
    borderRadius: 8,
    height: 46
  }
})