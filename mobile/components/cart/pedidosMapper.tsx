import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useUser } from '../../context/user'
import NothingHere from '../global/nothingHere';
import PedidoActualCard from './pedidoActualCard';
import FontedText from '../global/fontedText';
import { colors } from '../../styles/colors';
import { Venta } from '../../interfaces/venta';
import Button from '../global/button';

const PedidosMapper = () => {
  const { user } = useUser();
  const [showOlds, setShowOlds] = useState(false);

  const getMinutesPast = (venta: Venta) => {
    const now = new Date();
    const fecha = new Date(venta.fecha);
    const diff = now.getTime() - fecha.getTime();
    const milliseconds = diff / 1000;
    const minutes = milliseconds / 60;
    return minutes;
  }

  const filterVentasActuales = (ventas: Venta[]) => {
    return ventas.filter(venta => {
      return getMinutesPast(venta) < 20;
    })
  }

  const filterVentasAnteriores = (ventas: Venta[]) => {
    return ventas.filter(venta => {
      return getMinutesPast(venta) > 20;
    })
  }

  let ventas: Venta[] = [];
  if(user) {
    ventas = [...user.ventas];
    ventas.reverse();
  }
  if(!user?.ventas.length) return <NothingHere text='¡Ups... no tienes pedidos!' />
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    >
      {
        filterVentasActuales(ventas).length !== 0 &&
        <>
        <FontedText weight={700} style={styles.titleText}>Pedidos actuales</FontedText>
        {filterVentasActuales(ventas).map(venta => (
          <PedidoActualCard 
            key={venta.id} 
            venta={venta}
          />
        ))}
        </>
      }
      <FontedText weight={700} style={styles.titleText}>Pedidos anteriores</FontedText>
      {
        filterVentasAnteriores(ventas).length === 0 ?
        <FontedText style={styles.nothingText}>No tienes pedidos anteriormente</FontedText>
        : !showOlds ?
        <Button onPress={() => setShowOlds(true)}>Ver mis pedidos anteriores</Button> 
        :
        <FlatList 
          scrollEnabled={false}
          data={filterVentasAnteriores(ventas)}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item: venta }) => (
            <PedidoActualCard 
              key={venta.id} 
              venta={venta}
            />
          )}
          initialNumToRender={4}
        />
      }
    </ScrollView>
  )
}

export default PedidosMapper

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  titleText: {
    fontSize: 24,
    color: colors.gray900
  },
  nothingText: {
    textAlign: "center",
    color: colors.gray500
  }
})