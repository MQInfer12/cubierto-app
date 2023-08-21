import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import Navbar from '../../components/global/navbar'
import { colors } from '../../styles/colors'
import Navigation from '../../components/global/navigation'

const LoggedLayout = () => {
  return (
    <>
    <View style={styles.bodyContainer}>
      <Navigation />
      <Slot />
    </View>
    <Navbar />
    </>
  )
}

export default LoggedLayout

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.bg
  }
})