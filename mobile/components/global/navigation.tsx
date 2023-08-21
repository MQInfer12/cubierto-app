import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useNavigation } from 'expo-router'
import Icon from './icon'
import { colors } from '../../styles/colors'
import FontedText from './fontedText'
import { useRouteName } from '../../context/routeName'

const Navigation = () => {
  const { route } = useRouteName();

  return (
    <View style={styles.container}>
      {
        router.canGoBack() &&
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name='chevron-back-outline' size={24} color={colors.gray500} />
        </TouchableOpacity> 
      }
      <FontedText weight={600} style={styles.backText}>{ route }</FontedText>
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: 'center',
    height: 96,
    zIndex: 5,
    backgroundColor: colors.bgTransparent
  },
  backText: {
    color: colors.navTextColor,
    marginTop: 4,
    opacity: 0.25
  }
})