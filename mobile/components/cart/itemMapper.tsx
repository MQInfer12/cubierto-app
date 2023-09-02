import { StyleSheet, ScrollView, View, Alert } from 'react-native'
import React from 'react'
import { useCart } from '../../context/cart'
import ItemCard from './itemCard';
import Button from '../global/button';
import { router } from 'expo-router';
import NothingHere from '../global/nothingHere';
import { sendRequest } from '../../utilities/sendRequest';
import { useUser } from '../../context/user';
import { Venta } from '../../interfaces/venta';
import { useHandleCola } from '../../hooks/useHandleCola';

interface Props {
  irAMisVentas: () => any
}

const ItemMapper = ({ irAMisVentas }: Props) => {
  const { items } = useCart();
  const { user } = useUser();
  const { salirDeCola } = useHandleCola();

  const pedir = async () => {
    const res = await sendRequest<Venta>(`carrito/enviar/${user?.id}`, items);
    if(res) {
      Alert.alert("Se envió tu pedido correctamente");
      irAMisVentas();
      salirDeCola();
    }
  }

  const handlePedir = async () => {
    Alert.alert("¿Estás listo?", "Se enviará tu pedido", [{
      text: "Modificar pedido",
      onPress: () => {
        return;
      },
      style: "cancel"
    }, {
      text: "Continuar",
      onPress: pedir
    }])
  }

  if(!items.length) return <NothingHere text='¡Tu carrito está vacío!' />
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.buttons}>
        <Button type="secondary" onPress={() => router.push("/home")}>Añadir más productos</Button>
        <Button onPress={handlePedir}>Pedir</Button>
      </View>
      {items.map((item, i) => (
        <ItemCard key={i} item={item} />
      ))}
    </ScrollView>
  )
}

export default ItemMapper

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  buttons: {
    flexDirection: "row",
    gap: 16
  }
})