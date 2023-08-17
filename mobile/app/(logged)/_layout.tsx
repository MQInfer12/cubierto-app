import { Slot } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import Navbar from '../../components/global/navbar'
import { colors } from '../../styles/colors'

const LoggedLayout = () => {
  return (
    <>
    <View style={styles.bodyContainer}>
      <Slot />
    </View>
    <Navbar />
    </>
  )
}

export default LoggedLayout

const styles = StyleSheet.create({
  bodyContainer: {
    paddingTop: 48,
    flex: 1,
    backgroundColor: colors.bg
  }
})