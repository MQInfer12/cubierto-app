import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import NothingHere from '../../components/global/nothingHere'
import { useSetRouteName } from '../../context/routeName'
import { useUser } from '../../context/user'
import StarredCard from '../../components/starred/starredCard'
import { useCola } from '../../context/cola'

const Starred = () => {
  useSetRouteName('Mis favoritos');
  const { user } = useUser();
  const { cola } = useCola();

  return (
    <ScrollView contentContainerStyle={styles.container(!user?.favoritos.length || cola)}>
      {
        cola ?
        <NothingHere type='happy' text="¡Sal de la cola para ver tus favoritos!" />
        : user?.favoritos.length ?
        user.favoritos.map(favorito => (
          <StarredCard key={favorito.id} favorito={favorito} />
        ))
        :
        <NothingHere text="¡No marcaste nada como favorito!" />
      }
    </ScrollView>
  )
} 

export default Starred

const styles = StyleSheet.create<any>({
  container: (fullscreen: boolean) => ({
    paddingHorizontal: 20,
    gap: 20,
    flex: fullscreen ? 1 : undefined
  }),
})