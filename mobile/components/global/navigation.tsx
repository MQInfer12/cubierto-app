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
          <Icon name='chevron-back-outline' size={32} color={colors.gray500} />
        </TouchableOpacity>
      }
      <FontedText weight={600} style={styles.backText}>{ route }</FontedText>
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: 'center',
    height: 48,
  },
  backText: {
    color: colors.gray500
  }
})