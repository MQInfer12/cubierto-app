import { Slot, router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import Navbar from '../../components/global/navbar'
import { colors } from '../../styles/colors'
import Navigation from '../../components/global/navigation'
import ReloadUser from '../../components/wrappers/reloadUser'
import IddleManager from '../../components/wrappers/iddleManager'
import NotificationListener from '../../components/wrappers/notificationListener'

const LoggedLayout = () => {
  return (
    <ReloadUser>
      <NotificationListener>
        <IddleManager>
          <View style={styles.bodyContainer}>
            <Navigation />
            <Slot />
          </View>
          <Navbar />
        </IddleManager>
      </NotificationListener>
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