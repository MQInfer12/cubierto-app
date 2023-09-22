import { StyleSheet, ScrollView, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useCart } from '../../context/cart'
import ItemCard from './itemCard';
import Button from '../global/button';
import { router } from 'expo-router';
import NothingHere from '../global/nothingHere';
import { sendRequest } from '../../utilities/sendRequest';
import { useUser } from '../../context/user';
import { Venta } from '../../interfaces/venta';
import { useHandleCola } from '../../hooks/useHandleCola';
import { ProductoActivo } from '../../interfaces/productoActivo';

interface Props {
  irAMisVentas: () => any
}

const ItemMapper = ({ irAMisVentas }: Props) => {
  const { items } = useCart();
  const { user } = useUser();
  const { salirDeCola } = useHandleCola();
  const [loading, setLoading] = useState(false);

  const pedir = async () => {
    setLoading(true);
    const res = await sendRequest<Venta | ProductoActivo[]>(`carrito/enviar/${user?.id}`, items);
    if(res) {
      if(res.message === "Alguno de las ofertas ya no esta disponible") {
        const data = res.data as ProductoActivo[];
        const names = data.map(oferta => oferta.producto.nombre);
        Alert.alert("Ocurrió un error", `Alguna de las ofertas ya no está disponible... (${names.join(", ")})`);
      } else {
        Alert.alert("Se envió tu pedido correctamente");
        irAMisVentas();
        salirDeCola();
      }
    }
    setLoading(false);
  }

  const handlePedir = async () => {
    Alert.alert("¿Todo listo?", "Se enviará tu pedido, una vez aceptado tendrás que ir a recogerlo al restaurante.", [{
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
        <Button onPress={handlePedir} disabled={loading}>Pedir</Button>
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