import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import Navbar from '../../components/global/navbar'
import { colors } from '../../styles/colors'
import Navigation from '../../components/global/navigation'
import ReloadUser from '../../components/wrappers/reloadUser'
import IddleManager from '../../components/wrappers/iddleManager'

const LoggedLayout = () => {
  return (
    <IddleManager>
      <ReloadUser>
        <View style={styles.bodyContainer}>
          <Navigation />
          <Slot />
        </View>
        <Navbar />
      </ReloadUser>
    </IddleManager>
  )
}

export default LoggedLayout

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.bg
  }
})