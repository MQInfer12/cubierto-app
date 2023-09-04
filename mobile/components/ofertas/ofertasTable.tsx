import { ScrollView, StyleSheet,  View } from 'react-native'
import React from 'react'
import Button from '../global/button'
import { useUser } from '../../context/user'
import { useGet } from '../../hooks/useGet'
import FontedText from '../global/fontedText'
import { ProductoActivo } from '../../interfaces/productoActivo'
import { colors } from '../../styles/colors'
import { router } from 'expo-router'
import OfertaCard from './ofertaCard'

const ProductTable = () => {
  const { user } = useUser();
  const { res, getData } = useGet<ProductoActivo[]>(`ofertas/${user?.id}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button onPress={() => router.push("ofertaForm")}>Añadir</Button>
      {
        res &&
        <View style={styles.products}>
          {
            res.data.length ?
            res.data.map((oferta) => (
              <OfertaCard key={oferta.id} oferta={oferta} getData={getData} />
            )) :
            <FontedText style={styles.nothingText} weight={700}>No existen ofertas activas ahora mismo</FontedText>
          }
        </View>
      }
    </ScrollView>
  )
}

export default ProductTable

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 20,
    paddingHorizontal: 20
  },
  products: {
    width: "100%",
    gap: 20,
  },
  nothingText: {
    textAlign: "center",
    color: colors.gray500
  }
})