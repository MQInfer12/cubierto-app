import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'
import { colors } from '../../styles/colors'
import SkeletonSpacer from '../global/skeletonSpacer'

const CategoriaSkeleton = () => {
  return (
    <View>
      <Skeleton 
        width={52} 
        height={52}
        colorMode='light'
        backgroundColor={colors.gray400}
        radius="round"
      />
      <SkeletonSpacer height={8} />
      <Skeleton
        width={52} 
        height={12 * 1.33}
        colorMode='light'
        backgroundColor={colors.gray400}
      />
    </View>
  )
}

export default CategoriaSkeleton

const styles = StyleSheet.create({})