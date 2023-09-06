import { FlatList, Platform, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useGet } from '../../hooks/useGet'
import Usuario from '../../interfaces/usuario';
import { useSetRouteName } from '../../context/routeName';
import RestauranteCard from '../../components/restaurantes/restauranteCard';
import Icon from '../../components/global/icon';
import { colors } from '../../styles/colors';
import { shadows } from '../../styles/shadows';
import { useProtectCola } from '../../hooks/useProtectCola';
import { useCola } from '../../context/cola';

const Restaurantes = () => {
  useSetRouteName('Restaurantes');
  const { res } = useGet<Usuario[]>('restaurantes');
  const [filter, setFilter] = useState('');
  const { cola } = useCola();
  useProtectCola();

  if(!res || cola) return null;
  return (
    <>
    <View style={styles.textInputContainer}>
      <Icon color={colors.primary500} size={16} name='search' />
      <TextInput 
        style={styles.textInput} 
        placeholder='Buscar' 
        placeholderTextColor={colors.gray400} 
        value={filter}
        onChangeText={setFilter}
      />
    </View>
    <FlatList 
      data={res.data.filter(restaurante => restaurante.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))}
      renderItem={({ item }) => (
        <RestauranteCard restaurante={item} />
      )}
      numColumns={2}
      style={styles.container}
      ItemSeparatorComponent={() => (
        <View style={{ height: 20, width: 20 }} />
      )}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      showsVerticalScrollIndicator={false}
    />
    </>
  )
}

export default Restaurantes

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  textInputContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    paddingLeft: 24,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    ...shadows.shadow400
  },
  textInput: {
    fontSize: 14,
    fontFamily: "Biko400",
    color: colors.gray600,
    flex: 1,
    height: 40,
    paddingRight: 24,
    paddingLeft: 16,
    paddingTop: Platform.OS === "android" ? 4 : 0,
  },
})