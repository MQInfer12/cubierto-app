import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import Navbar from '../../components/global/navbar'
import { colors } from '../../styles/colors'
import Navigation from '../../components/global/navigation'
import ReloadUser from '../../components/wrappers/reloadUser'

const LoggedLayout = () => {
  return (
    <ReloadUser>
      <View style={styles.bodyContainer}>
        <Navigation />
        <Slot />
      </View>
      <Navbar />
    </ReloadUser>
  )
}

export default LoggedLayout

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.bg
  }
})